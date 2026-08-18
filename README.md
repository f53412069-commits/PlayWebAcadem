# Code Quest — دليل التشغيل والنشر

مشروع "Code Quest" أصبح الآن تطبيق ويب متكامل (Full-Stack):
- **الواجهة (public/):** نفس اللعبة (HTML/CSS/JS) بدون أي تغيير في التصميم أو المهام.
- **السيرفر (server/):** Node.js + Express + قاعدة بيانات SQLite حقيقية.

## ليش احتجنا سيرفر؟

قبل: كل بيانات اللاعبين (الحسابات، كلمات المرور، XP، التقدم) كانت محفوظة في `localStorage`
على متصفح كل لاعب فقط. هذا يعني:
- أي شخص يفتح أدوات المطور بالمتصفح يقدر يشوف بيانات كل الحسابات المحفوظة على نفس الجهاز.
- تسجيل الدخول بجوجل كان شكلي فقط (بدون تحقق حقيقي من طرف السيرفر).
- ما فيه أي تزامن بين الأجهزة، ولا طريقة حقيقية لعد الدعوات (Referral) أو منع التلاعب بالتقدم.

الآن:
- كلمات المرور تُشفّر بـ bcrypt على السيرفر (لا تُخزَّن أبداً كنص واضح).
- تسجيل الدخول بجوجل يُتحقق منه فعلياً عبر مكتبة Google الرسمية على السيرفر.
- كل التقدم (XP, Coins, المهام المكتملة, الإنجازات) محفوظ بقاعدة بيانات SQLite حقيقية.
- الجلسات تُدار عبر JWT (رمز دخول آمن) بدل تخزين البريد مباشرة.

## التشغيل محلياً (لتجربة المشروع قبل النشر)

```bash
cd server
npm install
cp .env.example .env
# افتح .env وغيّر JWT_SECRET لقيمة عشوائية طويلة (شغّل الأمر بالأسفل لتوليد واحدة):
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

npm start
```

افتح المتصفح على `http://localhost:3000` — بيفتح اللعبة والسيرفر يخدمها مباشرة من نفس المنفذ.

## النشر على استضافة حقيقية (VPS)

**الخيار المقترح:** Hostinger VPS أو DigitalOcean Droplet (أرخص خطة كافية تماماً لهذا المشروع).

1. **اشترِ VPS** بنظام Ubuntu 22.04 (أو أحدث).
2. **ثبّت Node.js** (نسخة 18 أو أحدث):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
   sudo apt install -y nodejs
   ```
3. **ارفع مجلد المشروع كامل** (`public/` و `server/`) للسيرفر عبر Git أو SCP/SFTP.
4. **جهّز ملف البيئة:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   nano .env   # عدّل JWT_SECRET (إلزامي) و GOOGLE_CLIENT_ID (اختياري)
   ```
5. **شغّل السيرفر بشكل دائم** باستخدام PM2 (يعيد تشغيله تلقائياً لو السيرفر أعيد تشغيله):
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name codequest
   pm2 save
   pm2 startup   # اتبع التعليمات اللي تطلع لتفعيل التشغيل التلقائي عند إعادة التشغيل
   ```
6. **اربط دومين + SSL** (اختياري لكن يرفع القيمة السوقية للمشروع كثير):
   - وجّه الدومين (A record) لعنوان IP الخاص بالـ VPS.
   - ثبّت Nginx كـ reverse proxy:
     ```bash
     sudo apt install nginx
     ```
     ثم أنشئ ملف إعداد يوجّه الدومين إلى `http://localhost:3000`.
   - فعّل شهادة SSL مجانية بأمر واحد:
     ```bash
     sudo apt install certbot python3-certbot-nginx
     sudo certbot --nginx -d yourdomain.com
     ```

## تفعيل تسجيل الدخول بجوجل (اختياري)

1. روح إلى [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. أنشئ **OAuth Client ID** من نوع "Web application".
3. أضف دومين موقعك في "Authorized JavaScript origins".
4. انسخ الـ Client ID وضعه في مكانين:
   - `server/.env` → `GOOGLE_CLIENT_ID`
   - `public/index.html` → المتغير `GOOGLE_CLIENT_ID` بأعلى السكربت (سطر ~283)

## هيكلة المشروع (لتسليمها للمشتري)

```
codequest/
├── public/           ← اللعبة نفسها (HTML/CSS/JS) — تُخدم تلقائياً من السيرفر
│   ├── index.html
│   └── style.css
├── server/
│   ├── server.js     ← نقطة الدخول الرئيسية
│   ├── db.js         ← تهيئة قاعدة البيانات
│   ├── package.json
│   ├── .env.example  ← انسخه إلى .env واملأ القيم
│   └── codequest.db  ← يُنشأ تلقائياً عند أول تشغيل (لا ترفعه لـ Git)
└── README.md
```

## ملاحظات أمان مهمة قبل البيع

- **لا ترفع ملف `.env` أو `codequest.db`** لأي مستودع عام (أضفهما لملف `.gitignore`).
- غيّر `JWT_SECRET` لقيمة عشوائية خاصة بك — لا تستخدم القيمة الافتراضية أبداً في الإنتاج.
- إذا سلّمت المشروع لمشتري، **أنشئ له JWT_SECRET جديد** ولا تسلّمه نفس القيمة اللي جربتها.
