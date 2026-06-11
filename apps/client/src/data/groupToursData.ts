export interface GroupTourLocale {
  title: string;
  shortDescription: string;
  fullDescription: string;
  region: string;
  startingPoint: string;
  languages: string[];
  departures: { days: string; times: string[] }[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { day: number; title: string; description: string; stops: string[]; meals: string[] }[];
  faq: { question: string; answer: string }[];
}

export interface GroupTourMock {
  id: number;
  slug: string;
  category: 'group';
  duration: string;
  durationHours: number;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  maxGroupSize: number;
  minGroupSize: number;
  pickupIncluded: boolean;
  badge?: string;
  en: GroupTourLocale;
  ru: GroupTourLocale;
  hy: GroupTourLocale;
}

export const groupTours: GroupTourMock[] = [
  {
    id: 101,
    slug: 'group-garni-sevan',
    category: 'group',
    duration: '~8 hours',
    durationHours: 8,
    price: 10000,
    image: '/tours/arch.jpg',
    gallery: [
      '/tours/arch.jpg',
      '/tours/garni.jpg',
      '/tours/symphony.jpg',
      '/tours/geghard.jpg',
      '/tours/geghard-inside.jpg',
      '/tours/sevan-beach.jpg',
      '/tours/sevanavank.jpg',
      '/tours/sevan-promenade.jpg',
    ],
    rating: 4.8,
    reviewCount: 156,
    maxGroupSize: 15,
    minGroupSize: 1,
    pickupIncluded: true,
    badge: 'Best Seller',
    en: {
      title: 'Garni – Sevan Group Tour',
      shortDescription: 'Arch of Charents, Garni Temple, Symphony of Stones, Geghard Monastery, Sevan Lake & Sevanavank in one day.',
      fullDescription: 'Starting with the Arch of Charents and its iconic panoramic view of snow-capped Mount Ararat, this group tour visits the only standing Hellenistic temple in the South Caucasus at Garni, then descends into the dramatic Symphony of Stones basalt gorge. After a guided visit to Geghard Monastery — partially carved from solid rock and listed as a UNESCO World Heritage Site — the route heads east to the azure highland waters of Lake Sevan. The day concludes at the 9th-century Sevanavank Monastery, perched dramatically on a lake peninsula with sweeping panoramas over one of the world\'s largest high-altitude lakes.',
      region: 'Kotayk / Gegharkunik',
      startingPoint: 'Yerevan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Daily', times: ['08:30'] }],
      highlights: [
        'Arch of Charents — panoramic view of Mt. Ararat',
        'Garni Hellenistic Temple (1st century AD)',
        'Symphony of Stones basalt gorge',
        'Geghard UNESCO Monastery carved into the cliff',
        'Lake Sevan at 1,900 m altitude',
        'Sevanavank Monastery on the lake peninsula',
      ],
      included: [
        'Air-conditioned minibus',
        'Bottled water',
      ],
      excluded: [
        'Entrance fees (Garni AMD 1,500 · Symphony of Stones - 300 AMD)',
        'Lunch (own expense at local restaurant)',
        'Tips',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arch of Charents',
          description: 'Depart Yerevan and stop at the Arch of Charents for the classic panoramic view of snow-capped Mount Ararat across the Ararat Valley.',
          stops: ['Arch of Charents Viewpoint'],
          meals: [],
        },
        {
          day: 1,
          title: 'Garni Temple & Symphony of Stones',
          description: 'Visit the 1st-century Garni Temple — the only Greco-Roman colonnaded building in Armenia. Walk down to the stunning Symphony of Stones basalt gorge carved by the Azat River.',
          stops: ['Garni Temple', 'Symphony of Stones Gorge'],
          meals: [],
        },
        {
          day: 1,
          title: 'Geghard Monastery',
          description: 'Explore Geghard Monastery, partially carved from solid rock and listed as a UNESCO World Heritage Site. Discover the cave chapels and sacred spring deep inside the cliff.',
          stops: ['Geghard Main Church', 'Cave Chapels', 'Sacred Spring'],
          meals: ['Lunch break (own expense)'],
        },
        {
          day: 1,
          title: 'Lake Sevan & Sevanavank',
          description: 'Drive east to Lake Sevan. Climb the steps to the 9th-century Sevanavank Monastery on the peninsula for breathtaking panoramic views over the turquoise lake before returning to Yerevan.',
          stops: ['Sevanavank Monastery', 'Sevan Lakeside Promenade'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Is this a private or shared tour?',
          answer: 'This is a shared group tour with up to 15 participants. For a private experience with a dedicated vehicle and guide, see our private tour options.',
        },
        {
          question: 'Are entrance fees included?',
          answer: 'Entrance fees are not included in the tour price. Garni AMD 1,500, Geghard AMD 400, and Sevanavank AMD 1,000 — all paid on-site.',
        },
        {
          question: 'What time does the tour return to Yerevan?',
          answer: 'The tour typically returns to Yerevan between 16:00 and 16:30.',
        },
      ],
    },
    ru: {
      title: 'Гарни – Севан: Групповой тур',
      shortDescription: 'Арка Чаренца, храм Гарни, Симфония камней, монастырь Гегард, озеро Севан и Севанаванк за один день.',
      fullDescription: 'Начиная с Арки Чаренца и её знаменитого панорамного вида на Арарат, этот групповой тур ведёт вас к единственному сохранившемуся эллинистическому храму Южного Кавказа в Гарни, а затем в захватывающее ущелье «Симфония камней». После посещения монастыря Гегард, частично высеченного в скале и включённого в список Всемирного наследия ЮНЕСКО, маршрут направляется на восток к лазурным водам высокогорного озера Севан. День завершается у монастыря Севанаванк IX века на живописном полуострове с потрясающим видом на озеро.',
      region: 'Котайк / Гегаркуник',
      startingPoint: 'Ереван',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ежедневно', times: ['08:30'] }],
      highlights: [
        'Арка Чаренца — панорамный вид на Арарат',
        'Эллинистический храм Гарни (I в. н.э.)',
        'Базальтовое ущелье «Симфония камней»',
        'Монастырь Гегард (ЮНЕСКО) — вырублен в скале',
        'Озеро Севан на высоте 1 900 м',
        'Монастырь Севанаванк на полуострове',
      ],
      included: [
        'Автобус с кондиционером',

        'Вода в бутылках',
      ],
      excluded: [
        'Входные билеты (Гарни — 1 500 AMD · Симфония камней - 300 AMD',
        'Обед (по желанию в местном ресторане)',
        'Чаевые',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Арка Чаренца',
          description: 'Отправление из Еревана с остановкой у Арки Чаренца — для панорамного вида на заснеженный Арарат над Араратской долиной.',
          stops: ['Смотровая площадка Арки Чаренца'],
          meals: [],
        },
        {
          day: 1,
          title: 'Храм Гарни и Симфония камней',
          description: 'Посещение храма Гарни I века — единственного греко-римского колонного здания в Армении. Спуск к знаменитому ущелью «Симфония камней».',
          stops: ['Храм Гарни', 'Ущелье Симфония камней'],
          meals: [],
        },
        {
          day: 1,
          title: 'Монастырь Гегард',
          description: 'Осмотр монастыря Гегард, частично вырубленного в скале и включённого в список Всемирного наследия ЮНЕСКО. Пещерные часовни и священный источник внутри скалы.',
          stops: ['Главная церковь Гегарда', 'Пещерные часовни', 'Священный источник'],
          meals: ['Обеденная остановка (за свой счёт)'],
        },
        {
          day: 1,
          title: 'Озеро Севан и Севанаванк',
          description: 'Поездка на восток к озеру Севан. Подъём к монастырю Севанаванк IX века на полуострове с панорамным видом на бирюзовое озеро перед возвращением в Ереван.',
          stops: ['Монастырь Севанаванк', 'Набережная озера Севан'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Это частный или групповой тур?',
          answer: 'Это групповой тур с участием до 15 человек. Для индивидуального опыта смотрите наши варианты частных туров.',
        },
        {
          question: 'Включены ли входные билеты?',
          answer: 'Входные билеты не включены. Гарни — 1 500 AMD, Гегард — 400 AMD, Севанаванк — 1 000 AMD, оплата на месте.',
        },
        {
          question: 'В какое время тур возвращается в Ереван?',
          answer: 'Тур обычно возвращается в Ереван между 16:00 и 16:30.',
        },
      ],
    },
    hy: {
      title: 'Գառնի – Սևան խմբային շրջայց',
      shortDescription:
        'Չարենցի կամար, Գառնիի տաճար, Քարերի սիմֆոնիա, Գեղարդի վանք, Սևանա լիճ և Սևանավանք՝ մեկ օրում։',
      fullDescription:
        'Շրջայցը սկսվում է Չարենցի կամարից, որտեղ բացվում է Արարատ լեռան խորհրդանշական համայնապատկերը։ Այնուհետև ուղևորվում ենք դեպի Գառնի՝ Հարավային Կովկասում պահպանված միակ հելլենիստական տաճարը, ապա իջնում ենք Ազատ գետի կիրճ՝ հայտնի Քարերի սիմֆոնիա բնական հուշարձանը տեսնելու։ Շարունակելով ճանապարհը՝ այցելում ենք ժայռի մեջ մասամբ փորված Գեղարդի վանական համալիր, որը ներառված է ՅՈւՆԵՍԿՕ-ի համաշխարհային ժառանգության ցանկում։ Օրվա վերջում ուղևորվում ենք Սևանա լիճ և բարձրանում Սևանավանք՝ վայելելու լճի և շրջակա լեռների հիասքանչ տեսարանները։',
      region: 'Կոտայք / Գեղարքունիք',
      startingPoint: 'Երևան',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ամեն օր', times: ['08:30'] }],
      highlights: [
        'Չարենցի կամար՝ Արարատ լեռան համայնապատկեր',
        'Գառնիի հեթանոսական տաճար (մ.թ. 1-ին դար)',
        'Քարերի սիմֆոնիա՝ բազալտե կիրճ',
        'Գեղարդի վանք (ՅՈւՆԵՍԿՕ)',
        'Սևանա լիճ՝ 1900 մ բարձրության վրա',
        'Սևանավանք՝ լճի թերակղզու վրա',
      ],
      included: [
        'Օդորակիչով միկրոավտոբուս',
        'Տրանսֆեր հյուրանոցից և դեպի հյուրանոց (Երևան)',
        'Շշալցված ջուր',
      ],
      excluded: [
        'Մուտքի վճարներ (Գառնի՝ 1 500 AMD · Քարերի սիմֆոնիա՝ 300 AMD)',
        'Ճաշ (ըստ ցանկության)',
        'Թեյավճար',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Չարենցի կամար',
          description:
            'Մեկնում Երևանից և կանգառ Չարենցի կամարի մոտ՝ Արարատ լեռան դասական համայնապատկերը դիտելու համար։',
          stops: ['Մեկնում հյուրանոցից', 'Չարենցի կամար'],
          meals: [],
        },
        {
          day: 1,
          title: 'Գառնիի տաճար և Քարերի սիմֆոնիա',
          description:
            'Այցելություն մ.թ. 1-ին դարի Գառնիի տաճար՝ Հայաստանի միակ հելլենիստական կառույցը։ Այնուհետև զբոսանք Քարերի սիմֆոնիա կիրճում։',
          stops: ['Գառնիի տաճար', 'Քարերի սիմֆոնիա'],
          meals: [],
        },
        {
          day: 1,
          title: 'Գեղարդի վանք',
          description:
            'Այցելություն Գեղարդի վանական համալիր, որը մասամբ փորված է ժայռի մեջ և ընդգրկված է ՅՈւՆԵՍԿՕ-ի ցանկում։',
          stops: ['Գեղարդի գլխավոր եկեղեցի', 'Ժայռափոր մատուռներ', 'Սուրբ աղբյուր'],
          meals: ['Ճաշի ընդմիջում (ըստ ցանկության)'],
        },
        {
          day: 1,
          title: 'Սևանա լիճ և Սևանավանք',
          description:
            'Ուղևորություն դեպի Սևանա լիճ։ Բարձրացում Սևանավանք՝ լճի և շրջակա լեռների համայնապատկերը վայելելու համար։',
          stops: ['Սևանավանք', 'Սևանի ափ'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Սա խմբային թե՞ անհատական շրջայց է',
          answer:
            'Սա խմբային շրջայց է՝ մինչև 15 մասնակից։ Անհատական շրջայցերը հասանելի են առանձին հարցման դեպքում։',
        },
        {
          question: 'Մուտքի վճարները ներառվա՞ծ են',
          answer:
            'Մուտքի վճարները ներառված չեն։ Վճարումը կատարվում է տեղում։',
        },
        {
          question: 'Ե՞րբ է վերադարձը Երևան',
          answer:
            'Շրջայցը սովորաբար ավարտվում է 16:00–16:30-ի սահմաններում։',
        },
      ],
    },
  },

  {
    id: 102,
    slug: 'group-sevan-dilijan',
    category: 'group',
    duration: '~8 hours',
    durationHours: 8,
    price: 10000,
    image: '/tours/sevan.jpg',
    gallery: [
      '/tours/sevan.jpg',
      '/tours/sevan-promenade.jpg',
      '/tours/old-dilijan.jpg',
      '/tours/mimino.jpg',
      '/tours/parz-lake.jpg',
      '/tours/dilijan-park.jpeg',
      '/tours/haghartsin.jpg',
      '/tours/gavit.jpg'
    ],
    rating: 4.7,
    reviewCount: 112,
    maxGroupSize: 15,
    minGroupSize: 1,
    pickupIncluded: true,
    en: {
      title: 'Sevan – Dilijan Group Tour',
      shortDescription: 'Sevan Lake, Dilijan Old Town, Mimino monument, Parz Lake & Haghartsin Monastery in one scenic day.',
      fullDescription: 'This group tour combines two of Armenia\'s most beloved regions: the highland lake district of Sevan and the lush national park of Dilijan — Armenia\'s "Little Switzerland." Begin at the azure shores of Lake Sevan, then head into the forested hills to Dilijan. Stroll through the charming cobblestone Old Town, take a photo with the beloved Mimino film monument, reflect at the tranquil Parz Lake, and finish at Haghartsin Monastery — a 13th-century gem tucked deep in ancient oak forest.',
      region: 'Gegharkunik / Tavush',
      startingPoint: 'Yerevan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Daily', times: ['08:30'] }],
      highlights: [
        'Lake Sevan — one of the world\'s largest high-altitude lakes',
        'Dilijan Old Town with traditional artisan workshops',
        'Mimino monument — icon of the beloved Soviet-era film',
        'Parz Lake — serene forest lake',
        'Haghartsin Monastery (13th c.) hidden in dense oak forest',
      ],
      included: [
        'Air-conditioned minibus',
        'Bottled water',
      ],
      excluded: [
        'Haghartsin entrance fee (AMD 200)',
        'Lunch (own expense)',
        'Tips',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Lake Sevan',
          description: 'Drive east from Yerevan to Lake Sevan at 1,900 m — one of the world\'s largest high-altitude freshwater lakes. Take in the turquoise waters and the surrounding volcanic mountain range.',
          stops: ['Lake Sevan Promenade'],
          meals: [],
        },
        {
          day: 1,
          title: 'Dilijan Old Town & Mimino Monument',
          description: 'Enter Dilijan National Park and stop in the charming Old Town quarter with its restored craftsmen workshops. Photograph the famous Mimino monument, beloved character of the 1977 Soviet film.',
          stops: ['Dilijan Old Town', 'Artisan Workshops', 'Mimino Monument'],
          meals: ['Lunch break (own expense)'],
        },
        {
          day: 1,
          title: 'Parz Lake',
          description: 'A short drive to Parz (Clear) Lake — a serene forest lake surrounded by tall oak and beech trees. Walk the peaceful shore trail and breathe in the fresh mountain air.',
          stops: ['Parz Lake Shore Trail'],
          meals: [],
        },
        {
          day: 1,
          title: 'Haghartsin Monastery',
          description: 'End the day at the 13th-century Haghartsin Monastery complex hidden among ancient oaks in the heart of Dilijan forest. Explore the main cathedral, gavit and surrounding khachkars.',
          stops: ['Haghartsin Main Cathedral', 'Gavit', 'Forest Path'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Is this a private or shared tour?',
          answer: 'This is a shared group tour with up to 15 participants. Private tours are also available on request.',
        },
        {
          question: 'Can we swim in Parz Lake?',
          answer: 'Swimming is possible in summer months. There are small beach areas and rental boats available at the lake.',
        },
        {
          question: 'What time does the tour return to Yerevan?',
          answer: 'The tour typically returns to Yerevan between 16:00 and 16:30.',
        },
      ],
    },
    ru: {
      title: 'Севан – Дилижан: Групповой тур',
      shortDescription: 'Озеро Севан, Старый Дилижан, памятник Мимино, озеро Парз и монастырь Агарцин за один живописный день.',
      fullDescription: 'Этот групповой тур сочетает два наиболее любимых региона Армении: высокогорное озеро Севан и лесистый национальный парк Дилижан — «армянскую Швейцарию». Начните у лазурных берегов Севана, затем углубитесь в лесистые холмы Дилижана. Прогуляйтесь по мощёному Старому городу, сфотографируйтесь у памятника герою фильма «Мимино», полюбуйтесь тихим озером Парз и завершите день в монастыре Агарцин XIII века среди дубовых лесов.',
      region: 'Гегаркуник / Тавуш',
      startingPoint: 'Ереван',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ежедневно', times: ['08:30'] }],
      highlights: [
        'Озеро Севан — одно из крупнейших высокогорных озёр мира',
        'Старый Дилижан с традиционными ремесленными мастерскими',
        'Памятник Мимино — символ любимого советского фильма',
        'Озеро Парз — тихое лесное озеро',
        'Монастырь Агарцин (XIII в.) в густом дубовом лесу',
      ],
      included: [
        'Автобус с кондиционером',
        'Вода в бутылках',
      ],
      excluded: [
        'Входной билет в Агарцин (200 AMD)',
        'Обед (за свой счёт)',
        'Чаевые',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Озеро Севан',
          description: 'Поездка на восток от Еревана к озеру Севан на высоте 1 900 м. Любование бирюзовыми водами и вулканическими горами вокруг.',
          stops: ['Набережная озера Севан'],
          meals: [],
        },
        {
          day: 1,
          title: 'Старый Дилижан и памятник Мимино',
          description: 'Въезд в Дилижанский национальный парк и прогулка по Старому городу. Посещение ремесленных мастерских и фотосессия у памятника Мимино.',
          stops: ['Старый Дилижан', 'Ремесленные мастерские', 'Памятник Мимино'],
          meals: ['Обеденная остановка (за свой счёт)'],
        },
        {
          day: 1,
          title: 'Озеро Парз',
          description: 'Короткая поездка к озеру Парз — тихому лесному озеру среди высоких дубов и буков. Прогулка по берегу и свежий горный воздух.',
          stops: ['Берег озера Парз'],
          meals: [],
        },
        {
          day: 1,
          title: 'Монастырь Агарцин',
          description: 'Завершение дня в монастыре Агарцин XIII века, укрытом среди древних дубов. Главный собор, гавит и хачкары.',
          stops: ['Главный собор Агарцина', 'Гавит', 'Лесная тропа'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Это частный или групповой тур?',
          answer: 'Это групповой тур с участием до 15 человек. Частные туры также доступны по запросу.',
        },
        {
          question: 'Можно ли купаться в озере Парз?',
          answer: 'Купание возможно в летние месяцы. На озере есть небольшие пляжи и лодки напрокат.',
        },
        {
          question: 'В какое время тур возвращается в Ереван?',
          answer: 'Тур обычно возвращается в Ереван между 16:00 и 16:30.',
        },
      ],
    },
    hy: {
      title: 'Սևան – Դիլիջան խմբակային տուր',
      shortDescription: 'Սևանա լիճ, Դիլիջանի հին քաղաք, Միմինոյի հուշարձան, Պարզ լիճ և Հաղարծնի վանք՝ մեկ գեղեցիկ օրվա ընթացքում։',
      fullDescription: 'Այս խմբակային տուրը միավորում է Հայաստանի երկու ամենասիրված տարածաշրջանները՝ Սևանի լեռնային լճային գոտին և Դիլիջանի կանաչ ազգային պարկը՝ հաճախ անվանվող Հայաստանի «Փոքր Շվեյցարիա»։ Տուրը սկսվում է Սևանա լճի կապույտ ափերից, ապա շարունակվում դեպի Դիլիջանի անտառապատ բլուրներ։ Քայլեք հմայիչ սալահատակ հին քաղաքում, լուսանկարվեք հանրահայտ Միմինո ֆիլմի հուշարձանի մոտ, վայելեք Պարզ լճի խաղաղ մթնոլորտը և ավարտեք օրը Հաղարծնի վանքում՝ 13-րդ դարի ճարտարապետական գոհար, թաքնված հնագույն կաղնիների խորքում։',
      region: 'Գեղարքունիք / Տավուշ',
      startingPoint: 'Երևան',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ամեն օր', times: ['08:30'] }],
      highlights: [
        'Սևանա լիճ — աշխարհի ամենախոշոր բարձրադիր քաղցրահամ լճերից մեկը',
        'Դիլիջանի հին քաղաք՝ ավանդական արհեստանոցներով',
        'Միմինոյի հուշարձան — սիրված խորհրդային ֆիլմի խորհրդանիշ',
        'Պարզ լիճ — խաղաղ անտառային լիճ',
        'Հաղարծնի վանք (13-րդ դ.)՝ թաքնված խիտ կաղնու անտառում',
      ],
      included: [
        'Օդորակիչով միկրոավտոբուս',
        'Շշալցված ջուր',
      ],
      excluded: [
        'Ճաշ (ինքնուրույն)',
        'Թեյավճարներ',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Սևանա լիճ',
          description: 'Երթ Երևանից դեպի Սևանա լիճ՝ 1,900 մ բարձրության վրա գտնվող աշխարհի խոշորագույն բարձրադիր քաղցրահամ լճերից մեկը։ Վայելեք փիրուզագույն ջրերը և շրջապատող հրաբխային լեռնաշղթաները։',
          stops: ['Սևանա լճի զբոսավայր'],
          meals: [],
        },
        {
          day: 1,
          title: 'Դիլիջանի հին քաղաք և Միմինոյի հուշարձան',
          description: 'Մուտք Դիլիջանի ազգային պարկ և կանգառ հմայիչ հին քաղաքամասում՝ վերականգնված արհեստագործական արհեստանոցներով։ Լուսանկարեք հանրահայտ Միմինոյի հուշարձանը՝ 1977 թվականի սիրված խորհրդային ֆիլմի հերոսը։',
          stops: ['Դիլիջանի հին քաղաք', 'Արհեստագործական արհեստանոցներ', 'Միմինոյի հուշարձան'],
          meals: ['Ճաշի ընդմիջում (ինքնուրույն)'],
        },
        {
          day: 1,
          title: 'Պարզ լիճ',
          description: 'Կարճ ուղևորություն դեպի Պարզ լիճ՝ խաղաղ անտառային լիճ, շրջապատված կաղնու և հաճարենի ծառերով։ Քայլեք լճի ափով և վայելեք մաքուր լեռնային օդը։',
          stops: ['Պարզ լճի ափամերձ արահետ'],
          meals: [],
        },
        {
          day: 1,
          title: 'Հաղարծնի վանք',
          description: 'Օրվա ավարտը՝ 13-րդ դարի Հաղարծնի վանական համալիրում, որը թաքնված է Դիլիջանի անտառների խորքում՝ հնագույն կաղնիների մեջ։ Այցելեք գլխավոր եկեղեցին, գավիթը և շրջակա խաչքարերը։',
          stops: ['Հաղարծնի գլխավոր եկեղեցի', 'Գավիթ', 'Անտառային արահետ'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Տուրը անհատական է, թե խմբակային՞',
          answer: 'Սա խմբակային տուր է՝ մինչև 15 մասնակցով։ Անհատական տուրերը հնարավոր են նախնական հարցումով։',
        },
        {
          question: 'Հնարավո՞ր է լողալ Պարզ լճում',
          answer: 'Ամառային ամիսներին լողալը հնարավոր է։ Կան փոքր լողափեր և նավակների վարձույթ։',
        },
        {
          question: 'Ե՞րբ է տուրը վերադառնում Երևան',
          answer: 'Տուրը սովորաբար վերադառնում է Երևան ժամը 16:00–16:30-ի սահմաններում։',
        },
      ],
    },
  },

  {
    id: 103,
    slug: 'group-saghmosavank-aragac',
    category: 'group',
    duration: '~9 hours',
    durationHours: 9,
    price: 10000,
    image: '/tours/saghmosavank.jpg',
    gallery: [
      '/tours/saghmosavank.jpg',
      '/tours/alphabet.jpg',
      '/tours/amberd.jpg',
      '/tours/vahramashen.jpg',
      '/tours/aragats.jpeg',
      '/tours/kari-lake.jpg',
    ],
    rating: 4.9,
    reviewCount: 88,
    maxGroupSize: 15,
    minGroupSize: 1,
    pickupIncluded: true,
    en: {
      title: 'Saghmosavank – Aragats Group Tour',
      shortDescription: 'Saghmosavank Monastery, Alphabet Park, Amberd Fortress, Mount Aragats & Kari Lake in one day.',
      fullDescription: 'This group tour takes you on a journey through Armenian cultural identity and breathtaking highland landscapes. Visit the 13th-century Saghmosavank Monastery perched above the Kasagh Gorge, then pay tribute to the Armenian script at the Alphabet Park with its 39 monumental stone letters. Continue to the 10th-century Amberd fortress on the volcanic slopes of Mount Aragats — Armenia\'s highest peak — and end at Kari Lake at 3,200 m elevation, surrounded by alpine meadows and snow-fed waters.',
      region: 'Aragatsotn',
      startingPoint: 'Yerevan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Daily', times: ['08:30'] }],
      highlights: [
        'Saghmosavank Monastery above the Kasagh Gorge',
        'Armenian Alphabet Park — 39 monumental stone letters',
        'Amberd Fortress (10th c.) on Mount Aragats slopes',
        'Mount Aragats — Armenia\'s highest peak (4,090 m)',
        'Kari Lake at 3,200 m — alpine meadows and snow',
      ],
      included: [
        'Air-conditioned minibus',
        'Bottled water',
      ],
      excluded: [
        'Amberd Fortress entrance fee (1 500 AMD)',
        'Lunch (own expense)',
        'Tips',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Saghmosavank Monastery',
          description: 'Drive north from Yerevan to the 13th-century Saghmosavank Monastery, dramatically positioned on the rim of the Kasagh Gorge with sweeping valley views.',
          stops: ['Saghmosavank Monastery', 'Kasagh Gorge Viewpoint'],
          meals: [],
        },
        {
          day: 1,
          title: 'Armenian Alphabet Park',
          description: 'Visit the unique Alphabet Park near Aparan, where 39 large stone sculptures each represent a letter of the Armenian alphabet created by Mesrop Mashtots in 405 AD.',
          stops: ['Armenian Alphabet Monument Park'],
          meals: ['Lunch break (own expense)'],
        },
        {
          day: 1,
          title: 'Amberd Fortress',
          description: 'Reach the 10th-century Amberd castle complex on the southern slopes of Mount Aragats. Explore the fortress towers, the adjacent Vahramashen Church and enjoy views over the Ararat Valley.',
          stops: ['Amberd Fortress', 'Vahramashen Church'],
          meals: [],
        },
        {
          day: 1,
          title: 'Kari Lake',
          description: 'Ascend to Kari Lake at 3,200 m on the flanks of Armenia\'s highest mountain. Take in the alpine scenery, volcanic peaks and snow-fed waters before the descent to Yerevan.',
          stops: ['Kari Lake (3,200 m)', 'Aragats Summit Viewpoint'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Is the high altitude a concern at Kari Lake?',
          answer: 'Kari Lake sits at 3,200 m. Most visitors do not experience altitude sickness at this elevation, but we recommend going slowly, staying hydrated and informing us of any respiratory conditions.',
        },
        {
          question: 'Is the road to Kari Lake suitable for all vehicles?',
          answer: 'The road is partly paved and partly gravel. Our vehicles are suited for this terrain. In winter the upper section may be inaccessible.',
        },
        {
          question: 'What time does the tour return to Yerevan?',
          answer: 'Due to the high-altitude drive this tour returns slightly later, typically around 17:00–18:00.',
        },
      ],
    },
    ru: {
      title: 'Сагмосаванк – Арагац: Групповой тур',
      shortDescription: 'Монастырь Сагмосаванк, Парк алфавита, крепость Амберд, гора Арагац и озеро Кари за один день.',
      fullDescription: 'Этот групповой тур — путешествие через армянскую идентичность и потрясающие высокогорные пейзажи. Посетите монастырь Сагмосаванк XIII века над ущельем Касах, отдайте дань армянской письменности в Парке алфавита с 39 каменными монументами, продолжите к крепости Амберд X века на склонах Арагаца и завершите день у озера Кари на высоте 3 200 м среди альпийских лугов и снежных вершин.',
      region: 'Арагацотн',
      startingPoint: 'Ереван',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ежедневно', times: ['08:30'] }],
      highlights: [
        'Монастырь Сагмосаванк над ущельем Касах',
        'Парк армянского алфавита — 39 монументальных букв',
        'Крепость Амберд (X в.) на склонах Арагаца',
        'Гора Арагац — высочайшая вершина Армении (4 090 м)',
        'Озеро Кари на высоте 3 200 м — альпийские пейзажи',
      ],
      included: [
        'Автобус с кондиционером',
        'Вода в бутылках',
      ],
      excluded: [
        'Входной билет в Крепость Амберд (1 500 AMD)',
        'Обед (за свой счёт)',
        'Чаевые',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Монастырь Сагмосаванк',
          description: 'Поездка на север от Еревана к монастырю Сагмосаванк XIII века на краю ущелья Касах с живописными видами долины.',
          stops: ['Монастырь Сагмосаванк', 'Смотровая площадка ущелья Касах'],
          meals: [],
        },
        {
          day: 1,
          title: 'Парк армянского алфавита',
          description: 'Посещение Парка алфавита близ Апарана — 39 каменных скульптур, каждая из которых символизирует одну букву армянского алфавита, созданного Месропом Маштоцем в 405 г.',
          stops: ['Парк памятников армянского алфавита'],
          meals: ['Обеденная остановка (за свой счёт)'],
        },
        {
          day: 1,
          title: 'Крепость Амберд',
          description: 'Подъём к замку Амберд X века на южных склонах Арагаца. Башни крепости, церковь Ваграмашен и виды на Араратскую долину.',
          stops: ['Крепость Амберд', 'Церковь Ваграмашен'],
          meals: [],
        },
        {
          day: 1,
          title: 'Озеро Кари',
          description: 'Восхождение к озеру Кари на высоте 3 200 м на склонах Арагаца. Альпийские пейзажи и снежные вершины перед спуском в Ереvan.',
          stops: ['Озеро Кари (3 200 м)', 'Смотровая площадка Арагаца'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Не опасна ли высота у озера Кари?',
          answer: 'Озеро Кари находится на высоте 3 200 м. Большинство посетителей не испытывают горной болезни, но рекомендуем пить воду и не торопиться.',
        },
        {
          question: 'Подходит ли дорога к озеру Кари для обычных автомобилей?',
          answer: 'Дорога частично асфальтирована, частично гравийная. Наши автомобили приспособлены для этого рельефа. Зимой верхний участок может быть недоступен.',
        },
        {
          question: 'В какое время тур возвращается в Ереван?',
          answer: 'Из-за высокогорного маршрута тур возвращается чуть позже — обычно около 17:00–18:00.',
        },
      ],
    },
    hy: {
      title: 'Սաղմոսավանք – Արագած խմբակային տուր',
      shortDescription: 'Սաղմոսավանք, Այբուբենի պուրակ, Ամբերդ ամրոց, Արագած լեռ և Քարի լիճ՝ մեկ օրվա ընթացքում։',
      fullDescription: 'Այս խմբակային տուրը ձեզ տանում է հայկական մշակութային ինքնության և տպավորիչ բարձրադիր բնապատկերների միջով։ Այցելեք 13-րդ դարի Սաղմոսավանք վանական համալիրը՝ տեղակայված Քասաղի կիրճի եզրին, ապա հարգանքի տուրք մատուցեք հայկական գրին Այբուբենի պուրակում՝ իր 39 հսկայական քարե տառերով։ Շարունակեք դեպի 10-րդ դարի Ամբերդ ամրոցը՝ Արագած լեռան հրաբխային լանջերին՝ Հայաստանի ամենաբարձր գագաթի ստորոտում, և ավարտեք օրը Քարի լճում՝ 3,200 մ բարձրության վրա, շրջապատված ալպյան մարգագետիններով և ձյունով սնվող ջրերով։',
      region: 'Արագածոտն',
      startingPoint: 'Երևան',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ամեն օր', times: ['08:30'] }],
      highlights: [
        'Սաղմոսավանք վանական համալիր՝ Քասաղի կիրճի վերևում',
        'Հայոց այբուբենի պուրակ — 39 հսկայական քարե տառեր',
        'Ամբերդ ամրոց (10-րդ դ.)՝ Արագած լեռան լանջերին',
        'Արագած լեռ — Հայաստանի ամենաբարձր գագաթը (4,090 մ)',
        'Քարի լիճ՝ 3,200 մ բարձրության վրա՝ ալպյան բնապատկերներով',
      ],
      included: [
        'Օդորակիչով միկրոավտոբուս',
        'Շշալցված ջուր',
      ],
      excluded: [
        'Ամբերդ ամրոցի մուտքի վճար (1 500 AMD)',
        'Ճաշ (ինքնուրույն)',
        'Թեյավճարներ',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Սաղմոսավանք',
          description: 'Երթ դեպի հյուսիս Երևանից դեպի 13-րդ դարի Սաղմոսավանք վանական համալիր, որը տպավորիչ կերպով տեղակայված է Քասաղի կիրճի եզրին՝ լայն հովտային տեսարաններով։',
          stops: ['Սաղմոսավանք', 'Քասաղի կիրճի դիտակետ'],
          meals: [],
        },
        {
          day: 1,
          title: 'Հայոց այբուբենի պուրակ',
          description: 'Այցելություն յուրահատուկ Այբուբենի պուրակ Ապարանի մոտակայքում, որտեղ տեղադրված են հայկական այբուբենի 39 մեծ քարե տառերը՝ ստեղծված Մեսրոպ Մաշտոցի կողմից 405 թ․։',
          stops: ['Հայոց այբուբենի հուշարձանների պուրակ'],
          meals: ['Ճաշի ընդմիջում (ինքնուրույն)'],
        },
        {
          day: 1,
          title: 'Ամբերդ ամրոց',
          description: 'Հասնել 10-րդ դարի Ամբերդ ամրոցային համալիր Արագած լեռան հարավային լանջերին։ Զննել ամրոցի աշտարակները, հարակից Վահրամաշեն եկեղեցին և վայելել Արարատյան դաշտի տեսարանները։',
          stops: ['Ամբերդ ամրոց', 'Վահրամաշեն եկեղեցի'],
          meals: [],
        },
        {
          day: 1,
          title: 'Քարի լիճ',
          description: 'Բարձրանալ դեպի Քարի լիճ՝ 3,200 մ բարձրության վրա՝ Հայաստանի ամենաբարձր լեռան լանջերին։ Վայելեք ալպյան բնապատկերները, հրաբխային գագաթները և ձյունով սնվող ջրերը՝ նախքան վերադարձը Երևան։',
          stops: ['Քարի լիճ (3,200 մ)', 'Արագածի դիտակետ'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Բարձրությունը խնդիր կարո՞ղ է լինել Քարի լճում',
          answer: 'Քարի լիճը գտնվում է 3,200 մ բարձրության վրա։ Շատ այցելուներ այս բարձրության վրա բարձրության հիվանդություն չեն ունենում, սակայն խորհուրդ է տրվում շարժվել դանդաղ, շատ ջուր խմել և տեղեկացնել մեզ շնչառական խնդիրների առկայության դեպքում։',
        },
        {
          question: 'Քարի լճի ճանապարհը հարմար է՞ բոլոր մեքենաների համար',
          answer: 'Ճանապարհը մասամբ ասֆալտապատ է, մասամբ՝ խճաքարային։ Մեր տրանսպորտային միջոցները հարմար են այդ պայմաններին։ Ձմռանը վերին հատվածը կարող է լինել անհասանելի։',
        },
        {
          question: 'Ե՞րբ է տուրը վերադառնում Երևան',
          answer: 'Բարձրադիր երթուղու պատճառով այս տուրը վերադառնում է մի փոքր ուշ՝ սովորաբար 17:00–18:00-ի սահմաններում։',
        },
      ],
    },
  },

  {
    id: 104,
    slug: 'group-khor-virap-tatev',
    category: 'group',
    duration: '~14 hours',
    durationHours: 14,
    price: 15000,
    image: '/tours/tatev-wings.jpg',
    gallery: [
      '/tours/tatev-wings.jpg',
      '/tours/khor-virap.jpg',
      '/tours/khor-virap-inside.jpg',
      '/tours/old-areni.jpg',
      '/tours/areni-inside.jpg',
      '/tours/noravank.jpg',
      '/tours/canyon.jpg',
      '/tours/shaqi.jpg',
      '/tours/tatev.jpg',
    ],
    rating: 4.9,
    reviewCount: 203,
    maxGroupSize: 15,
    minGroupSize: 1,
    pickupIncluded: true,
    badge: 'Most Popular',
    en: {
      title: 'Khor Virap – Tatev Group Tour',
      shortDescription: 'Khor Virap with Mt. Ararat views, Areni wine tasting, Noravank, Shaki Waterfall & Tatev cable car — Armenia\'s ultimate day tour.',
      fullDescription: 'Armenia\'s longest and most spectacular group day tour, departing at 7:30 AM to make the most of the 14-hour journey south. Begin at Khor Virap Monastery with its legendary view of snow-capped Ararat. Continue to the "Old Areni" winery for a free guided tasting, then explore the dramatic red-canyon Noravank Monastery. After a stop at Shaki Waterfall, board the Wings of Tatev — the world\'s longest reversible cable car at 5.7 km — and glide over pine gorges to the magnificent 9th-century Tatev Monastery perched on a volcanic basalt cliff. Returns around 21:00–22:00.',
      region: 'Ararat / Vayots Dzor / Syunik',
      startingPoint: 'Yerevan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Daily', times: ['07:30'] }],
      highlights: [
        'Khor Virap Monastery — iconic panoramic view of Mt. Ararat',
        '"Old Areni" winery — free wine excursion & tasting',
        'Noravank Monastery in a dramatic red-cliff canyon',
        'Shaki Waterfall in a lush green gorge',
        'Wings of Tatev — world\'s longest reversible cable car (5.7 km)',
        'Tatev Monastery (9th c.) on a volcanic basalt plateau',
      ],
      included: [
        'Air-conditioned minibus',
        'Areni wine tasting',
        'Bottled water',
      ],
      excluded: [
        'Tatev entrance (9000 AMD)',
        'Lunch (own expense)',
        'Tips',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Khor Virap Monastery',
          description: 'Early departure at 7:30. Drive south to Khor Virap Monastery — one of Armenia\'s holiest sites, where St. Gregory the Illuminator was imprisoned for 13 years. The iconic view of snow-capped Mt. Ararat looms just 40 km away.',
          stops: ['Khor Virap Monastery', 'Mt. Ararat Viewpoint'],
          meals: [],
        },
        {
          day: 1,
          title: 'Old Areni Winery',
          description: 'Visit the "Old Areni" (Hin Areni) winery in the Ararat wine valley for a guided cellar tour and free tasting of Armenian wines, including the Areni Noir grape grown here for over 6,000 years.',
          stops: ['Old Areni Winery', 'Wine Cellar Tour'],
          meals: ['Wine tasting (free, included)'],
        },
        {
          day: 1,
          title: 'Noravank Monastery',
          description: 'Drive into the Noravank canyon — a narrow gorge of soaring red and ochre limestone cliffs. Explore the 13th-century monastery complex famous for its two-story gavit with steep stone stairs.',
          stops: ['Noravank Canyon', 'Noravank Monastery', 'Canyon Viewpoint'],
          meals: ['Lunch break (own expense)'],
        },
        {
          day: 1,
          title: 'Shaki Waterfall',
          description: 'Stop at Shaki Waterfall — an 18-metre cascade hidden in a lush gorge near Sisian. A short walk through greenery leads to the base of the falls.',
          stops: ['Shaki Waterfall Trail', 'Waterfall Base'],
          meals: [],
        },
        {
          day: 1,
          title: 'Wings of Tatev & Tatev Monastery',
          description: 'Board the Wings of Tatev — 5.7 km and the world\'s longest reversible aerial tramway — for a breathtaking 12-minute ride over pine forest and volcanic gorges. Explore the 9th-century Tatev Monastery complex on the dramatic basalt plateau.',
          stops: ['Halidzor Cable Car Station', 'Wings of Tatev Ride', 'Tatev Monastery', 'Cliff Viewpoint'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Why does this tour start at 7:30 AM?',
          answer: 'The tour covers over 500 km round trip and returns around 21:00–22:00. The early start ensures enough daylight to fully enjoy each stop, especially Tatev.',
        },
        {
          question: 'Is the cable car ticket included?',
          answer: 'No, the Wings of Tatev cable car round-trip ticket is not included in the tour price.',
        },
        {
          question: 'What happens if the cable car is not operating?',
          answer: 'In the rare event the cable car is not running, we will drive the mountain road to Tatev instead and offer a partial refund for the cable car portion.',
        },
      ],
    },
    ru: {
      title: 'Хор Вирап – Татев: Групповой тур',
      shortDescription: 'Хор Вирап и Арарат, дегустация вин Арени, Нораванк, водопад Шаки и канатная дорога на Татев — лучший однодневный тур Армении.',
      fullDescription: 'Самый длинный и впечатляющий групповой тур Армении с выездом в 7:30. Начните в Хор Вирапе с легендарным видом на Арарат, продолжите в винодельне «Хин Арени» с бесплатной дегустацией, затем — в грандиозный каньон Нораванка, к водопаду Шаки, и наконец на «Крылья Татева» — самую длинную реверсивную канатную дорогу в мире — к монастырю Татев IX века. Возвращение около 21:00–22:00.',
      region: 'Арарат / Вайоц Дзор / Сюник',
      startingPoint: 'Ереван',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ежедневно', times: ['07:30'] }],
      highlights: [
        'Монастырь Хор Вирап — легендарный вид на Арарат',
        '«Хин Арени» — бесплатная экскурсия и дегустация вин',
        'Монастырь Нораванк в красочном каньоне',
        'Водопад Шаки в зелёном ущелье',
        '«Крылья Татева» — самая длинная реверсивная канатная дорога (5,7 км)',
        'Монастырь Татев (IX в.) на базальтовом плато',
      ],
      included: [
        'Автобус с кондиционером',
        'Дегустация вин Арени',
        'Вода в бутылках',
      ],
      excluded: [
        'Вход в Татев (9000 AMD)',
        'Обед (за свой счёт)',
        'Чаевые',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Монастырь Хор Вирап',
          description: 'Ранний выезд в 7:30. Поездка на юг к монастырю Хор Вирап, где Григорий Просветитель провёл 13 лет в заточении. Легендарная панорама Арарата в 40 км.',
          stops: ['Монастырь Хор Вирап', 'Смотровая площадка Арарата'],
          meals: [],
        },
        {
          day: 1,
          title: 'Винодельня «Хин Арени»',
          description: 'Посещение «Хин Арени» в Araratской винной долине — экскурсия по погребу и бесплатная дегустация армянских вин, включая сорт Арени Нуар, выращиваемый здесь более 6 000 лет.',
          stops: ['Винодельня Хин Арени', 'Экскурсия по погребу'],
          meals: ['Дегустация вин (бесплатно, включено)'],
        },
        {
          day: 1,
          title: 'Монастырь Нораванк',
          description: 'Въезд в каньон Нораванк. Монастырский комплекс XIII века с двухэтажным гавитом и крутой каменной лестницей среди красно-охристых скал.',
          stops: ['Каньон Нораванк', 'Монастырь Нораванк', 'Смотровая площадка'],
          meals: ['Обеденная остановка (за свой счёт)'],
        },
        {
          day: 1,
          title: 'Водопад Шаки',
          description: 'Остановка у водопада Шаки — 18-метрового каскада в зелёном ущелье близ Сисиана. Короткая прогулка к основанию водопада.',
          stops: ['Тропа к водопаду Шаки', 'Основание водопада'],
          meals: [],
        },
        {
          day: 1,
          title: 'Крылья Татева и монастырь Татев',
          description: '«Крылья Татева» — 5,7 км — самая длинная реверсивная канатная дорога в мире. 12-минутный полёт над сосновыми ущельями к монастырю Татев IX века на базальтовом плато.',
          stops: ['Станция Халидзор', 'Канатная дорога', 'Монастырь Татев', 'Смотровая площадка'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Почему тур начинается в 7:30?',
          answer: 'Тур охватывает более 500 км и возвращается около 21:00–22:00. Ранний старт гарантирует достаточно светлого времени для каждой остановки.',
        },
        {
          question: 'Включён ли билет на канатную дорогу?',
          answer: 'Нет, билет на «Крылья Татева» (туда-обратно) не включён в стоимость тура.',
        },
        {
          question: 'Что происходит, если канатная дорога не работает?',
          answer: 'В редких случаях мы доедем до Татева по горной дороге и предложим частичную компенсацию за канатную дорогу.',
        },
      ],
    },
    hy: {
      title: 'Խոր Վիրապ – Տաթև խմբային տուր',
      shortDescription: 'Խոր Վիրապ՝ Արարատ լեռան տեսարանով, Արենիի գինու համտես, Նորավանք, Շաքիի ջրվեժ և Տաթևի ճոպանուղի — Հայաստանի լավագույն մեկօրյա տուրը։',
      fullDescription: 'Հայաստանի ամենաերկար և ամենահիասքանչ խմբային մեկօրյա տուրը, որը մեկնարկում է առավոտյան 07:30-ին՝ 14-ժամյա ճանապարհորդությունից առավելագույնը ստանալու համար դեպի հարավ։ Սկսեք Խոր Վիրապ վանքից՝ Արարատ լեռան ձյունածածկ, լեգենդար տեսարանով։ Այնուհետև այցելեք «Հին Արենի» գինու գործարան՝ անվճար էքսկուրսիայի և գինու համտեսի համար, ապա շարունակեք դեպի Նորավանք՝ կարմիր ժայռերով հիասքանչ կիրճում։ Շաքիի ջրվեժում կանգառից հետո նստեք «Տաթևի թևեր» ճոպանուղին՝ աշխարհի ամենաերկար շրջադարձային ճոպանուղին (5.7 կմ), և սահեք սոճու կիրճերի վրայով դեպի 9-րդ դարի Տաթևի վանքը՝ հրաբխային բազալտե ժայռի վրա։ Վերադարձը՝ մոտ 21:00–22:00։',
      region: 'Արարատ / Վայոց Ձոր / Սյունիք',
      startingPoint: 'Երևան',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ամեն օր', times: ['07:30'] }],
      highlights: [
        'Խոր Վիրապ վանք — Արարատ լեռան խորհրդանշական պանորամային տեսարան',
        '"Հին Արենի" գինու գործարան — անվճար էքսկուրսիա և համտես',
        'Նորավանք վանք՝ կարմիր ժայռերով հիասքանչ կիրճում',
        'Շաքիի ջրվեժ՝ կանաչ գետի կիրճում',
        '"Տաթևի թևեր" — աշխարհի ամենաերկար շրջադարձային ճոպանուղին (5.7 կմ)',
        'Տաթևի վանք (9-րդ դար)՝ հրաբխային բազալտե բարձրավանդակի վրա',
      ],
      included: [
        'Օդորակիչով միկրոավտոբուս',
        'Արենիի գինու համտես',
        'Շշալցված ջուր',
      ],
      excluded: [
        'Տաթև մուտք (9000 AMD)',
        'Ճաշ (սեփական ծախս)',
        'Թեյավճար',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Խոր Վիրապ վանք',
          description: 'Վաղ մեկնում՝ 07:30-ին։ Ճանապարհ դեպի Խոր Վիրապ վանք՝ Հայաստանի ամենասուրբ վայրերից մեկը, որտեղ Սուրբ Գրիգոր Լուսավորիչը բանտարկված է եղել 13 տարի։ Արարատ լեռան խորհրդանշական տեսարանը գտնվում է ընդամենը 40 կմ հեռավորության վրա։',
          stops: ['Խոր Վիրապ վանք', 'Արարատ լեռան դիտակետ'],
          meals: [],
        },
        {
          day: 1,
          title: 'Հին Արենի գինու գործարան',
          description: 'Այցելություն «Հին Արենի» (Hin Areni) գինու գործարան՝ գինու նկուղի ուղեկցվող տուրի և հայկական գինիների անվճար համտեսի համար, ներառյալ Areni Noir խաղողից պատրաստված գինին, որը այստեղ աճեցվում է ավելի քան 6000 տարի։',
          stops: ['Հին Արենի գինու գործարան', 'Գինու նկուղի տուր'],
          meals: ['Գինու համտես (անվճար, ներառված)'],
        },
        {
          day: 1,
          title: 'Նորավանք վանք',
          description: 'Ճանապարհ դեպի Նորավանքի կիրճ՝ նեղ կիրճ՝ կարմիր և օխրագույն կրաքարե ժայռերով։ Բացահայտեք 13-րդ դարի վանական համալիրը՝ հայտնի իր երկհարկանի գավիթով և քարե կտրուկ աստիճաններով։',
          stops: ['Նորավանքի կիրճ', 'Նորավանք վանք', 'Կիրճի դիտակետ'],
          meals: ['Ճաշի կանգառ (սեփական ծախս)'],
        },
        {
          day: 1,
          title: 'Շաքիի ջրվեժ',
          description: 'Կանգառ Շաքիի ջրվեժում՝ 18 մետրանոց ջրվեժ, որը թաքնված է Սիսիանի մոտ գտնվող կանաչ կիրճում։ Կարճ քայլուղիով կարելի է հասնել ջրվեժի հիմքին։',
          stops: ['Շաքիի ջրվեժի արահետ', 'Ջրվեժի հիմք'],
          meals: [],
        },
        {
          day: 1,
          title: '"Տաթևի թևեր" և Տաթևի վանք',
          description: 'Նստեք «Տաթևի թևեր» ճոպանուղին՝ 5.7 կմ երկարությամբ աշխարհի ամենաերկար շրջադարձային օդային ճոպանուղին, և վայելեք 12 րոպեանոց հիասքանչ ճանապարհորդությունը սոճու անտառների և հրաբխային կիրճերի վրայով։ Բացահայտեք 9-րդ դարի Տաթևի վանական համալիրը բազալտե դրամատիկ բարձրավանդակի վրա։',
          stops: ['Հալիձորի կայան', 'Ճոպանուղու ուղևորություն', 'Տաթևի վանք', 'Ժայռի դիտակետ'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Ինչու է տուրը սկսվում 07:30-ին։',
          answer: 'Տուրը ընդգրկում է ավելի քան 500 կմ ճանապարհ և ավարտվում է մոտ 21:00–22:00-ին։ Վաղ մեկնարկը ապահովում է բավարար ցերեկային լույս բոլոր կանգառները լիարժեք վայելելու համար, հատկապես Տաթևը։',
        },
        {
          question: 'Արդյո՞ք ճոպանուղու տոմսը ներառված է։',
          answer: 'Ոչ, «Տաթևի թևեր» ճոպանուղու երկկողմանի տոմսը ներառված չէ տուրի գնի մեջ։',
        },
        {
          question: 'Ինչ է տեղի ունենում, եթե ճոպանուղին չի աշխատում։',
          answer: 'Հազվադեպ դեպքերում, եթե ճոպանուղին չի գործում, մենք կգնանք Տաթևի լեռնային ճանապարհով և կտրամադրենք մասնակի վերադարձ ճոպանուղու մասի համար։',
        },
      ],
    }
  },

  {
    id: 105,
    slug: 'group-khor-virap-jermuk',
    category: 'group',
    duration: '~11 hours',
    durationHours: 11,
    price: 13000,
    image: '/tours/khor-virap.jpg',
    gallery: [
      '/tours/khor-virap.jpg',
      '/tours/khor-virap-inside.jpg',
      '/tours/old-areni.jpg',
      '/tours/areni-inside.jpg',
      '/tours/noravank.jpg',
      '/tours/jermuk-waterfall.jpg',
      '/tours/jermuk-springs.webp'
    ],
    rating: 4.8,
    reviewCount: 94,
    maxGroupSize: 15,
    minGroupSize: 1,
    pickupIncluded: true,
    en: {
      title: 'Khor Virap – Jermuk Group Tour',
      shortDescription: 'Khor Virap with Mt. Ararat views, Areni wine tasting, Noravank Monastery & Jermuk Waterfall in one day.',
      fullDescription: 'A spectacular journey through southern Armenia combining iconic monasteries, ancient wine culture and dramatic natural scenery. Start with the legendary view of snow-capped Ararat from Khor Virap Monastery, enjoy a free tasting at the "Old Areni" winery in the world\'s oldest wine-producing region, and explore the breathtaking Noravank canyon. The day ends at the magnificent Jermuk Waterfall — a powerful 70-metre cascade in the lush gorge of the Arpa River, near Armenia\'s famous spa resort town.',
      region: 'Ararat / Vayots Dzor',
      startingPoint: 'Yerevan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Daily', times: ['08:00'] }],
      highlights: [
        'Khor Virap Monastery — iconic view of Mt. Ararat',
        '"Old Areni" winery — free wine excursion & tasting',
        'Noravank Monastery in its dramatic red-cliff canyon',
        'Jermuk Waterfall — 70-metre cascade on the Arpa River',
        'Jermuk mineral water spring tasting',
      ],
      included: [
        'Air-conditioned minibus',
        'Areni wine tasting',
        'Bottled water',
      ],
      excluded: [
        'Areni cave entrance fee (AMD 1000)',
        'Lunch (own expense)',
        'Tips',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Khor Virap Monastery',
          description: 'Depart Yerevan and drive south to Khor Virap Monastery — one of Armenia\'s most sacred pilgrimage sites — with the sweeping panoramic view of snow-capped Mount Ararat just 40 km away.',
          stops: ['Khor Virap Monastery', 'Mt. Ararat Viewpoint'],
          meals: [],
        },
        {
          day: 1,
          title: 'Old Areni Winery',
          description: 'Visit the "Old Areni" (Hin Areni) winery — a guided cellar tour and free tasting in the village where a 6,100-year-old winemaking facility was discovered.',
          stops: ['Old Areni Winery', 'Wine Cellar Tour'],
          meals: ['Wine tasting (free, included)'],
        },
        {
          day: 1,
          title: 'Noravank Monastery',
          description: 'Explore the 13th-century Noravank Monastery set dramatically between soaring red-ochre limestone cliffs. The unique two-story gavit with its famous steep stone staircase is one of Armenia\'s most photographed sights.',
          stops: ['Noravank Canyon', 'Noravank Monastery', 'Canyon Viewpoint'],
          meals: ['Lunch break (own expense)'],
        },
        {
          day: 1,
          title: 'Jermuk Waterfall',
          description: 'Continue to the spa resort town of Jermuk and descend into the Arpa River gorge to the magnificent 70-metre Jermuk Waterfall. Taste the famous Jermuk mineral water at source before heading back to Yerevan.',
          stops: ['Jermuk Waterfall Trail', 'Waterfall Viewpoint', 'Jermuk Mineral Spring'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Is this a private or shared tour?',
          answer: 'This is a shared group tour with up to 15 participants. Private arrangements are available on request.',
        },
        {
          question: 'How high is the Jermuk Waterfall?',
          answer: 'The Jermuk Waterfall drops approximately 70 metres down the Arpa River gorge, making it one of the most impressive waterfalls in Armenia.',
        },
        {
          question: 'What time does the tour return to Yerevan?',
          answer: 'The tour typically returns to Yerevan in the evening around 19:00–20:00.',
        },
      ],
    },
    ru: {
      title: 'Хор Вирап – Джермук: Групповой тур',
      shortDescription: 'Хор Вирап и Арарат, дегустация вин Арени, монастырь Нораванк и водопад Джермук за один день.',
      fullDescription: 'Захватывающее путешествие по югу Армении, сочетающее знаковые монастыри, древнюю винодельческую культуру и драматические природные пейзажи. Начните с легендарного вида на Арарат из Хор Вирапа, насладитесь бесплатной дегустацией в «Хин Арени» — регионе древнейшего виноделия в мире, исследуйте каньон Нораванка. День завершается у грандиозного водопада Джермук — 70-метрового каскада в ущелье реки Арпа.',
      region: 'Арарат / Вайоц Дзор',
      startingPoint: 'Ереvan',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ежедневно', times: ['08:00'] }],
      highlights: [
        'Монастырь Хор Вирап — легендарный вид на Арарат',
        '«Хин Арени» — бесплатная экскурсия и дегустация',
        'Монастырь Нораванк в красочном каньоне',
        'Водопад Джермук — 70 метров над ущельем реки Арпа',
        'Дегустация минеральной воды Джермук у источника',
      ],
      included: [
        'Автобус с кондиционером',

        'Дегустация вин Арени',
        'Вода в бутылках',
      ],
      excluded: [
        'Входные билеты в Арени пещеру (AMD 1000)',
        'Обед (за свой счёт)',
        'Чаевые',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Монастырь Хор Вирап',
          description: 'Отправление из Еревана на юг к монастырю Хор Вирап с панорамным видом на заснеженный Арарат в 40 км.',
          stops: ['Монастырь Хор Вирап', 'Смотровая площадка Арарата'],
          meals: [],
        },
        {
          day: 1,
          title: 'Винодельня «Хин Арени»',
          description: 'Посещение «Хин Арени» — экскурсия по погребу и бесплатная дегустация в деревне, где было обнаружено 6 100-летнее виноделие.',
          stops: ['Винодельня Хин Арени', 'Экскурсия по погребу'],
          meals: ['Дегустация вин (бесплатно, включено)'],
        },
        {
          day: 1,
          title: 'Монастырь Нораванк',
          description: 'Монастырь Нораванк XIII века между красно-охристыми скалами. Двухэтажный гавит с крутой каменной лестницей — один из самых фотографируемых видов Армении.',
          stops: ['Каньон Нораванк', 'Монастырь Нораванк', 'Смотровая площадка'],
          meals: ['Обеденная остановка (за свой счёт)'],
        },
        {
          day: 1,
          title: 'Водопад Джермук',
          description: 'Поездка к курортному городу Джермук и спуск в ущелье реки Арпа к 70-метровому водопаду. Дегустация знаменитой минеральной воды Джермук у источника.',
          stops: ['Тропа к водопаду Джермук', 'Смотровая площадка водопада', 'Источник минеральной воды'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Это частный или групповой тур?',
          answer: 'Это групповой тур с участием до 15 человек. Индивидуальные туры доступны по запросу.',
        },
        {
          question: 'Какова высота водопада Джермук?',
          answer: 'Водопад Джермук падает приблизительно с 70 метров в ущелье реки Арпа — один из самых впечатляющих водопадов Армении.',
        },
        {
          question: 'В какое время тур возвращается в Ереван?',
          answer: 'Тур обычно возвращается в Ереван вечером около 19:00–20:00.',
        },
      ],
    },
    hy: {
      title: 'Խոր Վիրապ – Ջերմուկ խմբային տուր',
      shortDescription: 'Խոր Վիրապ՝ Արարատ լեռան տեսարանով, Արենիի գինու համտես, Նորավանք և Ջերմուկի ջրվեժ մեկ օրում։',
      fullDescription: 'Հիասքանչ ճանապարհորդություն դեպի հարավային Հայաստան՝ համադրելով խորհրդանշական վանքերը, հին գինեգործական մշակույթը և շունչ կտրող բնական տեսարանները։ Սկսեք Խոր Վիրապ վանքից՝ Արարատ լեռան ձյունածածկ լեգենդար տեսարանով, այցելեք «Հին Արենի» գինու գործարան՝ աշխարհի ամենահին գինեգործական տարածաշրջանում անվճար համտեսի համար, ապա շարունակեք դեպի Նորավանք՝ հիասքանչ կիրճով։ Օրը ավարտվում է Ջերմուկի հզոր ջրվեժում՝ 70 մետրանոց անկումով Արփա գետի կիրճում, Հայաստանի հայտնի առողջարանային քաղաքում։',
      region: 'Արարատ / Վայոց Ձոր',
      startingPoint: 'Երևան',
      languages: ['EN', 'RU'],
      departures: [{ days: 'Ամեն օր', times: ['08:00'] }],
      highlights: [
        'Խոր Վիրապ վանք — Արարատ լեռան խորհրդանշական տեսարան',
        '"Հին Արենի" գինու գործարան — անվճար էքսկուրսիա և համտես',
        'Նորավանք վանք՝ կարմիր ժայռերով դրամատիկ կիրճում',
        'Ջերմուկի ջրվեժ — 70 մետրանոց անկում Արփա գետի վրա',
        'Ջերմուկի հանքային ջրի աղբյուրի համտես',
      ],
      included: [
        'Օդորակիչով միկրոավտոբուս',
        'Երևանում հյուրանոցից վերցում և վերադարձ',
        'Արենիի գինու համտես',
        'Շշալցված ջուր',
      ],
      excluded: [
        'Մուտքը Արենի քարանձավ (AMD 1000)',
        'Ճաշ (սեփական ծախս)',
        'Թեյավճար',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Խոր Վիրապ վանք',
          description: 'Մեկնում Երևանից դեպի հարավ՝ Խոր Վիրապ վանք, որը համարվում է Հայաստանի ամենասուրբ ուխտագնացության վայրերից մեկը՝ Արարատ լեռան հիասքանչ պանորամային տեսարանով, որը գտնվում է ընդամենը 40 կմ հեռավորության վրա։',
          stops: ['Խոր Վիրապ վանք', 'Արարատ լեռան դիտակետ'],
          meals: [],
        },
        {
          day: 1,
          title: 'Հին Արենի գինու գործարան',
          description: 'Այցելություն «Հին Արենի» (Hin Areni) գինու գործարան՝ գինու նկուղի ուղեկցվող տուր և անվճար համտես այն գյուղում, որտեղ հայտնաբերվել է ավելի քան 6100 տարվա հնություն ունեցող գինեգործական համալիր։',
          stops: ['Հին Արենի գինու գործարան', 'Գինու նկուղի տուր'],
          meals: ['Գինու համտես (անվճար, ներառված)'],
        },
        {
          day: 1,
          title: 'Նորավանք վանք',
          description: 'Բացահայտեք 13-րդ դարի Նորավանք վանական համալիրը՝ կարմիր-օխրագույն կրաքարե բարձր ժայռերի միջև։ Եզակի երկհարկանի գավիթը՝ կտրուկ քարե աստիճաններով, Հայաստանի ամենաֆոտոգենիկ վայրերից է։',
          stops: ['Նորավանքի կիրճ', 'Նորավանք վանք', 'Կիրճի դիտակետ'],
          meals: ['Ճաշի կանգառ (սեփական ծախս)'],
        },
        {
          day: 1,
          title: 'Ջերմուկի ջրվեժ',
          description: 'Շարունակեք դեպի Ջերմուկ առողջարանային քաղաք և իջեք Արփա գետի կիրճ՝ 70 մետրանոց հզոր Ջերմուկի ջրվեժը տեսնելու համար։ Վերադարձից առաջ փորձեք նաև Ջերմուկի հայտնի հանքային ջուրը։',
          stops: ['Ջերմուկի ջրվեժի արահետ', 'Ջրվեժի դիտակետ', 'Ջերմուկի հանքային աղբյուր'],
          meals: [],
        },
      ],
      faq: [
        {
          question: 'Այս տուրը մասնավոր է, թե խմբային։',
          answer: 'Սա խմբային տուր է՝ մինչև 15 մասնակիցներով։ Անհատական տարբերակներ հասանելի են ըստ պահանջի։',
        },
        {
          question: 'Որքա՞ն բարձր է Ջերմուկի ջրվեժը։',
          answer: 'Ջերմուկի ջրվեժի բարձրությունը մոտ 70 մետր է՝ Արփա գետի կիրճում, և այն համարվում է Հայաստանի ամենահիասքանչ ջրվեժներից մեկը։',
        },
        {
          question: 'Ե՞րբ է վերադառնում տուրը Երևան։',
          answer: 'Տուրը սովորաբար վերադառնում է Երևան երեկոյան՝ մոտ 19:00–20:00-ին։',
        },
      ],
    }
  },
];

export function getGroupTourBySlug(slug: string): GroupTourMock | undefined {
  return groupTours.find((t) => t.slug === slug);
}
