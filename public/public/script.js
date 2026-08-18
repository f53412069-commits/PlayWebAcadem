const LEVELS = [
  {
    id: 1,
    title: 'مستوى 1: أساسيات HTML',
    category: 'HTML',
    difficulty: 'سهل',
    description: 'أنشئ صفحة بسيطة تحتوي على عنوان رئيسي، فقرة، وقائمة خدمات للوكالة.',
    hint: 'استخدم <h1> و <p> و <ul> و <li> داخل هيكل HTML واضح.',
    starter: `<h1>مرحباً بكم في WebForge</h1>
<p>نصمم مواقع احترافية للمبتدئين.</p>
<ul>
  <li>تصميم واجهات</li>
  <li>تطوير صفحات</li>
  <li>محتوى رقمي</li>
</ul>`,
    validator: code => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /<h1[^>]*>.*?WebForge.*?<\/h1>/is.test(normalized)
        && /<p[^>]*>.*?<\/p>/is.test(normalized)
        && /<ul[^>]*>.*?<li[^>]*>.*?<\/li>.*?<li[^>]*>.*?<\/li>.*?<li[^>]*>.*?<\/li>.*?<\/ul>/is.test(normalized);
    },
    reward: { xp: 60, coins: 15 },
    success: 'رائع! أنت الآن تعرف طريقة بناء هيكل صفحة HTML صحيح.'
  },
  {
    id: 2,
    title: 'مستوى 2: HTML الدلالي',
    category: 'HTML',
    difficulty: 'سهل',
    description: 'قم بإنشاء بنية صفحة باستخدام header، main، و footer للصفحة الرئيسية.',
    hint: 'استخدم العناصر الدلالية بدلاً من div فقط.',
    starter: `<header>
  <h1>وكالة تصميم مواقع</h1>
</header>
<main>
  <p>نساعد الشركات على بناء حضور رقمي قوي.</p>
</main>
<footer>
  <p>جميع الحقوق محفوظة © 2026</p>
</footer>`,
    validator: code => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /<header[^>]*>.*?<\/header>/is.test(normalized)
        && /<main[^>]*>.*?<\/main>/is.test(normalized)
        && /<footer[^>]*>.*?<\/footer>/is.test(normalized)
        && /<h1[^>]*>.*?<\/h1>/is.test(normalized);
    },
    reward: { xp: 70, coins: 18 },
    success: 'بنية الصفحة أصبحت واضحة ومنظمة، وهذا أساس بناء المواقع.'
  },
  {
    id: 3,
    title: 'مستوى 3: تنسيق باستخدام CSS',
    category: 'CSS',
    difficulty: 'متوسط',
    description: 'استخدم CSS لتغيير خلفية الصفحة ولون النص وتنسيق زر رئيسي.',
    hint: 'اجعل الخلفية داكنة، والنص أبيض، والزر أزرق أو برتقالي.',
    starter: `body {
  background: #0f172a;
  color: white;
  font-family: Arial, sans-serif;
}

button {
  background: #38bdf8;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
}`,
    validator: code => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /body\s*\{[^}]*background\s*:\s*(#0f172a|rgb\(15,\s*23,\s*42\))/i.test(normalized)
        && /button\s*\{[^}]*background\s*:\s*(#38bdf8|#0ea5e9|rgb\(56,\s*189,\s*248\))/i.test(normalized)
        && /border-radius\s*:\s*8px/i.test(normalized);
    },
    reward: { xp: 80, coins: 20 },
    success: 'ممتاز! لقد بدأت تنظم مظهر الموقع بطريقة احترافية.'
  },
  {
    id: 4,
    title: 'مستوى 4: Flexbox Layout',
    category: 'CSS',
    difficulty: 'متوسط',
    description: 'صمم قسم بطاقات (cards) يضع العناصر على نفس السطر بشكل متوازن.',
    hint: 'استخدم display: flex و justify-content: space-between.',
    starter: `.cards {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.card {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  width: 180px;
}`,
    validator: code => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /\.cards\s*\{[^}]*display\s*:\s*flex/i.test(normalized)
        && /justify-content\s*:\s*(space-between|center)/i.test(normalized)
        && /gap\s*:\s*16px/i.test(normalized);
    },
    reward: { xp: 90, coins: 25 },
    success: 'أحسنت! أصبحت تسيطر على تنسيق اللوحات والصفحات المتجاوبة.'
  },
  {
    id: 5,
    title: 'مستوى 5: بطاقة المنتج',
    category: 'CSS',
    difficulty: 'متوسط',
    description: 'اصنع بطاقة منتج واضحة مع عنوان، سعر، وزر شراء بتصميم احترافي.',
    hint: 'استخدم حدوده، الظل، واللون الأزرق للسعر.',
    starter: `.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px;
  width: 220px;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.1);
}

.product-card h3 {
  color: #0f172a;
}

.product-card .price {
  font-weight: 700;
  color: #0ea5e9;
}`,
    validator: code => {
      const normalized = code.replace(/\s+/g, ' ').trim();
      return /\.product-card\s*\{[^}]*border-radius\s*:\s*16px/i.test(normalized)
        && /box-shadow\s*:\s*0\s+8px\s+22px\s+rgba\(15,\s*23,\s*42,\s*0\.1\)/i.test(normalized)
        && /\.price\s*\{[^}]*color\s*:\s*(#0ea5e9|#38bdf8)/i.test(normalized);
    },
    reward: { xp: 100, coins: 28 },
    success: 'بطاقة المنتج جاهزة، وهذا يقترب من تصميم متجر حقيقي.'
  },
  {
    id: 6,
    title: 'مستوى 6: DOM Basics',
    category: 'JavaScript',
    difficulty: 'متوسط',
    description: 'استخدم JavaScript لتغيير قيمة عنوان الصفحة عند النقر على زر.',
    hint: 'استخدم document.getElementById() و textContent.',
    starter: `const title = document.getElementById('app-title');
const button = document.getElementById('change-btn');

button.addEventListener('click', () => {
  title.textContent = 'تم تحديث العنوان بنجاح!';
});`,
    validator: code => {
      return /getElementById\s*\(/i.test(code)
        && /addEventListener\s*\(/i.test(code)
        && /textContent\s*\s*=|innerText\s*\s*=/i.test(code);
    },
    reward: { xp: 120, coins: 30 },
    success: 'أنت الآن تتعامل مع DOM بشكل صحيح! هذا هو أساس التفاعل.'
  },
  {
    id: 7,
    title: 'مستوى 7: المصفوفات',
    category: 'JavaScript',
    difficulty: 'صعب',
    description: 'استخدم مصفوفة لعرض أسماء أعضاء الفريق داخل قائمة HTML.',
    hint: 'استخدم forEach ثم appendChild.',
    starter: `const names = ['علي', 'سارة', 'أحمد', 'ليلى'];
const list = document.getElementById('team-list');

names.forEach((name) => {
  const item = document.createElement('li');
  item.textContent = name;
  list.appendChild(item);
});`,
    validator: code => {
      return /const\s+names\s*=\s*\[/i.test(code)
        && /forEach\s*\(/i.test(code)
        && /appendChild\s*\(/i.test(code);
    },
    reward: { xp: 130, coins: 35 },
    success: 'ممتاز! أنت الآن تُدخل بيانات حقيقية إلى الواجهة في الوقت الفعلي.'
  },
  {
    id: 8,
    title: 'مستوى 8: التحقق من النموذج',
    category: 'JavaScript',
    difficulty: 'صعب',
    description: 'قم بإنشاء نموذج تسجيل ويمنع الإرسال إذا كان الاسم فارغاً.',
    hint: 'استخدم if (input.value.trim() === "") مع preventDefault().',
    starter: `const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');

form.addEventListener('submit', (event) => {
  if (nameInput.value.trim() === '') {
    event.preventDefault();
    alert('الاسم مطلوب');
  }
});`,
    validator: code => {
      return /addEventListener\s*\(\s*['"]submit['"]|addEventListener\s*\(\s*"submit"/i.test(code)
        && /if\s*\(\s*nameInput\.value\.trim\(\)\s*===\s*['"]['"]/i.test(code)
        && /event\.preventDefault\s*\(/i.test(code);
    },
    reward: { xp: 140, coins: 40 },
    success: 'أحسنت! أنت الآن تعرف كيفية حماية التطبيقات من المدخلات الخاطئة.'
  },
  {
    id: 9,
    title: 'مستوى 9: قائمة المهام',
    category: 'JavaScript',
    difficulty: 'صعب',
    description: 'أنشئ قائمة مهام تفاعلية تضيف عنصر جديد عند النقر على زر الإضافة.',
    hint: 'استخدم input.value.trim()، و appendChild لحقل جديد.',
    starter: `const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const list = document.getElementById('task-list');

addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  if (!task) return;

  const item = document.createElement('li');
  item.textContent = task;
  list.appendChild(item);
  input.value = '';
});`,
    validator: code => {
      return /addEventListener\s*\(\s*['"]click['"]|addEventListener\s*\(\s*"click"/i.test(code)
        && /input\.value\.trim\s*\(/i.test(code)
        && /appendChild\s*\(/i.test(code);
    },
    reward: { xp: 160, coins: 45 },
    success: 'قائمة المهام تعمل الآن كواجهة تفاعلية في تطبيق حقيقي.'
  },
  {
    id: 10,
    title: 'مستوى 10: المشروع النهائي',
    category: 'Project',
    difficulty: 'صعب',
    description: 'قم بدمج HTML و CSS و JavaScript في صفحة هبوطية احترافية يحتوي على عنوان، ميزات، وزر دعوة للتسجيل.',
    hint: 'استخدم section.hero + button + حدث click لتغيير نص الزر.',
    starter: `<section class="hero">
  <h1>ابدأ رحلتك في تطوير الويب</h1>
  <p>تعلم HTML و CSS و JavaScript خطوة بخطوة.</p>
  <button id="cta-btn">انضم الآن</button>
</section>

<script>
  const cta = document.getElementById('cta-btn');
  cta.addEventListener('click', () => {
    cta.textContent = 'تم تسجيلك في الدورة!';
  });
</script>`,
    validator: code => {
      return /<section[^>]*class\s*=\s*['"]hero['"]/i.test(code)
        && /<button[^>]*>.*?<\/button>/is.test(code)
        && /addEventListener\s*\(\s*['"]click['"]|addEventListener\s*\(\s*"click"/i.test(code)
        && /textContent\s*=\s*['"]تم تسجيلك في الدورة!['"]|textContent\s*=\s*"تم تسجيلك في الدورة!"/i.test(code);
    },
    reward: { xp: 200, coins: 60 },
    success: 'أحسنت! لقد أتممت المشروع النهائي وتعلمت أساسيات الويب بشكل عملي.'
  }
];

const STORE_ITEMS = [
  { id: 'starter', name: 'Starter Pack', price: 10, bonus: '+150 XP', color: '#59d0ff' },
  { id: 'pro', name: 'Pro Boost', price: 25, bonus: '+350 XP', color: '#9b8cff' },
  { id: 'elite', name: 'Elite Pass', price: 50, bonus: '+800 XP', color: '#f7c948' },
  { id: 'premium', name: 'Premium Pass', price: 100, bonus: '+2000 XP + أسئلة Premium', color: '#ff5fa2' }
];

const PREMIUM_QUESTIONS = [
  // أسئلة سهلة
  {
    type: 'choice',
    difficulty: 'سهل',
    question: 'أي لغة تُستخدم لبناء هيكل الصفحة؟',
    options: ['HTML', 'CSS', 'JavaScript'],
    answer: 'HTML'
  },
  {
    type: 'fill',
    difficulty: 'سهل',
    question: 'أكمل الجملة: CSS تُستخدم لـ ________.',
    answer: 'التنسيق'
  },
  {
    type: 'choice',
    difficulty: 'سهل',
    question: 'أي علامة تُستخدم لإنشاء فقرة في HTML؟',
    options: ['<h1>', '<p>', '<div>'],
    answer: '<p>'
  },
  {
    type: 'fill',
    difficulty: 'سهل',
    question: 'علامة <__> تُستخدم لإنشاء عنوان رئيسي.',
    answer: 'h1'
  },
  
  // أسئلة متوسطة
  {
    type: 'match',
    difficulty: 'متوسط',
    question: 'صل كل تقنية بوظيفتها:',
    pairs: [
      { left: 'HTML', right: 'البنية والمحتوى' },
      { left: 'CSS', right: 'التنسيق والألوان' },
      { left: 'JavaScript', right: 'التفاعل والحركة' }
    ],
    answer: 'HTML-البنية والمحتوى|CSS-التنسيق والألوان|JavaScript-التفاعل والحركة'
  },
  {
    type: 'choice',
    difficulty: 'متوسط',
    question: 'ما الفائدة من استخدام Flexbox في CSS؟',
    options: ['تنسيق العناصر بطريقة مرنة', 'تغيير الألوان', 'إضافة تأثيرات صوتية'],
    answer: 'تنسيق العناصر بطريقة مرنة'
  },
  {
    type: 'fill',
    difficulty: 'متوسط',
    question: 'خاصية CSS لتغيير الخط الافتراضي: ________-family',
    answer: 'font'
  },
  {
    type: 'choice',
    difficulty: 'متوسط',
    question: 'أي دالة JavaScript تُستخدم للبحث عن عنصر بـ ID؟',
    options: ['getElementById', 'getElement', 'findById'],
    answer: 'getElementById'
  },
  
  // أسئلة صعبة
  {
    type: 'match',
    difficulty: 'صعب',
    question: 'صل كل حدث مع وصفه الصحيح:',
    pairs: [
      { left: 'click', right: 'عند النقر على عنصر' },
      { left: 'submit', right: 'عند إرسال نموذج' },
      { left: 'change', right: 'عند تغيير قيمة حقل' }
    ],
    answer: 'click-عند النقر على عنصر|submit-عند إرسال نموذج|change-عند تغيير قيمة حقل'
  },
  {
    type: 'create',
    difficulty: 'صعب',
    question: 'اكتب كود JavaScript لتغيير لون الخط إلى أحمر عند النقر:',
    answer: 'element.addEventListener(\'click\', () => element.style.color = \'red\')'
  },
  {
    type: 'choice',
    difficulty: 'صعب',
    question: 'ما الفرق بين let و const في JavaScript؟',
    options: ['const لا يمكن تعديل قيمتها', 'let أسرع من const', 'لا يوجد فرق'],
    answer: 'const لا يمكن تعديل قيمتها'
  },
  {
    type: 'fill',
    difficulty: 'صعب',
    question: 'الدالة ________ تُستخدم لتحويل نص إلى رقم في JavaScript.',
    answer: 'parseInt'
  },
  {
    type: 'create',
    difficulty: 'صعب',
    question: 'اكتب كود HTML يضيف نموذج بحقل إدخال وزر إرسال:',
    answer: '<form><input type="text"><button type="submit">إرسال</button></form>'
  }
];

const QUIZ_BANK = {
  1: [
    {
      id: 'l1q1',
      type: 'choice',
      question: 'أي وسم HTML يُستخدم لإنشاء رابط ينقل المستخدم إلى صفحة أخرى؟',
      options: ['<link>', '<a>', '<href>', '<nav>'],
      correctAnswer: '<a>',
      explanation: 'الوسم <a> (اختصار Anchor) يُستخدم مع خاصية href لإنشاء الروابط، مثل: <a href="...">نص الرابط</a>.'
    },
    {
      id: 'l1q2',
      type: 'choice',
      question: 'أي وسم يُستخدم لعرض صورة داخل الصفحة؟',
      options: ['<img>', '<picture>', '<src>', '<image>'],
      correctAnswer: '<img>',
      explanation: 'الوسم <img> يعرض صورة باستخدام خاصية src لتحديد المصدر، وخاصية alt لنص بديل يساعد في الوصول (Accessibility).'
    },
    {
      id: 'l1q3',
      type: 'fill',
      question: 'أكمل: لإضافة عنوان فرعي أصغر من <h1> نستخدم <__>.',
      correctAnswer: ['h2'],
      explanation: 'عناصر العناوين تتدرج من <h1> (الأهم) إلى <h6> (الأقل أهمية)، لذا العنوان الفرعي التالي مباشرة هو <h2>.'
    },
    {
      id: 'l1q4',
      type: 'choice',
      question: 'أي خاصية HTML تحدد وجهة الرابط (الصفحة التي سينتقل إليها)؟',
      options: ['src', 'href', 'alt', 'target'],
      correctAnswer: 'href',
      explanation: 'خاصية href تحدد عنوان الوجهة، بينما src تُستخدم لمصادر مثل الصور والسكربتات وليس الروابط النصية.'
    },
    {
      id: 'l1q5',
      type: 'code',
      question: 'اكتب وسم HTML لعرض صورة شعار الموقع بنص بديل "شعار الموقع".',
      keywords: ['<img', 'src', 'alt'],
      explanation: 'الشكل الصحيح: <img src="logo.png" alt="شعار الموقع">. لازم يحتوي الكود على src لمصدر الصورة وalt للنص البديل.'
    }
  ],
  2: [
    {
      id: 'l2q1',
      type: 'choice',
      question: 'أي خاصية CSS تُستخدم لتغيير لون النص؟',
      options: ['color', 'background', 'font-color', 'text-color'],
      correctAnswer: 'color',
      explanation: 'خاصية color تُغيّر لون النص، بينما background تُغيّر لون أو صورة الخلفية.'
    },
    {
      id: 'l2q2',
      type: 'fill',
      question: 'أكمل: display: ____ يجعل العناصر داخل الحاوية تُرتّب بمرونة بجانب بعضها (Flexbox).',
      correctAnswer: ['flex'],
      explanation: 'display: flex يحوّل العنصر إلى حاوية مرنة (Flex Container) تتحكم بترتيب أبنائها أفقياً أو عمودياً.'
    },
    {
      id: 'l2q3',
      type: 'choice',
      question: 'ما الفرق الأساسي بين class و id في CSS؟',
      options: [
        'id فريد لعنصر واحد فقط، بينما class يمكن استخدامه لعدة عناصر',
        'لا يوجد أي فرق بينهما',
        'class أسرع في التحميل من id',
        'id يُستخدم فقط مع الصور'
      ],
      correctAnswer: 'id فريد لعنصر واحد فقط، بينما class يمكن استخدامه لعدة عناصر',
      explanation: 'الـ id مخصص لعنصر واحد فريد في الصفحة (#id)، أما class فيمكن تكراره على عدة عناصر (.class) لتنسيقها معاً.'
    },
    {
      id: 'l2q4',
      type: 'fill',
      question: 'أكمل الخاصية التي تجعل حواف العنصر دائرية: border-____.',
      correctAnswer: ['radius'],
      explanation: 'border-radius تُستخدم لتدوير زوايا العنصر، مثل border-radius: 12px;.'
    },
    {
      id: 'l2q5',
      type: 'code',
      question: 'اكتب قاعدة CSS تجعل جميع الفقرات <p> بحجم خط 16px ولون رمادي.',
      keywords: ['p', 'font-size', '16px', 'color'],
      explanation: 'الشكل الصحيح: p { font-size: 16px; color: gray; } — يتم استهداف كل عناصر <p> عبر الـ selector p.'
    }
  ],
  3: [
    {
      id: 'l3q1',
      type: 'choice',
      question: 'كيف نعلن متغيرًا في JavaScript لا يمكن تغيير قيمته لاحقاً؟',
      options: ['let', 'var', 'const', 'function'],
      correctAnswer: 'const',
      explanation: 'const تُنشئ متغيرًا ثابتًا لا يمكن إعادة تعيين قيمته، بعكس let التي تسمح بالتغيير.'
    },
    {
      id: 'l3q2',
      type: 'fill',
      question: 'أكمل: الدالة ____() تُستخدم لعرض رسالة منبثقة (Popup) للمستخدم.',
      correctAnswer: ['alert'],
      explanation: 'alert("رسالة") تعرض نافذة منبثقة بسيطة تحتوي على النص الممرر إليها.'
    },
    {
      id: 'l3q3',
      type: 'choice',
      question: 'أي اسم حدث نستخدمه مع addEventListener عند النقر على عنصر؟',
      options: ['click', 'submit', 'change', 'load'],
      correctAnswer: 'click',
      explanation: 'حدث click يُطلق عند الضغط على العنصر، مثال: button.addEventListener("click", () => {...}).'
    },
    {
      id: 'l3q4',
      type: 'fill',
      question: 'أكمل: للحصول على عنصر باستخدام معرفه نستخدم document.____("id").',
      correctAnswer: ['getElementById'],
      explanation: 'document.getElementById("id") يُرجع العنصر الذي يملك هذا المعرف بالضبط ليتم التعامل معه في JavaScript.'
    },
    {
      id: 'l3q5',
      type: 'code',
      question: 'اكتب كود JS يضيف مستمع حدث click لعنصر معرفه btn يعرض تنبيه "مرحباً".',
      keywords: ['getElementById', 'addEventListener', 'click', 'alert'],
      explanation: 'مثال صحيح: document.getElementById("btn").addEventListener("click", () => alert("مرحباً"));'
    }
  ],
  4: [
    {
      id: 'l4q1',
      type: 'choice',
      question: 'عند بناء صفحة متكاملة، أين يُفضّل وضع رابط CSS وسكربت JS للحصول على أداء وتحميل أفضل؟',
      options: [
        'CSS داخل head وJS قبل إغلاق body',
        'كل شيء داخل head',
        'لا يهم الترتيب إطلاقاً',
        'JS داخل head فقط وCSS في body'
      ],
      correctAnswer: 'CSS داخل head وJS قبل إغلاق body',
      explanation: 'وضع CSS في head يسمح بتحميل التنسيق مبكرًا، بينما وضع JS قبل إغلاق body يمنع حجب عرض الصفحة أثناء التحميل.'
    },
    {
      id: 'l4q2',
      type: 'fill',
      question: 'أكمل: خاصية Flexbox لترتيب العناصر أفقياً داخل الحاوية: justify-____.',
      correctAnswer: ['content'],
      explanation: 'justify-content تتحكم في توزيع العناصر على المحور الأفقي (الرئيسي) داخل حاوية flex.'
    },
    {
      id: 'l4q3',
      type: 'choice',
      question: 'ما وظيفة localStorage في مشروع ويب متكامل؟',
      options: [
        'حفظ بيانات المستخدم داخل المتصفح لتبقى بين الجلسات',
        'إرسال البيانات مباشرة إلى قاعدة بيانات السيرفر',
        'تنسيق مظهر الصفحة',
        'ضغط الصور تلقائياً'
      ],
      correctAnswer: 'حفظ بيانات المستخدم داخل المتصفح لتبقى بين الجلسات',
      explanation: 'localStorage يخزّن بيانات على شكل مفتاح/قيمة داخل متصفح المستخدم، وتبقى محفوظة حتى بعد إغلاق الصفحة.'
    },
    {
      id: 'l4q4',
      type: 'code',
      question: 'اكتب زر HTML بمعرف save-btn، واربطه في JS بحدث click يخزّن النص "تم الحفظ" داخل localStorage تحت مفتاح status.',
      keywords: ['<button', 'save-btn', 'addEventListener', 'localStorage.setItem', 'status'],
      explanation: 'مثال: <button id="save-btn">حفظ</button> ثم document.getElementById("save-btn").addEventListener("click", () => localStorage.setItem("status", "تم الحفظ"));'
    },
    {
      id: 'l4q5',
      type: 'code',
      question: 'صمم قاعدة CSS لفئة (class) اسمها card بحواف دائرية 12px، وظل خفيف (box-shadow)، ولون عنوان مميز داخل h3.',
      keywords: ['.card', 'border-radius', 'box-shadow', 'color'],
      explanation: 'مثال: .card { border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); } .card h3 { color: #ff5bb6; }'
    }
  ]
};

const LEADERBOARD = [
  { name: '', score: 890 },
  { name: '', score: 780 },
  { name: '', score: 710 },
  { name: '', score: 660 },
];

const STORAGE_KEY = 'webforge-pro-player';

const defaultState = {
  username: '',
  email: '',
  avatar: '🙂',
  isPremium: false,
  xp: 0,
  coins: 0,
  levelIndex: 0,
  completed: [],
  unlocked: ['starter'],
  achievements: [],
  quizLevel: 1,
  quizIndex: 0,
  quizAnswered: {}
};

const app = {
  state: loadState(),
  currentTab: 'missions'
};

const ui = {
  loginScreen: document.getElementById('login-screen'),
  appScreen: document.getElementById('app'),
  emailInput: document.getElementById('email'),
  usernameInput: document.getElementById('username'),
  loginForm: document.getElementById('login-form'),
  googleButton: document.getElementById('google-login'),
  emailButton: document.getElementById('email-login'),
  avatarPicker: document.getElementById('avatar-picker'),
  displayName: document.getElementById('display-name'),
  levelIndicator: document.getElementById('level-indicator'),
  xpIndicator: document.getElementById('xp-indicator'),
  coinsIndicator: document.getElementById('coins-indicator'),
  profileProgress: document.getElementById('profile-progress'),
  rankLabel: document.getElementById('rank-label'),
  levelTitle: document.getElementById('level-title'),
  taskDescription: document.getElementById('task-description'),
  hintText: document.getElementById('hint-text'),
  codeEditor: document.getElementById('code-editor'),
  previewFrame: document.getElementById('preview-frame'),
  statusBadge: document.getElementById('status-badge'),
  nextButton: document.getElementById('next-button'),
  resetButton: document.getElementById('reset-button'),
  runButton: document.getElementById('run-button'),
  leaderboardList: document.getElementById('leaderboard-list'),
  shopList: document.getElementById('shop-list'),
  profileName: document.getElementById('profile-name'),
  profileLevel: document.getElementById('profile-level'),
  profileAchievements: document.getElementById('profile-achievements'),
  achievementList: document.getElementById('achievement-list'),
  navButtons: [...document.querySelectorAll('.nav-btn')],
  tabPanels: [...document.querySelectorAll('.tab-panel')],
  missionList: document.getElementById('mission-list'),
  premiumBanner: document.getElementById('premium-banner'),
  premiumModule: document.getElementById('premium-module'),
  unlockPremiumButton: document.getElementById('unlock-premium'),
  quizLevelTabs: document.getElementById('quiz-level-tabs'),
  quizQuestionBox: document.getElementById('quiz-question-box'),
  quizProgressText: document.getElementById('quiz-progress-text')
};

function normalizeAvatar(value) {
  const avatarMap = {
    A: '🙂',
    B: '😎',
    C: '🤩',
    D: '😺',
    E: '🚀',
    U: '🙂'
  };

  if (!value) return '🙂';
  if (avatarMap[value]) return avatarMap[value];
  return value;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...defaultState };

  try {
    const parsed = JSON.parse(raw);
    const normalized = { ...defaultState, ...parsed, avatar: normalizeAvatar(parsed.avatar || defaultState.avatar) };
    return normalized;
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  app.state.avatar = normalizeAvatar(app.state.avatar || defaultState.avatar);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app.state));
}

function getRank() {
  if (app.state.xp >= 1000) return 'مهندس واجهات';
  if (app.state.xp >= 600) return 'مطور Frontend';
  if (app.state.xp >= 300) return 'مبتدئ متقدم';
  return 'مبتدئ';
}

function getProgressPercent() {
  const total = LEVELS.length;
  const done = app.state.completed.length;
  return Math.round((done / total) * 100);
}

function clearLegacyDemoData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const demoNames = ['تمارا', 'Player', 'لاعب بدون تسجيل', 'Ali Real', 'Test User'];
    if (parsed && typeof parsed.username === 'string' && demoNames.includes(parsed.username.trim())) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function loadUser() {
  clearLegacyDemoData();
  const savedState = loadState();
  app.state = { ...defaultState, ...savedState };

  if (!app.state.username || !app.state.username.trim()) {
    ui.loginScreen.classList.remove('hidden');
    ui.appScreen.classList.add('hidden');
    return;
  }

  ui.loginScreen.classList.add('hidden');
  ui.appScreen.classList.remove('hidden');
  ui.displayName.textContent = app.state.username;
  ui.profileName.textContent = app.state.username;
  ui.rankLabel.textContent = getRank();
  const avatarLabel = normalizeAvatar(app.state.avatar || defaultState.avatar);
  const avatarElement = document.getElementById('user-avatar');
  if (avatarElement) {
    avatarElement.textContent = avatarLabel;
  }
  renderAll();
}

function renderMissions() {
  const missionList = document.createElement('div');
  missionList.className = 'mission-list';

  LEVELS.forEach((level, index) => {
    const button = document.createElement('button');
    button.className = `mission-item ${index === app.state.levelIndex ? 'active' : ''}`;
    button.innerHTML = `<span>المستوى ${index + 1}: ${level.category}</span><small>${level.title}</small>`;
    button.addEventListener('click', () => {
      app.state.levelIndex = index;
      saveState();
      renderLevel();
    });
    missionList.appendChild(button);
  });

  const old = document.querySelector('.mission-list');
  if (old) old.replaceWith(missionList);
  else {
    const side = document.querySelector('.sidebar');
    side.appendChild(missionList);
  }
}

function renderLevel() {
  const level = LEVELS[app.state.levelIndex];
  ui.levelIndicator.textContent = String(app.state.levelIndex + 1);
  
  // Update title with difficulty badge
  const difficultyEmoji = {
    'سهل': '🟢',
    'متوسط': '🟡',
    'صعب': '🔴'
  };
  const emoji = difficultyEmoji[level.difficulty] || '⚪';
  ui.levelTitle.innerHTML = `${emoji} ${level.title}`;
  
  ui.taskDescription.textContent = level.description;
  ui.hintText.textContent = level.hint;
  ui.codeEditor.value = level.starter;
  ui.statusBadge.textContent = 'انتظار';
  ui.statusBadge.className = 'status-badge neutral';
  renderPreview(level.starter);
  renderMissions();
  ui.profileLevel.textContent = String(app.state.levelIndex + 1);
}

function renderPreview(code) {
  try {
    // Check if code is CSS only (starts with .) or HTML
    const isCSS = code.trim().startsWith('{') || code.trim().startsWith('body') || code.trim().startsWith('*');
    
    let htmlContent = code;
    
    // If it's CSS, wrap it properly
    if (isCSS) {
      htmlContent = `<style>${code}</style>`;
    }
    
    const doc = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: Arial, sans-serif; margin: 20px; color: #111827; background: white; }
      .hero { background: linear-gradient(135deg, #e0f2fe, #f8fafc); padding: 24px; border-radius: 18px; }
      h1 { color: #0f172a; margin-bottom: 16px; }
      h2 { color: #0f172a; margin-bottom: 12px; }
      p { margin-bottom: 12px; }
      button { background: #0ea5e9; color: white; border: none; padding: 12px 18px; border-radius: 10px; cursor: pointer; font-size: 14px; }
      button:hover { background: #0284c7; }
      li { margin-bottom: 8px; margin-left: 20px; }
      ul { margin-bottom: 12px; }
      input { padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; }
      form { display: flex; flex-direction: column; gap: 12px; max-width: 400px; }
    </style>
    ${isCSS ? '' : ''}
  </head>
  <body>
    ${htmlContent}
  </body>
</html>`;
    
    ui.previewFrame.srcdoc = doc;
  } catch (err) {
    console.error('Preview error:', err);
  }
}

function renderLeaderboard() {
  const merged = [...LEADERBOARD, { name: app.state.username || 'You', score: app.state.xp }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  ui.leaderboardList.innerHTML = merged.map((item, index) => `
    <div class="leaderboard-item">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="rank">${index + 1}</div>
        <div class="player-name">${item.name}</div>
      </div>
      <div class="score">${item.score} XP</div>
    </div>
  `).join('');
}

function renderShop() {
  ui.shopList.innerHTML = STORE_ITEMS.map(item => {
    const isUnlocked = true;
    const label = 'مفعل';

    return `
      <div class="shop-item">
        <div class="meta">
          <strong style="color:${item.color};">${item.name}</strong>
          <small>${item.bonus}</small>
        </div>
        <button data-item="${item.id}" data-price="${item.price}" disabled>${label}</button>
      </div>
    `;
  }).join('');

  ui.shopList.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.item;
      const price = Number(button.dataset.price);
      if (app.state.unlocked.includes(itemId) || (itemId === 'premium' && app.state.isPremium)) {
        alert('هذه الباقة مفعلة بالفعل.');
        return;
      }

      if (app.state.coins < price) {
        alert('لا يوجد رصيد كافٍ في عملاتك. أكمل المزيد من المستويات.');
        return;
      }

      app.state.coins -= price;
      app.state.xp += price * 10;
      app.state.unlocked.push(itemId);

      if (itemId === 'premium') {
        app.state.isPremium = true;
      }

      saveState();
      renderAll();
      alert('تم شراء الباقة بنجاح!');
    });
  });
}

function renderPremiumModule() {
  if (!app.state.isPremium) {
    app.state.isPremium = true;
  }

  // Get questions by difficulty level
  const easyQuestions = PREMIUM_QUESTIONS.filter(q => q.difficulty === 'سهل');
  const mediumQuestions = PREMIUM_QUESTIONS.filter(q => q.difficulty === 'متوسط');
  const hardQuestions = PREMIUM_QUESTIONS.filter(q => q.difficulty === 'صعب');
  
  // Show questions based on progress
  let selectedQuestions = easyQuestions;
  if (app.state.completed.length >= 4) selectedQuestions = [...easyQuestions, ...mediumQuestions];
  if (app.state.completed.length >= 7) selectedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
  
  const questionIndex = Math.floor(Math.random() * selectedQuestions.length);
  const question = selectedQuestions[questionIndex];

  const difficultyEmoji = {
    'سهل': '🟢',
    'متوسط': '🟡',
    'صعب': '🔴'
  };
  const emoji = difficultyEmoji[question.difficulty] || '⚪';

  let html = `
    <div class="premium-unlocked">
      <h3>${emoji} Premium Challenge - ${question.difficulty}</h3>
      <div class="premium-question">
        <h4>${question.question}</h4>
  `;

  if (question.type === 'match') {
    html += `
      <div class="choice-grid">
        ${question.pairs.map(item => `<div>• ${item.left} = ${item.right}</div>`).join('')}
      </div>
      <input class="premium-input" id="premium-answer" placeholder="اكتب الإجابة مثل: HTML=البنية والمحتوى" />
    `;
  }

  if (question.type === 'fill') {
    html += `
      <input class="premium-input" id="premium-answer" placeholder="اكتب الإجابة" />
    `;
  }

  if (question.type === 'choice') {
    html += `
      <div class="choice-grid">
        ${question.options.map(option => `<button type="button" class="choice-btn" data-value="${option}">${option}</button>`).join('')}
      </div>
      <input type="hidden" id="premium-answer" value="" />
    `;
  }

  if (question.type === 'create') {
    html += `
      <textarea id="premium-answer" class="premium-textarea" placeholder="اكتب الكود هنا"></textarea>
    `;
  }

  html += `
        <button type="button" class="primary-btn premium-check-btn" id="premium-check-btn">تحقق</button>
      </div>
    </div>
  `;

  ui.premiumModule.innerHTML = html;

  if (question.type === 'choice') {
    ui.premiumModule.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ui.premiumModule.querySelectorAll('.choice-btn').forEach(item => item.classList.remove('selected'));
        btn.classList.add('selected');
        const hidden = document.getElementById('premium-answer');
        hidden.value = btn.dataset.value;
      });
    });
  }

  document.getElementById('premium-check-btn')?.addEventListener('click', () => {
    const answer = document.getElementById('premium-answer')?.value?.trim() || '';
    const normalized = answer.toLowerCase().replace(/\s+/g, ' ');
    const expected = question.answer.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === expected || normalized.includes(expected.split('=')[0].trim())) {
      alert('إجابة صحيحة! أنت تستفيد فعلاً من النسخة Premium.');
      app.state.xp += 300;
      app.state.coins += 25;
      saveState();
      renderAll();
      return;
    }

    alert('الإجابة غير صحيحة، حاول مرة أخرى.');
  });
}

function renderQuizLevelTabs() {
  const levelNames = { 1: 'HTML', 2: 'CSS', 3: 'JavaScript', 4: 'مشاريع متكاملة' };

  ui.quizLevelTabs.innerHTML = Object.keys(QUIZ_BANK).map(level => `
    <button type="button" class="quiz-level-btn ${Number(level) === app.state.quizLevel ? 'active' : ''}" data-level="${level}">
      المستوى ${level} · ${levelNames[level]}
    </button>
  `).join('');

  ui.quizLevelTabs.querySelectorAll('.quiz-level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      app.state.quizLevel = Number(btn.dataset.level);
      app.state.quizIndex = 0;
      saveState();
      renderQuizLevelTabs();
      renderQuizQuestion();
    });
  });
}

function renderQuizQuestion() {
  const questions = QUIZ_BANK[app.state.quizLevel] || [];
  if (app.state.quizIndex >= questions.length) app.state.quizIndex = 0;
  const question = questions[app.state.quizIndex];
  if (!question) {
    ui.quizQuestionBox.innerHTML = '';
    return;
  }

  const answeredCorrectly = !!app.state.quizAnswered[question.id];
  const answeredCount = questions.filter(q => app.state.quizAnswered[q.id]).length;
  ui.quizProgressText.textContent = `السؤال ${app.state.quizIndex + 1} من ${questions.length} — تم حل ${answeredCount} من ${questions.length} في هذا المستوى`;

  let inputHtml = '';
  if (question.type === 'choice') {
    inputHtml = `
      <div class="choice-grid" id="quiz-choice-grid">
        ${question.options.map(option => `<button type="button" class="choice-btn" data-value="${option}">${option}</button>`).join('')}
      </div>
      <input type="hidden" id="quiz-answer" value="" />
    `;
  } else if (question.type === 'fill') {
    inputHtml = `<input class="premium-input" id="quiz-answer" placeholder="اكتب إجابتك هنا" />`;
  } else if (question.type === 'code') {
    inputHtml = `<textarea class="premium-textarea quiz-textarea" id="quiz-answer" placeholder="اكتب الكود هنا"></textarea>`;
  }

  ui.quizQuestionBox.innerHTML = `
    <div class="quiz-question-card">
      <h4>${question.question}</h4>
      ${inputHtml}
      <div class="quiz-nav-actions">
        <button type="button" class="primary-btn small-btn" id="quiz-check-btn">تحقق من الإجابة</button>
        ${answeredCorrectly ? '<span class="quiz-answered-badge">✔ تمت الإجابة عليه بشكل صحيح</span>' : ''}
      </div>
      <div id="quiz-feedback"></div>
      <div class="quiz-nav-actions">
        <button type="button" class="secondary-btn small-btn" id="quiz-prev-btn" ${app.state.quizIndex === 0 ? 'disabled' : ''}>السؤال السابق</button>
        <button type="button" class="secondary-btn small-btn" id="quiz-next-btn" ${app.state.quizIndex >= questions.length - 1 ? 'disabled' : ''}>السؤال التالي</button>
      </div>
    </div>
  `;

  document.getElementById('quiz-prev-btn').addEventListener('click', () => {
    app.state.quizIndex = Math.max(0, app.state.quizIndex - 1);
    saveState();
    renderQuizQuestion();
  });
  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    app.state.quizIndex = Math.min(questions.length - 1, app.state.quizIndex + 1);
    saveState();
    renderQuizQuestion();
  });

  if (question.type === 'choice') {
    ui.quizQuestionBox.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ui.quizQuestionBox.querySelectorAll('.choice-btn').forEach(item => item.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('quiz-answer').value = btn.dataset.value;
      });
    });
  }

  document.getElementById('quiz-check-btn').addEventListener('click', () => checkQuizAnswer(question));
}

function checkQuizAnswer(question) {
  const rawAnswer = document.getElementById('quiz-answer')?.value?.trim() || '';
  const feedback = document.getElementById('quiz-feedback');
  let isCorrect = false;

  if (question.type === 'choice') {
    isCorrect = rawAnswer === question.correctAnswer;
  } else if (question.type === 'fill') {
    const normalized = rawAnswer.toLowerCase();
    isCorrect = question.correctAnswer.some(accepted => normalized === accepted.toLowerCase());
  } else if (question.type === 'code') {
    const normalized = rawAnswer.toLowerCase().replace(/\s+/g, ' ');
    isCorrect = question.keywords.every(keyword => normalized.includes(keyword.toLowerCase()));
  }

  if (isCorrect) {
    feedback.innerHTML = `
      <div class="quiz-feedback correct">
        <strong>إجابة صحيحة! 🎉</strong>
        ${question.explanation}
      </div>
    `;

    if (!app.state.quizAnswered[question.id]) {
      app.state.quizAnswered[question.id] = true;
      app.state.xp += 20;
      app.state.coins += 5;
      saveState();
      updateStats();
      renderLeaderboard();
    }
  } else {
    feedback.innerHTML = `
      <div class="quiz-feedback incorrect">
        <strong>إجابة غير صحيحة، حاول مرة أخرى.</strong>
        ${question.explanation}
      </div>
    `;
  }
}

function renderQuizTab() {
  renderQuizLevelTabs();
  renderQuizQuestion();
}

function renderAchievements() {
  const achievements = [
    { name: 'بداية قوية', unlocked: app.state.completed.length >= 2 },
    { name: 'مطور HTML', unlocked: app.state.completed.includes(2) },
    { name: 'مصمم CSS', unlocked: app.state.completed.includes(5) },
    { name: 'محرك JavaScript', unlocked: app.state.completed.includes(8) },
    { name: 'مشروع نهائي', unlocked: app.state.completed.includes(10) }
  ];

  ui.achievementList.innerHTML = achievements.map(item => `
    <div class="achievement-item">
      <strong>${item.name}</strong>
      <span class="tag">${item.unlocked ? 'مكتمل' : 'قيد التقدم'}</span>
    </div>
  `).join('');

  const unlockedCount = achievements.filter(item => item.unlocked).length;
  ui.profileAchievements.textContent = String(unlockedCount);
}

function updateStats() {
  ui.xpIndicator.textContent = String(app.state.xp);
  ui.coinsIndicator.textContent = String(app.state.coins);
  ui.profileProgress.textContent = `${getProgressPercent()}%`;
  ui.displayName.textContent = app.state.username;
  ui.profileLevel.textContent = String(app.state.levelIndex + 1);
  ui.rankLabel.textContent = getRank();
  ui.profileName.textContent = app.state.username;

  const avatarElement = document.getElementById('user-avatar');
  if (avatarElement) {
    avatarElement.textContent = app.state.avatar || 'A';
  }
}

function validateLevel() {
  const current = LEVELS[app.state.levelIndex];
  const code = ui.codeEditor.value;

  if (current.validator(code)) {
    if (!app.state.completed.includes(current.id)) {
      app.state.completed.push(current.id);
      app.state.xp += current.reward.xp;
      app.state.coins += current.reward.coins;
      app.state.levelIndex = Math.min(app.state.levelIndex + 1, LEVELS.length - 1);
    }

    ui.statusBadge.textContent = 'نجح';
    ui.statusBadge.className = 'status-badge success';
    alert(current.success);
    saveState();
    renderAll();
    return;
  }

  ui.statusBadge.textContent = 'إعادة المحاولة';
  ui.statusBadge.className = 'status-badge fail';
  alert('الإجابة غير صحيحة، حاول مرة أخرى.');
}

function renderAll() {
  renderLevel();
  renderLeaderboard();
  renderShop();
  renderAchievements();
  renderPremiumModule();
  renderQuizTab();
  updateStats();
  saveState();
}

function handleLogin(event) {
  event.preventDefault();
  const username = ui.usernameInput.value.trim();
  const email = ui.emailInput.value.trim() || 'player@gmail.com';

  if (!username) {
    alert('يرجى إدخال اسم اللاعب.');
    return;
  }

  app.state.username = username;
  app.state.email = email;
  app.state.avatar = normalizeAvatar(document.querySelector('.avatar-option.selected')?.dataset.avatar || defaultState.avatar);
  app.state.isPremium = true;
  app.state.unlocked = ['starter', 'pro', 'elite', 'premium'];
  saveState();
  loadUser();
}

function activateAvatarSelection() {
  ui.avatarPicker.querySelectorAll('.avatar-option').forEach(option => {
    option.addEventListener('click', () => {
      ui.avatarPicker.querySelectorAll('.avatar-option').forEach(btn => btn.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

function handleGoogleLogin() {
  const googleEmail = 'player@gmail.com';
  ui.emailInput.value = googleEmail;
  ui.emailInput.setAttribute('data-provider', 'google');
  ui.usernameInput.value = ui.usernameInput.value.trim() || 'Player Google';
  alert('تم تجهيز الدخول باستخدام Google. أكمل الاسم ثم اضغط دخول إلى اللعبة.');
}

function handleEmailLogin() {
  ui.emailInput.value = '';
  ui.emailInput.setAttribute('data-provider', 'email');
  ui.emailInput.focus();
}

function handleReset() {
  localStorage.removeItem(STORAGE_KEY);
  app.state = { ...defaultState, avatar: '🙂' };
  ui.loginScreen.classList.remove('hidden');
  ui.appScreen.classList.add('hidden');
  ui.usernameInput.value = '';
  ui.emailInput.value = '';
  const selected = document.querySelector('.avatar-option.selected');
  if (selected) {
    document.querySelectorAll('.avatar-option').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('.avatar-option[data-avatar="🙂"]')?.classList.add('selected');
  }
  saveState();
}

ui.loginForm.addEventListener('submit', handleLogin);
ui.googleButton.addEventListener('click', handleGoogleLogin);
ui.emailButton.addEventListener('click', handleEmailLogin);
ui.unlockPremiumButton.addEventListener('click', () => {
  app.state.isPremium = true;
  app.state.unlocked = ['starter', 'pro', 'elite', 'premium'];
  app.state.xp += 2000;
  app.state.coins += 100;
  saveState();
  renderAll();
  alert('تم تفعيل كل المميزات بنجاح!');
});
activateAvatarSelection();
ui.runButton.addEventListener('click', () => {
  renderPreview(ui.codeEditor.value);
  validateLevel();
});
ui.nextButton.addEventListener('click', () => {
  if (app.state.levelIndex < LEVELS.length - 1) {
    app.state.levelIndex += 1;
    saveState();
    renderAll();
  } else {
    alert('Excellent! You completed every level and are now ready to build real web projects.');
  }
});
ui.resetButton.addEventListener('click', handleReset);

ui.navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    app.currentTab = tab;
    ui.navButtons.forEach(item => item.classList.toggle('active', item === button));
    ui.tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === `${tab}-panel`));
  });
});

loadUser();
