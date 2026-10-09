// Arabic texts for the blog: English text -> Arabic text.
// First draft written by Claude, to be reviewed by a native Arabic speaker before launch.
const ar = {
  // List page
  Blog: 'المدونة',
  'Guides for running and growing an online shop.': 'أدلة لإدارة متجرك الإلكتروني وتنميته.',
  'Running a shop, one guide at a time.': 'إدارة المتجر، دليل تلو الآخر.',
  Topics: 'المواضيع',
  All: 'الكل',
  'Cover image': 'صورة الغلاف',
  '{date} · {mins} min read': '{date} · قراءة {mins} دقائق',

  // Topics
  'Storefront and AI': 'واجهة المتجر والذكاء الاصطناعي',
  'Selling abroad': 'البيع في الخارج',
  Offers: 'العروض',
  Guides: 'أدلة',
  Catalogue: 'الكتالوج',
  Suppliers: 'الموردون',

  // Dates (digits stay 0-9)
  '24 Sep 2026': '24 سبتمبر 2026',
  '17 Sep 2026': '17 سبتمبر 2026',
  '9 Sep 2026': '9 سبتمبر 2026',
  '2 Sep 2026': '2 سبتمبر 2026',
  '26 Aug 2026': '26 أغسطس 2026',
  '19 Aug 2026': '19 أغسطس 2026',

  // Article page
  Breadcrumb: 'مسار التنقل',
  'Author name placeholder': 'اسم الكاتب (نص مؤقت)',
  'Placeholder: the full article goes here.': 'نص مؤقت: سيوضع المقال الكامل هنا.',
  'Try it on your own shop': 'جرّبه على متجرك',
  'Starter is free forever. No card needed.': 'باقة Starter مجانية دائمًا. لا حاجة إلى بطاقة.',
  'Start free': 'ابدأ مجانًا',
  'Keep reading': 'تابع القراءة',

  // Articles
  'How to describe your shop so the AI gets it right': 'كيف تصف متجرك ليفهمه الذكاء الاصطناعي على الوجه الصحيح',
  'Three sentences do most of the work: what you sell, who buys it, and how it should feel.':
    'ثلاث جمل تؤدي معظم العمل: ما الذي تبيعه، ومن يشتريه، وما الإحساس الذي تريده.',
  'Start with what you sell': 'ابدأ بما تبيعه',
  'Name the products and what makes them yours: where they’re made, what they’re made of, who makes them. “Hand block-printed cotton from Jaipur” gives the AI far more to work with than “clothes”.':
    'اذكر المنتجات وما يجعلها تخصّك: أين تُصنع، ومما تُصنع، ومن يصنعها. عبارة «قطن مطبوع يدويًا بالقوالب الخشبية من جايبور» تمنح الذكاء الاصطناعي مادة أغنى بكثير من كلمة «ملابس».',
  'Say who buys it': 'اذكر من يشتريه',
  'One line about your shoppers shapes the words and the layout. Gift buyers want a gift guide near the top; repeat customers want new arrivals first.':
    'سطر واحد عن متسوقيك يحدد الكلمات والتصميم. من يشترون الهدايا يريدون دليل هدايا في أعلى الصفحة، أما العملاء المتكررون فيريدون المنتجات الجديدة أولًا.',
  'Describe the feeling, not the layout': 'صِف الإحساس لا التصميم',
  'Words like calm, bold, warm or playful set colours, type and spacing. You don’t need to say where the button goes. If you have brand colours, name them.':
    'كلمات مثل هادئ أو جريء أو دافئ أو مرح تحدد الألوان والخطوط والمسافات. لا حاجة إلى أن تذكر مكان الزر. وإن كانت لديك ألوان العلامة التجارية فاذكرها.',
  'Then change one thing at a time': 'ثم غيّر شيئًا واحدًا في كل مرة',
  'Once the first version is live, ask for small changes: a new page, a simpler menu, bestsellers first. Each one arrives as a draft you can check, and every version stays in your history.':
    'بعد نشر النسخة الأولى، اطلب تغييرات صغيرة: صفحة جديدة، أو قائمة أبسط، أو الأكثر مبيعًا أولًا. يصلك كل تغيير على شكل مسودة يمكنك مراجعتها، وتبقى كل نسخة في سجلك.',

  'Selling into Europe: VAT, duties and what shoppers see at checkout': 'البيع في أوروبا: ضريبة القيمة المضافة والرسوم الجمركية وما يراه المتسوق عند الدفع',
  'What changes when you add a European market, and which settings to check first.': 'ما الذي يتغير عند إضافة سوق أوروبية، وأي الإعدادات تراجعها أولًا.',

  'Abandoned-cart reminders: when to send them and what to say': 'تذكيرات السلة المتروكة: متى ترسلها وماذا تكتب فيها',
  'Three reminders, three jobs. When to add a discount, and when not to.': 'ثلاثة تذكيرات، وثلاث مهام. متى تضيف خصمًا ومتى لا تفعل.',

  'Moving from Shopify: what comes across and what to check': 'الانتقال من Shopify: ما الذي ينتقل معك وما الذي تراجعه',
  'Products, versions, photos and collections come with you. Here is what to look at before you switch your domain.':
    'تنتقل معك المنتجات والنسخ والصور والمجموعات. إليك ما تراجعه قبل أن تنقل نطاقك.',

  'Size charts that answer the question before it’s asked': 'جداول المقاسات التي تجيب عن السؤال قبل أن يُطرح',
  'Fewer returns start on the product page. How to set up charts once and reuse them.': 'تبدأ قلة المرتجعات من صفحة المنتج. كيف تُعدّ الجداول مرة واحدة وتعيد استخدامها.',

  'Letting suppliers add products without losing control': 'السماح للموردين بإضافة المنتجات دون فقدان السيطرة',
  'Pick the right access level, decide whether to approve, and keep your catalogue consistent.': 'اختر مستوى الوصول المناسب، وقرر ما إذا كنت ستوافق على المنتجات، وحافظ على اتساق الكتالوج.',
};

export default ar;
