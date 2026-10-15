import type { TeamMember } from "../types/teamTypes";

// Canonical profiles in display order. Keep stable IDs and portrait paths.
// Name components and Cyrillic spellings come from the project and supplied profiles.
// Achitmaa's family name and fuller Cyrillic forms for Amar/Naraa await confirmation.
// Keep role summaries short; personal details belong in biographies.
export const FOUNDERS: TeamMember[] = [
  {
    "id": "board-1",
    "name": {
      "givenName": "Ariuntuya",
      "familyName": "Tegshee",
      "mn": "Ариунтуяа Тэгшээ"
    },
    "role": {
      "en": "President",
      "mn": "Ерөнхийлөгч"
    },
    "roleDescription": {
      "en": "Guides the organization’s direction.",
      "mn": "Байгууллагын чиглэлийг тодорхойлно."
    },
    "biography": {
      "en": "Ari is a mother of two teenagers and a Team Lead in the technology industry. Before immigrating to Canada in 2009, she studied traditional medicine and worked with international organizations.\n\nHer early years in Calgary involved adjusting to a new culture and working hard to build a family life. Raising children without a strong cultural support system showed her how easily language and traditions can slip away, a personal experience that inspired her commitment to community building.\n\nAs a co-founder of Etugen Mongols NFP, she gives her time, energy, and experience to helping children, youth, and newly settled families remain connected to Mongolian culture and language as they build their lives in Canada. Her guiding belief is that “your roots are your wings.”",
      "mn": "Ari өсвөр насны хоёр хүүхдийн ээж бөгөөд технологийн салбарт багийн ахлагчаар ажилладаг. Тэрээр 2009 онд Канадад цагаачлан ирэхээсээ өмнө уламжлалт анагаах ухаан судалж, олон улсын байгууллагуудад ажиллаж байжээ.\n\nКалгарид ирсэн эхний жилүүдэд шинэ соёлд дасан зохицож, гэр бүлийнхээ амьдралыг босгохын төлөө шаргуу хөдөлмөрлөсөн. Соёлын хүчтэй дэмжлэггүй орчинд хүүхэд өсгөхөд хэл, уламжлал хэрхэн амархан бүдгэрч болохыг өөрийн биеэр мэдэрсэн нь хамт олныг бий болгох хүсэл эрмэлзлийг төрүүлжээ.\n\nЭтүгэн Монголчуудын хамтран үүсгэн байгуулагчийн хувьд хүүхэд, залуус, шинээр суурьшсан гэр бүлүүдийг Канадад амьдралаа цогцлоохын зэрэгцээ монгол соёл, хэлтэйгээ холбоотой байхад нь туслахад цаг зав, эрч хүч, туршлагаа зориулдаг. Түүний баримталдаг итгэл үнэмшил бол “таны язгуур үндэс бол таны жигүүр” юм."
    },
    "images": {
      "default": "/images/site/team/board-1/1.webp",
      "hover": "/images/site/team/board-1/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "board-3",
    "name": {
      "givenName": "Achitmaa",
      "familyName": null,
      "mn": "Ачитмаа"
    },
    "role": {
      "en": "Treasurer",
      "mn": "Санхүү хариуцсан гишүүн"
    },
    "roleDescription": {
      "en": "Oversees budgets and financial records.",
      "mn": "Төсөв, санхүүгийн бүртгэлийг хянана."
    },
    "biography": {
      "en": "Personal biography pending — background and personal introduction have not yet been provided.",
      "mn": "Хувийн намтар хүлээгдэж байна — амьдралын түүх, хувийн танилцуулгыг хараахан ирүүлээгүй байна."
    },
    "images": {
      "default": "/images/site/team/board-3/1.webp",
      "hover": "/images/site/team/board-3/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "board-4",
    "name": {
      "givenName": "Bolor",
      "familyName": "Gerel",
      "mn": "Болор Гэрэл"
    },
    "role": {
      "en": "Secretary – Communication",
      "mn": "Харилцаа холбоо хариуцсан нарийн бичгийн дарга"
    },
    "roleDescription": {
      "en": "Coordinates organizational communications.",
      "mn": "Байгууллагын харилцаа холбоог зохицуулна."
    },
    "biography": {
      "en": "Co-Founder and volunteer Board Member of ETUGEN Mongols NFP. Originally from Mongolia, she has proudly called Alberta home for over 20 years. A former teacher, Bolor is passionate about preserving Mongolian culture, strengthening community connections, and giving back through volunteer service. She works at the Tuscany Residents Association and is committed to fostering inclusion, cultural understanding, and community engagement.",
      "mn": "Болор нь Этүгэн Монгол ашгийн бус байгууллагын хамтран үүсгэн байгуулагч, удирдах зөвлөлийн сайн дурын гишүүн юм. Монголоос гаралтай тэрээр Альберта мужид 20 гаруй жил амьдарч байна. Өмнө нь багшаар ажиллаж байсан Болор монгол соёлоо хадгалах, хамт олны холбоо харилцааг бэхжүүлэх, сайн дурын ажлаар хувь нэмэр оруулах хүсэл эрмэлзэлтэй. Тэрээр Tuscany Residents Association-д ажилладаг бөгөөд хүн бүрийн оролцоо, соёл хоорондын ойлголцол, олон нийтийн идэвхтэй оролцоог дэмжихийн төлөө ажилладаг."
    },
    "images": {
      "default": "/images/site/team/board-4/1.webp",
      "hover": "/images/site/team/board-4/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "board-2",
    "name": {
      "givenName": "Oyunchimeg",
      "familyName": "Sanjsuren",
      "mn": "Оюунчимэг Санжсүрэн"
    },
    "role": {
      "en": "Secretary – Corporate",
      "mn": "Байгууллагын хэрэг хариуцсан нарийн бичгийн дарга"
    },
    "roleDescription": {
      "en": "Maintains records and governance documents.",
      "mn": "Бүртгэл, засаглалын баримт бичгийг хөтөлнө."
    },
    "biography": {
      "en": "Chimgee moved to Canada with her family in 2006. Navigating the challenges of settling in a new country deepened her commitment to preserving her native language, culture, and traditions for future generations. She has initiated and supported Mongolian community programs and co-founded Etugen Mongols NFP with like-minded peers who share that commitment.\n\nShe graduated from the Mongolian University of Science and Technology and the Institute of Finance and Accounting. She also studied and worked as a corporate paralegal in Canada and now works as an accountant. Her connection to Etugen grows from a wish to keep Mongolian heritage alive and share it with those who come after her.",
      "mn": "Chimgee 2006 онд гэр бүлийнхээ хамт Канадад суурьшжээ. Шинэ улсад амьдралаа эхлүүлэх сорилтуудыг даван туулсан нь эх хэл, соёл, уламжлалаа хойч үедээ өвлүүлэх хүсэл эрмэлзлийг нь улам бэхжүүлсэн. Тэрээр монголчуудын олон нийтийн хөтөлбөрүүдийг санаачлан дэмжиж, ижил зорилготой нөхдийн хамт Этүгэн Монголчуудыг үүсгэн байгуулалцсан.\n\nТэрээр Монгол Улсын Шинжлэх Ухаан, Технологийн Их Сургууль болон Санхүү, Тоо Бүртгэлийн Их Сургуулийг төгссөн. Мөн Канадад корпорацын туслах хуульчаар суралцаж, ажилласан бөгөөд одоо нягтлан бодогчоор ажилладаг. Монгол өв соёлоо амьд байлгаж, дараагийн үедээ хуваалцах хүсэл нь түүнийг Этүгэн Монголчуудтай холбодог."
    },
    "images": {
      "default": "/images/site/team/board-2/1.webp",
      "hover": "/images/site/team/board-2/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "board-5",
    "name": {
      "givenName": "Leah",
      "familyName": "Purevdorj",
      "mn": "Лхагваа Пүрэвдорж"
    },
    "role": {
      "en": "Secretary – Programs & Operations",
      "mn": "Хөтөлбөр, үйл ажиллагаа хариуцсан нарийн бичгийн дарга"
    },
    "roleDescription": {
      "en": "Coordinates programs and operations.",
      "mn": "Хөтөлбөр, үйл ажиллагааг зохицуулна."
    },
    "biography": {
      "en": "Leah moved to Canada in 2013 and has called Calgary home ever since. Before moving, she gained professional experience in both government organizations and private businesses in Mongolia.\n\nAs a mother, she wanted her children to know and appreciate their Mongolian language, traditions, culture, and the stories passed down through generations. She began teaching and sharing these with friends and their children. That small beginning grew into a vision of a welcoming community where Mongolians could learn, celebrate their heritage, and support one another, inspiring her to help establish Etugen Mongols NFP.\n\nLeah is also passionate about supporting and empowering Mongolian women, especially those building lives in a new country. She hopes to create opportunities for women to share experiences and talents, encourage one another, and grow through meaningful connections.\n\nThrough Etugen Mongols, she wants children, youth, women, and families to learn, connect, and grow together while honouring their roots and creating new possibilities. As she puts it: “Our roots connect us, our community strengthens us, and together we can create a future our children will be proud to inherit.”",
      "mn": "Leah 2013 онд Канадад нүүж ирснээсээ хойш Калгарид амьдарч байна. Үүнээс өмнө Монголд төрийн байгууллага болон хувийн хэвшилд ажиллаж, мэргэжлийн туршлага хуримтлуулжээ.\n\nЭэж хүний хувьд хүүхдүүдээ монгол хэл, уламжлал, соёл болон үеэс үед дамжсан түүхээ мэддэг, үнэлдэг болоосой гэж хүссэн. Тэрээр найз нөхөд, тэдний хүүхдүүдэд эдгээрийг зааж, хуваалцаж эхэлжээ. Энэхүү жижиг эхлэл нь монголчууд хамтдаа суралцаж, өв соёлоо тэмдэглэн, бие биеэ дэмждэг халуун дотно хамт олныг бий болгох алсын хараа болон өргөжиж, Этүгэн Монголчуудыг үүсгэн байгуулалцахад нь хүргэсэн.\n\nLeah мөн монгол эмэгтэйчүүдийг, ялангуяа шинэ улсад амьдралаа босгож буй эмэгтэйчүүдийг дэмжиж, хүчирхэгжүүлэхийг эрхэмлэдэг. Эмэгтэйчүүд туршлага, авьяасаа хуваалцаж, бие биеэ урамшуулан, утга учиртай харилцаагаар дамжин хөгжих боломж бүрдүүлэхийг хүсдэг.\n\nЭтүгэн Монголчуудаар дамжуулан хүүхэд, залуус, эмэгтэйчүүд, гэр бүлүүд язгуур үндсээ хүндэтгэхийн зэрэгцээ шинэ боломж бүтээж, хамтдаа суралцан, холбогдож, хөгжөөсэй гэж хүсдэг. Түүний хэлснээр: “Язгуур үндэс биднийг холбож, хамт олон биднийг хүчирхэгжүүлдэг. Хамтдаа бид үр хүүхдүүдийнхээ бахархалтайгаар өвлөн авах ирээдүйг бүтээж чадна.”"
    },
    "images": {
      "default": "/images/site/team/board-5/1.webp",
      "hover": "/images/site/team/board-5/2.webp"
    },
    "imagePosition": "center top"
  }
];

export const EXECUTIVE_TEAM: TeamMember[] = [
  {
    "id": "creative-3",
    "name": {
      "givenName": "Amarjargal",
      "familyName": "Erdenetuya",
      "mn": "Амар Эрдэнэтуяа"
    },
    "role": {
      "en": "General Operations Manager",
      "mn": "Үйл ажиллагааны ерөнхий менежер"
    },
    "roleDescription": {
      "en": "Oversees daily operations and teams.",
      "mn": "Өдөр тутмын ажил, багуудыг удирдана."
    },
    "biography": {
      "en": "Originally from Mongolia, Amaja moved to Canada in 2015. Learning to navigate unfamiliar systems, searching for work, and finding her own path in a new country shaped her desire to make that journey easier for others.\n\nShe works in Registrar Services and Enrolment at Bow Valley College. Through Etugen Mongols, she values sharing practical information and experiences that can help newcomers settle, develop their language skills, and explore education and employment opportunities.\n\nAmaja wants newcomers to know they do not have to figure everything out alone. She hopes to help people move forward with confidence, connection, and a sense of belonging while remaining proud of their Mongolian roots.",
      "mn": "Монголоос гаралтай Amaja 2015 онд Канадад нүүж иржээ. Танил бус тогтолцоог ойлгож сурах, ажил хайх, шинэ улсад өөрийн зам мөрийг олох туршлага нь ижил зам туулж буй бусдын хувьд энэ үйл явцыг арай хялбар болгох хүсэл төрүүлсэн.\n\nТэрээр Bow Valley College-ийн оюутны бүртгэл, элсэлтийн албанд ажилладаг. Этүгэн Монголчуудаар дамжуулан шинээр ирэгсдэд суурьших, хэлний чадвараа хөгжүүлэх, боловсрол болон ажил эрхлэлтийн боломжуудтай танилцахад тустай бодит мэдээлэл, туршлагаа хуваалцахыг эрхэмлэдэг.\n\nAmaja шинээр ирэгсдийг бүхнийг ганцаараа шийдэх албагүй гэдгийг мэдрээсэй гэж хүсдэг. Монгол язгуур үндсээрээ бахархахын зэрэгцээ өөртөө итгэлтэй, бусадтай холбоотой, хамт олныхоо нэг хэсэг гэдгээ мэдэрч урагшлахад нь туслахыг зорьдог."
    },
    "images": {
      "default": "/images/site/team/creative-3/1.webp",
      "hover": "/images/site/team/creative-3/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-5",
    "name": {
      "givenName": "Amarjargal",
      "familyName": "Tumenbayar",
      "mn": "Амаржаргал Түмэнбаяр"
    },
    "role": {
      "en": "Events & Programs Coordinator",
      "mn": "Арга хэмжээ, хөтөлбөрийн зохицуулагч"
    },
    "roleDescription": {
      "en": "Organizes events and community programs.",
      "mn": "Арга хэмжээ, хөтөлбөр зохион байгуулна."
    },
    "biography": {
      "en": "Amara has lived in Calgary with her family since 2018. She graduated from the National University of Mongolia in 2012 with a degree in Accounting and has worked in the accounting field. She is studying English at SAIT while continuing to pursue her professional goals in Canada.\n\nShe wants Mongolian children and families to stay connected to their cultural roots and identity, with meaningful friendships and connections within the community. Through Etugen Mongols, she hopes to help pass Mongolian culture, traditions, values, and language on to future generations.\n\nAmara looks forward to contributing her time and skills, connecting with other Mongolian families, and supporting initiatives that bring people together and keep their cultural heritage alive.",
      "mn": "Amara 2018 оноос хойш гэр бүлийнхээ хамт Калгарид амьдарч байна. Тэрээр 2012 онд Монгол Улсын Их Сургуулийг нягтлан бодох бүртгэлийн мэргэжлээр төгсөж, энэ салбарт ажилласан туршлагатай. Канадад мэргэжлийн зорилгоо үргэлжлүүлэн хэрэгжүүлэхийн зэрэгцээ SAIT-д англи хэл сурч байна.\n\nТэрээр монгол хүүхэд, гэр бүлүүдийг соёлын язгуур үндэс, онцлогтойгоо холбоотой байж, хамт олныхоо дунд утга учиртай нөхөрлөл, харилцаа бий болгоосой гэж хүсдэг. Этүгэн Монголчуудаар дамжуулан монгол соёл, уламжлал, үнэт зүйлс, хэлээ хойч үедээ өвлүүлэхэд туслахыг зорьдог.\n\nAmara цаг зав, ур чадвараараа хувь нэмэр оруулж, бусад монгол гэр бүлтэй танилцан, хүмүүсийг нэгтгэж, өв соёлоо амьд байлгах санаачилгуудыг дэмжихийг хүсдэг."
    },
    "images": {
      "default": "/images/site/team/creative-5/1.webp",
      "hover": "/images/site/team/creative-5/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-8",
    "name": {
      "givenName": "Narangerel",
      "familyName": "Batbyamba",
      "mn": "Нараа Батбямба"
    },
    "role": {
      "en": "Project Coordinator — Logistics",
      "mn": "Төслийн зохицуулагч — Логистик"
    },
    "roleDescription": {
      "en": "Coordinates project resources and logistics.",
      "mn": "Төслийн нөөц, логистикийг зохицуулна."
    },
    "biography": {
      "en": "Naraa moved to Canada in 2013 and works as a Purchasing Coordinator at Mark’s, part of Canadian Tire Corporation. A mother of three, she is passionate about preserving the Mongolian language, traditions, and cultural heritage for future generations.\n\nShe wants Mongolian children and youth to stay connected to their roots, build meaningful friendships within the community, and develop a strong sense of cultural identity. Through Etugen Mongols, she hopes to connect Mongolian families and support initiatives that bring people together, helping create a welcoming, connected, and culturally vibrant community in Canada.",
      "mn": "Naraa 2013 онд Канадад нүүж ирсэн бөгөөд Canadian Tire Corporation-ийн харьяа Mark’s компанид худалдан авалтын зохицуулагчаар ажилладаг. Гурван хүүхдийн ээж тэрээр монгол хэл, уламжлал, соёлын өвийг хойч үедээ өвлүүлэн үлдээхийг эрхэмлэдэг.\n\nТэрээр монгол хүүхэд, залуусыг язгуур үндэстэйгээ холбоотой байж, хамт олныхоо дунд утга учиртай нөхөрлөл бий болгон, соёлын онцлогоо гүн мэдэрч өсөхийг хүсдэг. Этүгэн Монголчуудаар дамжуулан монгол гэр бүлүүдийг холбож, хүмүүсийг нэгтгэх санаачилгуудыг дэмжсэнээр Канадад халуун дотно, нягт холбоотой, соёлын баялаг амьдралтай хамт олныг бүрдүүлэхэд хувь нэмэр оруулахыг зорьдог."
    },
    "images": {
      "default": "/images/site/team/creative-8/1.webp",
      "hover": "/images/site/team/creative-8/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-4",
    "name": {
      "givenName": "Mandaa",
      "familyName": "Sosorbaram",
      "mn": "Мандаа Сосорбарам"
    },
    "role": {
      "en": "Volunteer Coordinator",
      "mn": "Сайн дурын ажилтны зохицуулагч"
    },
    "roleDescription": {
      "en": "Recruits and coordinates volunteers.",
      "mn": "Сайн дурынхныг элсүүлж, зохицуулна."
    },
    "biography": {
      "en": "Mandaa, also known as Oyuna, moved to Calgary in 2014, bringing her Mongolian roots and experiences of living in Europe. Those experiences deepened her appreciation of different cultures and the importance of community and belonging.\n\nShe enjoys creating spaces where people can come together to learn about and celebrate Mongolian heritage and traditions. Through Etugen Mongols, she hopes to build an inclusive, welcoming community where culture is shared and passed down to future generations. She welcomes people who want to volunteer, explore Mongolian culture, or simply connect with others.",
      "mn": "Oyuna нэрээр мөн танигддаг Mandaa 2014 онд Калгарид нүүж ирсэн бөгөөд монгол язгуур үндэс болон Европт амьдарсан туршлагаа тээж иржээ. Эдгээр туршлага нь өөр өөр соёлыг хүндэтгэх, хамт олон болон харьяалагдах мэдрэмжийн үнэ цэнийг ойлгоход нөлөөлсөн.\n\nТэрээр хүмүүс хамтдаа монгол өв соёл, уламжлалтай танилцаж, тэмдэглэн өнгөрүүлэх орчин бүрдүүлэх дуртай. Этүгэн Монголчуудаар дамжуулан соёлоо хуваалцаж, хойч үедээ өвлүүлдэг, хүн бүрийг хүлээн авсан халуун дотно хамт олныг бий болгохыг хүсдэг. Сайн дурын ажил хийх, монгол соёлтой танилцах эсвэл бусадтай холбоо тогтоохыг хүссэн хүн бүрийг баяртайгаар хүлээн авдаг."
    },
    "images": {
      "default": "/images/site/team/creative-4/1.webp",
      "hover": "/images/site/team/creative-4/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-6",
    "name": {
      "givenName": "Sara",
      "familyName": "Baatar",
      "mn": "Сарангэрэл Баатар"
    },
    "role": {
      "en": "Social Media Coordinator",
      "mn": "Сошиал медиа зохицуулагч"
    },
    "roleDescription": {
      "en": "Manages social content and engagement.",
      "mn": "Сошиал контент, оролцоог хариуцна."
    },
    "biography": {
      "en": "Sara came to Canada in 2021 and moved to Calgary in 2025, where her family chose to settle. Starting a new life in Canada deepened her appreciation of belonging, staying connected to her roots, and having a community around her.\n\nAs a mother of two, she wants her children to know where they come from and feel proud of their Mongolian heritage. Etugen Mongols’ vision reflects these personal values and gives her a meaningful way to give back.\n\nShe enjoys the prospect of working with others, exploring new ideas, and creating opportunities for Mongolians in Calgary to connect, participate, and feel at home. She hopes to contribute to a strong, welcoming, and vibrant community.",
      "mn": "Sara 2021 онд Канадад ирж, 2025 онд Калгарид нүүж суурьшсан бөгөөд гэр бүл нь энэ хотыг гэр орноо болгохоор сонгожээ. Канадад шинэ амьдрал эхлүүлэх нь хамт олондоо харьяалагдах мэдрэмж, язгуур үндэстэйгээ холбоотой байх, эргэн тойрондоо дэмжих хүмүүстэй байхын үнэ цэнийг улам ойлгуулсан.\n\nХоёр хүүхдийн ээжийн хувьд хүүхдүүдээ хаанаас гаралтайгаа мэддэг, монгол өв соёлоороо бахархдаг болоосой гэж хүсдэг. Этүгэн Монголчуудын алсын хараа эдгээр хувийн үнэт зүйлтэй нь нийцдэг бөгөөд хамт олондоо хувь нэмэр оруулах утга учиртай боломж болдог.\n\nТэрээр бусадтай хамтран ажиллаж, шинэ санаа эрэлхийлэн, Калгари дахь монголчуудад холбоо тогтоох, оролцох, гэртээ байгаа мэт мэдрэмж авах боломж бүрдүүлэхийг хүсдэг. Нягт холбоотой, халуун дотно, идэвхтэй хамт олныг бий болгоход хувь нэмэр оруулахыг зорьдог."
    },
    "images": {
      "default": "/images/site/team/creative-6/1.webp",
      "hover": "/images/site/team/creative-6/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-2",
    "name": {
      "givenName": "Tugsoo",
      "familyName": "Batjargal",
      "mn": "Төгсөө Батжаргал"
    },
    "role": {
      "en": "Project Coordinator — Community Engagement",
      "mn": "Төслийн зохицуулагч — Олон нийтийн оролцоо"
    },
    "roleDescription": {
      "en": "Connects families, newcomers, and partners.",
      "mn": "Гэр бүл, шинээр ирэгсэд, түншүүдийг холбоно."
    },
    "biography": {
      "en": "Tugsoo moved to Canada in 2000. Leaving familiar routines behind meant adapting to new social norms and different academic expectations while learning an unfamiliar language. She graduated from Western Canada High School and later from the University of Calgary in 2015.\n\nThrough Etugen Mongols, she hopes to pass Mongolian culture, traditions, values, and language on to future generations so they know their cultural roots and identity. Her own experience of adjustment informs her belief in the importance of coming together as a community to preserve and share that heritage.",
      "mn": "Tugsoo 2000 онд Канадад нүүж иржээ. Дассан амьдралаа орхин шинэ орчинд ирэхэд танил бус хэл сурахын зэрэгцээ нийгмийн шинэ хэм хэмжээ, сургалтын өөр шаардлагад дасан зохицох хэрэгтэй болсон. Тэрээр Western Canada High School-ийг, дараа нь 2015 онд University of Calgary-г төгссөн.\n\nЭтүгэн Монголчуудаар дамжуулан монгол соёл, уламжлал, үнэт зүйлс, хэлээ хойч үедээ өвлүүлж, тэднийг өөрсдийн язгуур үндэс, соёлын онцлогоо мэддэг байгаасай гэж хүсдэг. Шинэ орчинд дасан зохицсон өөрийн туршлагаасаа үүдэн өв соёлоо хадгалж, түгээн дэлгэрүүлэхэд хамт олон нэгдэн ажиллах нь чухал гэдэгт итгэдэг."
    },
    "images": {
      "default": "/images/site/team/creative-2/1.webp",
      "hover": "/images/site/team/creative-2/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-1",
    "name": {
      "givenName": "Oyuuntulga",
      "familyName": "Otgon",
      "mn": "Оюунтулга Отгон"
    },
    "role": {
      "en": "Fundraising & Sponsorship Coordinator",
      "mn": "Хандив, ивээн тэтгэлэг хариуцсан зохицуулагч"
    },
    "roleDescription": {
      "en": "Coordinates fundraising and sponsorships.",
      "mn": "Хандив, ивээн тэтгэлгийг зохицуулна."
    },
    "biography": {
      "en": "A first-generation Mongolian immigrant and parent living in Calgary, Tutka carries a deep appreciation for the traditions that shaped her upbringing. Resilience, adaptability, hospitality, and respect for nature remain important values in her life. Living far from Mongolia has strengthened her awareness of how culture creates identity and belonging, especially for children growing up between two worlds.\n\nThrough Etugen Mongols, she hopes to share Mongolian stories, music, traditions, and values in ways that help younger generations see their heritage as a living part of who they are.\n\nShe believes every culture holds knowledge shaped by generations of experience. By sharing Mongolia’s nomadic heritage, she hopes to preserve those traditions and give people from all backgrounds opportunities to learn from its resilience, adaptability, and strong sense of community.",
      "mn": "Калгарид амьдардаг, Монголоос цагаачлан ирсэн анхны үеийн төлөөлөл, хүүхэдтэй ээж Tutka өсөж хүмүүжихэд нь нөлөөлсөн уламжлалаа гүнээ эрхэмлэдэг. Тэсвэр хатуужил, дасан зохицох чадвар, зочломтгой зан, байгалиа хүндэтгэх үзэл нь түүний амьдралын чухал үнэт зүйлс хэвээр байдаг. Монголоос хол амьдрах нь соёл хүний мөн чанар, харьяалагдах мэдрэмжийг хэрхэн бүрдүүлдгийг, ялангуяа хоёр өөр орчны дунд өсөж буй хүүхдүүдэд ямар чухал болохыг улам ойлгуулжээ.\n\nЭтүгэн Монголчуудаар дамжуулан монгол түүх, хөгжим, уламжлал, үнэт зүйлсийг хуваалцаж, залуу үеийнхэнд өв соёл нь өөрсдийнх нь амьд нэг хэсэг гэдгийг мэдрүүлэхийг хүсдэг.\n\nСоёл бүр олон үеийн туршлагаар бүрэлдсэн мэдлэгийг агуулдаг гэдэгт тэрээр итгэдэг. Монголын нүүдлийн өв соёлыг хуваалцсанаар уламжлалаа хадгалахын зэрэгцээ өөр өөр гаралтай хүмүүст тэсвэр хатуужил, дасан зохицох чадвар, хамт олны нягт холбооноос суралцах боломж бүрдүүлэхийг зорьдог."
    },
    "images": {
      "default": "/images/site/team/creative-1/1.webp",
      "hover": "/images/site/team/creative-1/2.webp"
    },
    "imagePosition": "center top"
  },
  {
    "id": "creative-7",
    "name": {
      "givenName": "Uranzul",
      "familyName": "Batsuuri",
      "mn": "Уранзул Батсуурь"
    },
    "role": {
      "en": "Project Coordinator — Cultural Programs",
      "mn": "Төслийн зохицуулагч — Соёлын хөтөлбөрүүд"
    },
    "roleDescription": {
      "en": "Coordinates Mongolian cultural programs.",
      "mn": "Монгол соёлын хөтөлбөрүүдийг зохицуулна."
    },
    "biography": {
      "en": "Zulaa moved to Canada in 2014 and lives in Cochrane, just west of Calgary. In her personal introduction, she describes raising two children, aged 18 and 13 at the time of writing, with Mongolian culture firmly rooted in their daily lives, including language, food, and cultural beliefs.\n\nShe wants future generations growing up in Canada to know and practise the everyday traditions of Mongolian life. Joining Etugen Mongols offers her a way to connect with other Mongolian families locally and share that way of life.\n\nZulaa looks forward to building lasting relationships and giving her time and skills to help young Canadians of Mongolian heritage stay familiar with their roots.",
      "mn": "Zulaa 2014 онд Канадад нүүж ирсэн бөгөөд Калгарийн баруун талд орших Кокрейн хотод амьдардаг. Тэрээр хувийн танилцуулгаа бичих үедээ 18 болон 13 настай байсан хоёр хүүхдийнхээ өдөр тутмын амьдралд монгол хэл, хоол, соёлын үзэл үнэт зүйлсийг баттай шингээн өсгөж ирсэн тухайгаа хуваалцсан.\n\nКанадад өсөж буй хойч үеийнхэн монгол ахуй, өдөр тутмын уламжлалаа мэддэг, хэрэгжүүлдэг байгаасай гэж хүсдэг. Этүгэн Монголчуудад нэгдсэнээр орон нутгийн бусад монгол гэр бүлтэй холбоо тогтоож, тэрхүү амьдралын хэв маягаа хуваалцах боломжтой гэж үздэг.\n\nZulaa урт удаан үргэлжлэх харилцаа бий болгож, монгол гаралтай канад залуу үеийг язгуур үндсээ мэддэг байхад нь туслахын төлөө цаг зав, ур чадвараа зориулахыг хүсдэг."
    },
    "images": {
      "default": "/images/site/team/creative-7/1.webp",
      "hover": "/images/site/team/creative-7/2.webp"
    },
    "imagePosition": "center top"
  }
];
