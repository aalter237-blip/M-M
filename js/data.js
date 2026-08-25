/* ============================================================
   بيانات الذكريات — عدّل هذا الملف لتخصيص التطبيق
   ============================================================
   ✏️  لتغيير الأسماء: عدّل قيم herName و hisName
   📅  لتغيير تاريخ بداية الحكاية: عدّل startDate (بصيغة سنة-شهر-يوم)
   📸  صورك الخاصة موجودة في مجلد  photos/
       - memory-01.jpg … memory-49.jpg  ← نسخك الأصلية (للعرض الكبير)
       - thumbs/memory-01.jpg …         ← نسخ مصغرة (للعرض السريع)
   📝  لكل ذكرة: photo = الصورة الأصلية، thumb = المصغرة،
       ويمكنك تعديل العنوان والتاريخ والمكان والقصة بحرية
   ============================================================ */

const APP_CONFIG = {
  herName:  'M',
  hisName:  'M',
  startDate: '2025-12-21', // بداية الحكاية — تاريخ أول ذكرياتكما معاً
};

const memories = [
  {
    id: 1, title: 'بداية الحكاية', date: '21 ديسمبر 2025', place: 'في قلب الرسائل',
    story: 'من هنا بدأ كل شيء… أول صورة، أول كلام، أول نبضة خجل. رسائلنا كانت أول صفحات قصتنا.',
    photo: 'photos/memory-01.jpg', thumb: 'photos/thumbs/memory-01.jpg',
  },
  {
    id: 2, title: 'حكاية الماسنجر', date: 'ديسمبر 2025', place: 'محادثاتنا التي لا تنتهي',
    story: 'ضحكاتنا تملأ الشاشة، وكلامنا لا يملّ. كل رسالة كانت تقول ما لا تستطيع الكلمات قوله.',
    photo: 'photos/memory-02.jpg', thumb: 'photos/thumbs/memory-02.jpg',
  },
  {
    id: 3, title: 'صورة من القلب', date: 'ديسمبر 2025', place: 'مرفقة بحب',
    story: 'صورة أرسلتها لك… كانت تحمل معها جزءاً من قلبي، وقبلتها بابتسامة.',
    photo: 'photos/memory-03.jpg', thumb: 'photos/thumbs/memory-03.jpg',
  },
  {
    id: 4, title: 'لحظة سناب', date: 'ديسمبر 2025', place: 'لحظات عابرة تبقى',
    story: 'لحظة عابرة في سناب… لكنها من اللحظات التي تُحفظ في القلب قبل الهاتف.',
    photo: 'photos/memory-04.jpg', thumb: 'photos/thumbs/memory-04.jpg',
  },
  {
    id: 5, title: 'ابتسامة لا تُنسى', date: 'ديسمبر 2025', place: 'يومٌ جميل',
    story: 'في كل صورةٍ منك أكتشف سبباً جديداً لأبتسم… أنت ضحكتي التي لا تنتهي.',
    photo: 'photos/memory-05.jpg', thumb: 'photos/thumbs/memory-05.jpg',
  },
  {
    id: 6, title: 'وجه أحببته', date: 'ديسمبر 2025', place: 'بين صفحات اليوم',
    story: 'نظرتُ إلى هذه الصورة فأدركت… أن أجمل ما في يومي هو أنتِ.',
    photo: 'photos/memory-06.jpg', thumb: 'photos/thumbs/memory-06.jpg',
  },
  {
    id: 7, title: 'ليلة أبريل الأولى', date: '22 أبريل 2026', place: 'ليلتنا',
    story: 'ليلةٌ من ليالي أبريل… حملت معها ضحكاً وكلاماً وذكرياتٍ صارت كنزاً.',
    photo: 'photos/memory-07.jpg', thumb: 'photos/thumbs/memory-07.jpg',
  },
  {
    id: 8, title: 'سهرتنا', date: '22 أبريل 2026', place: 'حيث يمر الوقت بسرعة',
    story: 'معك تمر الساعات كالدقائق… وما أجمل أن نخسر الوقت معاً.',
    photo: 'photos/memory-08.jpg', thumb: 'photos/thumbs/memory-08.jpg',
  },
  {
    id: 9, title: 'همسة الليل', date: '22 أبريل 2026', place: 'في هدوء المساء',
    story: 'كل ليلةٍ معك تحمل همساً جديداً… وكل همسة تزيد قلبي تعلقاً.',
    photo: 'photos/memory-09.jpg', thumb: 'photos/thumbs/memory-09.jpg',
  },
  {
    id: 10, title: 'صباح الخير يا حبيبي', date: '23 أبريل 2026', place: 'بداية يومنا',
    story: 'أول ما أراه في صباحي… أنت. وهذه أجمل بداية ممكنة لأي يوم.',
    photo: 'photos/memory-10.jpg', thumb: 'photos/thumbs/memory-10.jpg',
  },
  {
    id: 11, title: 'نور عيني', date: '23 أبريل 2026', place: 'في كل نظرة',
    story: 'أنتِ النور الذي أضاء لياليّ… وهذه الصورة تشهد على ذلك.',
    photo: 'photos/memory-11.jpg', thumb: 'photos/thumbs/memory-11.jpg',
  },
  {
    id: 12, title: 'أجمل ما في يومي', date: '23 أبريل 2026', place: 'حيث تكون',
    story: 'بعض اللحظات لا تحتاج كلمات… فقط نظرة، وصورة، وقلب يعرف.',
    photo: 'photos/memory-12.jpg', thumb: 'photos/thumbs/memory-12.jpg',
  },
  {
    id: 13, title: 'سناب من القلب', date: 'أبريل 2026', place: 'لحظة من أيامنا',
    story: 'صورة من سناب… لكنها بالنسبة لي من أجمل الرسائل.',
    photo: 'photos/memory-13.jpg', thumb: 'photos/thumbs/memory-13.jpg',
  },
  {
    id: 14, title: 'ذكريات ديسمبر', date: '21 ديسمبر 2025', place: 'أيام كنا نلتقي فيها',
    story: 'ديسمبر… الشهر الذي جمعنا. كل صورة منه تذكرني كيف بدأ الحب.',
    photo: 'photos/memory-14.jpg', thumb: 'photos/thumbs/memory-14.jpg',
  },
  {
    id: 15, title: 'ضحكتك', date: '21 ديسمبر 2025', place: 'من أرشيف أيامنا',
    story: 'أبحث عن ضحكتك في كل صورة… فأجدها دائماً تسبقني إليها.',
    photo: 'photos/memory-15.jpg', thumb: 'photos/thumbs/memory-15.jpg',
  },
  {
    id: 16, title: 'لحظة حلوة', date: '21 ديسمبر 2025', place: 'يوم لا يُنسى',
    story: 'بعض الأيام تُحفر في القلب… وهذا اليوم منها، لأنك كنت فيه.',
    photo: 'photos/memory-16.jpg', thumb: 'photos/thumbs/memory-16.jpg',
  },
  {
    id: 17, title: 'ذكريات واتساب', date: '21 ديسمبر 2025', place: 'محادثتنا الدافئة',
    story: 'كل صورة في واتساب تحمل حكاية… وهذه الحكاية تخصنا وحدنا.',
    photo: 'photos/memory-17.jpg', thumb: 'photos/thumbs/memory-17.jpg',
  },
  {
    id: 18, title: 'سهرة أبريل', date: '22 أبريل 2026', place: 'على شاشة صغيرة',
    story: 'سهرة مشاهدة معاً… حتى الأفلام صارت أجمل حين أشاهدها معك.',
    photo: 'photos/memory-18.jpg', thumb: 'photos/thumbs/memory-18.jpg',
  },
  {
    id: 19, title: 'يومنا في أبريل', date: '25 أبريل 2026', place: 'معاً في كل مكان',
    story: '25 أبريل… يومٌ جمع تفاصيلنا، وكل صورة فيه تحكي عنا.',
    photo: 'photos/memory-19.jpg', thumb: 'photos/thumbs/memory-19.jpg',
  },
  {
    id: 20, title: 'لحظة من القلب', date: '25 أبريل 2026', place: 'في حضرة الحب',
    story: 'في هذه اللحظة كنت أقول لك شيئاً… وأتمنى لو أعيدها لأقوله مرات.',
    photo: 'photos/memory-20.jpg', thumb: 'photos/thumbs/memory-20.jpg',
  },
  {
    id: 21, title: 'ابتسامة نيسان', date: '25 أبريل 2026', place: 'يوم مشمس بحضورك',
    story: 'ابتسامتك في أبريل… كشمسٍ لا تغرب عن سماء قلبي.',
    photo: 'photos/memory-21.jpg', thumb: 'photos/thumbs/memory-21.jpg',
  },
  {
    id: 22, title: 'ذكريات مصوّرة', date: '25 أبريل 2026', place: 'من عدسة قلبنا',
    story: 'عدسة الهاتف وثّقت اللحظة… لكن القلب وثّق الشعور.',
    photo: 'photos/memory-22.jpg', thumb: 'photos/thumbs/memory-22.jpg',
  },
  {
    id: 23, title: 'أيامنا الحلوة', date: '25 أبريل 2026', place: 'كل يوم معك عيد',
    story: 'لا أحتاج مناسبة لأفرح… وجودك معي هو المناسبة.',
    photo: 'photos/memory-23.jpg', thumb: 'photos/thumbs/memory-23.jpg',
  },
  {
    id: 24, title: 'نظرة واحدة تكفي', date: '25 أبريل 2026', place: 'في عينيك',
    story: 'نظرة واحدة منك تكفي لتمحو تعب يومٍ كامل… وأنا أحتاجها كل يوم.',
    photo: 'photos/memory-24.jpg', thumb: 'photos/thumbs/memory-24.jpg',
  },
  {
    id: 25, title: 'قربك', date: '25 أبريل 2026', place: 'لا يوصف',
    story: 'قربك لا يُقاس بالمسافات… بل بالحضور الذي يشعر به قلبي.',
    photo: 'photos/memory-25.jpg', thumb: 'photos/thumbs/memory-25.jpg',
  },
  {
    id: 26, title: 'دفء اللحظة', date: '25 أبريل 2026', place: 'بين أيدينا',
    story: 'بعض اللحظات دافئة كحضن… وهذه اللحظة من أكثرها دفئاً.',
    photo: 'photos/memory-26.jpg', thumb: 'photos/thumbs/memory-26.jpg',
  },
  {
    id: 27, title: 'سهرة الفيلم', date: '25 أبريل 2026', place: 'أمسية سينما',
    story: 'لقطات من فيلم نشاهده معاً… أجمل ما في الفيلم أنني كنت أشاهده معك.',
    photo: 'photos/memory-27.jpg', thumb: 'photos/thumbs/memory-27.jpg',
  },
  {
    id: 28, title: 'مشهد يذكرنا', date: '25 أبريل 2026', place: 'على الشاشة',
    story: 'بعض المشاهد تصفنا تماماً… وهذا المشهد صار من ذكرياتنا.',
    photo: 'photos/memory-28.jpg', thumb: 'photos/thumbs/memory-28.jpg',
  },
  {
    id: 29, title: 'حكاية الفيلم', date: '25 أبريل 2026', place: 'أمسية رومانسية',
    story: 'فيلمٌ واحد… وقلبان يشاهدان. يا ليت كل الأفلام بهذا الطول الجميل.',
    photo: 'photos/memory-29.jpg', thumb: 'photos/thumbs/memory-29.jpg',
  },
  {
    id: 30, title: 'لقطة حب', date: '25 أبريل 2026', place: 'من أرشيف السهرة',
    story: 'لقطة من لقطاتنا المفضلة… لأنها جمعتنا حول شاشة واحدة.',
    photo: 'photos/memory-30.jpg', thumb: 'photos/thumbs/memory-30.jpg',
  },
  {
    id: 31, title: 'سهرة لا تنسى', date: '25 أبريل 2026', place: 'في عالمنا الصغير',
    story: 'في عالمنا الصغير… شاشة، وبطانية، وأنت بجانبي. يكفي.',
    photo: 'photos/memory-31.jpg', thumb: 'photos/thumbs/memory-31.jpg',
  },
  {
    id: 32, title: 'مشهدنا المفضل', date: '25 أبريل 2026', place: 'نعيده دائماً',
    story: 'نعيد مشاهدة هذا المشهد… لأنه يشبهنا: حلو، بسيط، ويستحق التكرار.',
    photo: 'photos/memory-32.jpg', thumb: 'photos/thumbs/memory-32.jpg',
  },
  {
    id: 33, title: 'ضحكنا معاً', date: '25 أبريل 2026', place: 'لحظة عفوية',
    story: 'في هذه اللقطة ضحكنا بصدق… وضحكتك هي أجمل صوت في ذاكرتي.',
    photo: 'photos/memory-33.jpg', thumb: 'photos/thumbs/memory-33.jpg',
  },
  {
    id: 34, title: 'أمسية الأبطال', date: '25 أبريل 2026', place: 'بطلانا نحن',
    story: 'مهما كان الفيلم، فبطل الحكاية الحقيقي… أنت وأنا.',
    photo: 'photos/memory-34.jpg', thumb: 'photos/thumbs/memory-34.jpg',
  },
  {
    id: 35, title: 'مساء أبريل', date: '25 أبريل 2026', place: 'في هدوء المساء',
    story: 'مساءٌ هادئ من أبريل… كنت فيه أجمل ما في المساء.',
    photo: 'photos/memory-35.jpg', thumb: 'photos/thumbs/memory-35.jpg',
  },
  {
    id: 36, title: 'خاتمة يومنا', date: '25 أبريل 2026', place: 'قبل أن ننام',
    story: 'آخر صورة في يومنا… لأغمض عيني على أجمل ذكرى.',
    photo: 'photos/memory-36.jpg', thumb: 'photos/thumbs/memory-36.jpg',
  },
  {
    id: 37, title: 'رسالة صباحية', date: '26 أبريل 2026', place: 'من قلب الواتساب',
    story: 'رسالة صباحية منك… تبدأ بها أيامي أجمل دائماً.',
    photo: 'photos/memory-37.jpg', thumb: 'photos/thumbs/memory-37.jpg',
  },
  {
    id: 38, title: 'يوم جديد معك', date: '26 أبريل 2026', place: 'بداية أجمل يوم',
    story: '26 أبريل… يومٌ جديد حمل معه ضحكة جديدة وذكريات جديدة.',
    photo: 'photos/memory-38.jpg', thumb: 'photos/thumbs/memory-38.jpg',
  },
  {
    id: 39, title: 'لقطتنا', date: '26 أبريل 2026', place: 'لحظة حقيقية',
    story: 'لقطة حقيقية من يومنا… بلا فلاتر، لأن أجمل ما فينا حقيقي.',
    photo: 'photos/memory-39.jpg', thumb: 'photos/thumbs/memory-39.jpg',
  },
  {
    id: 40, title: 'ذكريات نيسان الأخيرة', date: '26 أبريل 2026', place: 'وداعاً أبريل الجميل',
    story: 'أبريل يودّعنا… لكنه يترك لنا صوراً تبقى في القلب.',
    photo: 'photos/memory-40.jpg', thumb: 'photos/thumbs/memory-40.jpg',
  },
  {
    id: 41, title: 'مونتاج حبنا', date: '26 أبريل 2026', place: 'فيديو يجمعنا',
    story: 'من فيديو جمعناه… لقطة تختصر كل ما لا أقوله.',
    photo: 'photos/memory-41.jpg', thumb: 'photos/thumbs/memory-41.jpg',
  },
  {
    id: 42, title: 'سناب من أيامنا', date: 'أبريل 2026', place: 'لحظة يومية',
    story: 'لحظة يومية بسيطة… لكنها منك، فصارت ثمينة.',
    photo: 'photos/memory-42.jpg', thumb: 'photos/thumbs/memory-42.jpg',
  },
  {
    id: 43, title: 'أنت في صوري', date: 'أبريل 2026', place: 'في كل لقطة',
    story: 'كل صوري تشبهك… لأن عيني لم تعد ترى غيرك.',
    photo: 'photos/memory-43.jpg', thumb: 'photos/thumbs/memory-43.jpg',
  },
  {
    id: 44, title: 'لحظة عابرة باقية', date: 'أبريل 2026', place: 'عابرة لكنها باقية',
    story: 'لحظة عابرة… لكنها من اللحظات التي تبقى للأبد.',
    photo: 'photos/memory-44.jpg', thumb: 'photos/thumbs/memory-44.jpg',
  },
  {
    id: 45, title: 'يومياتنا', date: 'أبريل 2026', place: 'سجل ذكرياتنا',
    story: 'كل صورة صفحة في يومياتنا… وهذا الكتاب لا أريد له نهاية.',
    photo: 'photos/memory-45.jpg', thumb: 'photos/thumbs/memory-45.jpg',
  },
  {
    id: 46, title: 'وجهي المفضل', date: 'أبريل 2026', place: 'وجهٌ أحبه',
    story: 'من بين كل الوجوه… وجهك هو الذي يريح قلبي.',
    photo: 'photos/memory-46.jpg', thumb: 'photos/thumbs/memory-46.jpg',
  },
  {
    id: 47, title: 'ضحكة سناب', date: 'أبريل 2026', place: 'لحظة عفوية',
    story: 'ضحكة عفوية وثّقتها الكاميرا… وأنا وثّقتها في قلبي.',
    photo: 'photos/memory-47.jpg', thumb: 'photos/thumbs/memory-47.jpg',
  },
  {
    id: 48, title: 'كل يوم معك', date: 'أبريل 2026', place: 'أجمل أيام عمري',
    story: 'كل يومٍ معك أجمل من الذي قبله… وهذه شهادتي أمام كل الصور.',
    photo: 'photos/memory-48.jpg', thumb: 'photos/thumbs/memory-48.jpg',
  },
  {
    id: 49, title: 'القادم أجمل', date: 'مستمرة…', place: 'حكايتنا لم تنتهِ',
    story: 'هذه آخر لقطة… لكن حكايتنا ما زالت تكتب. القادم أجمل، لأنك معي.',
    photo: 'photos/memory-49.jpg', thumb: 'photos/thumbs/memory-49.jpg',
  },
];
