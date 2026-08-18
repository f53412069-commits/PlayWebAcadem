require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const db = require('./db');

const app = express();

// إعداد المتغيرات مع قيم افتراضية آمنة (حتى لا يتوقف السيرفر على Render)
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'satartandnaw23fatmanjmitandwab';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const DB_PATH = process.env.DB_PATH || './codequest.db';

const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '200kb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'محاولات كثيرة جداً، حاول لاحقاً.' }
});

function genReferralCode(username) {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const base = (username || 'PLAYER').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase() || 'PLAYER';
  return `CODEQUEST-${base}-${rand}`;
}

function toPublicUser(row) {
  return {
    email: row.email,
    username: row.username,
    avatar: row.avatar,
    xp: row.xp,
    coins: row.coins,
    completed: JSON.parse(row.completed),
    achievements: JSON.parse(row.achievements),
    referralCode: row.referral_code,
    invitesAccepted: row.invites_accepted,
    level1Unlocked: !!row.level1_unlocked,
  };
}

function signToken(user) {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'غير مصرح، سجّل دخولك.' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userEmail = payload.email;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'الجلسة منتهية، سجّل دخولك من جديد.' });
  }
}

const getUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?');
const getUserByReferral = db.prepare('SELECT * FROM users WHERE referral_code = ?');
const insertUser = db.prepare(
  `INSERT INTO users (email, provider, password_hash, username, avatar, referral_code, invited_by)
  VALUES (@email, @provider, @password_hash, @username, @avatar, @referral_code, @invited_by)`
);
const bumpInviterCount = db.prepare(
  `UPDATE users SET invites_accepted = invites_accepted + 1,
    level1_unlocked = CASE WHEN invites_accepted + 1 >= 5 THEN 1 ELSE level1_unlocked END
  WHERE referral_code = ?`
);
const updateProgress = db.prepare(
  `UPDATE users SET username=@username, avatar=@avatar, xp=@xp, coins=@coins,
    completed=@completed, achievements=@achievements, level1_unlocked=@level1_unlocked
  WHERE email=@email`
);

app.post('/api/register', authLimiter, (req, res) => {
  const { email, password, username, avatar, referredBy } = req.body || {};
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'البريد، كلمة المرور، واسم اللاعب مطلوبة.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: 'بريد إلكتروني غير صالح.' });
  if (password.length < 6) return res.status(400).json({ error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' });

  const normalizedEmail = email.trim().toLowerCase();
  if (getUserByEmail.get(normalizedEmail)) {
    return res.status(409).json({ error: 'هذا البريد مسجل مسبقاً، جرّب تسجيل الدخول.' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const referralCode = genReferralCode(username);

  insertUser.run({
    email: normalizedEmail,
    provider: 'email',
    password_hash: passwordHash,
    username: username.trim(),
    avatar: avatar || '🙂',
    referral_code: referralCode,
    invited_by: referredBy || null,
  });

  if (referredBy) {
    const inviter = getUserByReferral.get(referredBy);
    if (inviter) bumpInviterCount.run(referredBy);
  }

  const user = getUserByEmail.get(normalizedEmail);
  const token = signToken(user);
  res.json({ token, user: toPublicUser(user) });
});

app.post('/api/login', authLimiter, (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'البريد وكلمة المرور مطلوبان.' });

  const user = getUserByEmail.get(email.trim().toLowerCase());
  if (!user || user.provider !== 'email') {
    return res.status(401).json({ error: 'ما فيه حساب بهذا البريد.' });
  }
  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'كلمة المرور غير صحيحة.' });
  }

  const token = signToken(user);
  res.json({ token, user: toPublicUser(user) });
});

app.post('/api/google-login', authLimiter, async (req, res) => {
  if (!googleClient) return res.status(500).json({ error: 'تسجيل الدخول بجوجل غير مفعّل على هذا السيرفر.' });
  const { credential, referredBy } = req.body || {};
  if (!credential) return res.status(400).json({ error: 'لا يوجد credential.' });

  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();
    let user = getUserByEmail.get(email);

    if (!user) {
      const username = payload.name || email.split('@')[0];
      const referralCode = genReferralCode(username);
      insertUser.run({
        email,
        provider: 'google',
        password_hash: null,
        username,
        avatar: '🙂',
        referral_code: referralCode,
        invited_by: referredBy || null,
      });
      if (referredBy) {
        const inviter = getUserByReferral.get(referredBy);
        if (inviter) bumpInviterCount.run(referredBy);
      }
      user = getUserByEmail.get(email);
    }

    const token = signToken(user);
    res.json({ token, user: toPublicUser(user) });
  } catch (e) {
    res.status(401).json({ error: 'تعذّر التحقق من حساب جوجل.' });
  }
});

app.get('/api/me', auth, (req, res) => {
  const user = getUserByEmail.get(req.userEmail);
  if (!user) return res.status(404).json({ error: 'الحساب غير موجود.' });
  res.json({ user: toPublicUser(user) });
});

app.post('/api/progress', auth, (req, res) => {
  const existing = getUserByEmail.get(req.userEmail);
  if (!existing) return res.status(404).json({ error: 'الحساب غير موجود.' });

  const { username, avatar, xp, coins, completed, achievements, level1Unlocked } = req.body || {};

  updateProgress.run({
    email: req.userEmail,
    username: (username || existing.username).trim(),
    avatar: avatar || existing.avatar,
    xp: Number.isFinite(xp) ? xp : existing.xp,
    coins: Number.isFinite(coins) ? coins : existing.coins,
    completed: JSON.stringify(Array.isArray(completed) ? completed : JSON.parse(existing.completed)),
    achievements: JSON.stringify(Array.isArray(achievements) ? achievements : JSON.parse(existing.achievements)),
    level1_unlocked: level1Unlocked ? 1 : existing.level1_unlocked,
  });

  const updated = getUserByEmail.get(req.userEmail);
  res.json({ user: toPublicUser(updated) });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Code Quest server running on http://localhost:${PORT}`);
});