export type Listing = {
  title: string;
  description: string;
}

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  description_en: string;
  image: string;
  whoWeWant: Listing[];
  contactEmail?: string;
  contactPhone?: string;
};

export type CardItem = {
  img: string;
  title: string;
  desc: string;
  link: string;
};

export type OrganizedListing = {
  listing: Listing;
  id: string;
}
export const events: EventItem[] = [

  {
    //basic info
    id: "id15",
    title: "Winter Party 2025",
    date: "December 26 — 5:30 PM",
    location: "5811 46 St SE",

    //descriptions
    description:
      "🎄🥂 🍾 🇲🇳 🏆 Улиран одож буй 2025 он Монгол хүн бүрийн сэтгэлд Монгол өв соёл Монгол ахуй, зүгээр л Монголоороо Дэлхийд гайхуулсан бахархсан онцгой сайхан жил боллоо. Одоо зөвхөн монголчууд бид хамтдаа бахархалын их найр хийх үлдэж.\n\n" +
      "Дайчид мориндоо. Тиймээс дайчид зүгээр өөрийгөө л бэлдээд ирэхэд хангалттай! Бүжгийн талбайг донсолтол бүжиж, дуу хуур, хөгжимийн аялгуутай бас нэгэн шинэхэн дурсамж нэмэх боломжийг бүү алдаарай!\n\n" +
      "Энэ жил АНХ УДАА тусгайлан бэлдсэн Нийслэл цэсээр баярын зоогийг өргөж байгааг дуулгахад таатай байна.\n\n" +
      "📌 ТАСАЛБАРЫН МЭДЭЭЛЭЛ\n" +
      "Үнэ: $88\n" +
      "Худалдан авах: e-transfer → calgarymongolians@gmail.com\n\n" +
      "*** E-transfer Note дээрээ тасалбараа хүлээн авах овогнэр, e mail хаяг болон утасны дугаараа бичээрэй! ",
    description_en:
      "As 2025 ends, it has been a year filled with pride for Mongolians worldwide. Now it’s time to celebrate together!\n\n" +
      "Dress up, enjoy music, dancing, and create warm memories. This year, for the first time, we are serving a special Holiday Menu.\n\n" +
      "📌 TICKET INFORMATION\n" +
      "Price: $88\n" +
      "To purchase: Send e-transfer > calgarymongolians@gmail.com\n\n" +
      "*** Make sure to include your phone number, email address and full name in the e-transfer.",
    
    image: "winterparty.png",

    //contact
    contactEmail: "calgarymongolians@gmail.com",
    contactPhone: "587 435-4494",

    //whoWeWant
    whoWeWant: [
      {
      title: "dancer",
      description: "dacer",
      },
      {
      title: "dancer1",
      description: "dance for the christmas event.",
      },
      {
      title: "cleaners",
      description: "pack food, prepare food, clean up afterwards",
      }
  
    ]

  }
 
];

export function getCardInfos(events: EventItem[]) {
  let cardInfo: CardItem[] = [];
  for (let i = 0; i < events.length; i++) {
    const dict: CardItem = {
      img: events[i].image,
      title: events[i].title,
      desc: events[i].date,
      link: `/events/${events[i].id}`,
    };
    cardInfo.push(dict);
  }
  return cardInfo;
}

export function getListings(events: EventItem[]) {

  let listings: OrganizedListing[] = []
  for (let i = 0; i< events.length; i++ ){
    for (let j = 0; j < events[i].whoWeWant.length; j++ ){
      let data: OrganizedListing = {
        id: events[i].id,
        listing: events[i].whoWeWant[j]
      }
      listings.push(
        data
      )  
    }
  }
  return listings
}