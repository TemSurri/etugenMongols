export type Listing = {
  title: string;
  title_mn: string;
  description: string;
  contact: string;
};

export type EventAction =
  | {
      type: "payment";
      enabled: boolean;
      label: string;
      label_mn: string;
      price?: number;
    }
  | {
      type: "donation";
      enabled: boolean;
      label: string;
      label_mn: string;
    }
  | {
      type: "registration";
      enabled: boolean;
      label: string;
      label_mn: string;
    };

export type EventDetails = {
  date: string;
  time: string;
  location?: string;
  description: string;
  description_en: string;
  ticketInfo?: string;
  ticketInfo_en?: string;
};

export type EventContact = {
  email?: string;
  phone?: string[];
};

export type EventItem = {
  id: string;
  title: string;
  image: string;

  details: EventDetails;
  actions: EventAction[];
  contact?: EventContact;

  whoWeWant: Listing[];
};

export type OrganizedListing = {
  listing: Listing;
  id: string;
};

export const events: EventItem[] = [
  {
    id: "mongolian-cultural-night-2026",
    title: "Naadam",
    image: "winterparty.png",

    details: {
      date: "September 20, 2026",
      time: "6:30 PM - 9:30 PM",
      location: "University of Calgary Community Hall",

      description: `Монгол соёлын үдэшлэгт хүрэлцэн ирээрэй.

Энэ үдэш Монголын урлаг, дуу хөгжим, бүжиг болон уламжлалт соёлыг танилцуулна.

Хөтөлбөр:
• Морин хуурын тоглолт
• Уртын дуу
• Монгол бүжгийн үзүүлбэр
• Соёлын танилцуулга

Арга хэмжээ нь Монгол соёлыг олон нийтэд таниулах зорилготой.`,

      description_en: `Experience an evening dedicated to Mongolian culture and artistic expression.

This event will feature live performances and presentations showcasing traditional Mongolian music, dance, and storytelling.

Program highlights include:

• Morin khuur instrumental performances
• Traditional long song (Urtiin Duu)
• Mongolian folk dance
• Cultural presentations about Mongolian history and traditions

This event is ideal for anyone interested in learning more about Mongolia's cultural heritage.`,

      ticketInfo: `Тасалбар: $20

Суудал хязгаартай тул урьдчилан бүртгүүлэх шаардлагатай.

Тасалбарын орлого нь:
• Соёлын хөтөлбөрүүд
• Уран бүтээлчдийн зардал
• Ирээдүйн арга хэмжээнүүдэд

зарцуулагдана.`,

      ticketInfo_en: `Ticket price: $20

Seats are limited. Advance registration is recommended.

Ticket revenue supports:

• Cultural programming
• Artist travel and performance costs
• Future community events.`,
    },

    actions: [
      {
        type: "payment",
        enabled: true,
        label: "Buy Ticket",
        label_mn: "Тасалбар авах",
        price: 20,
      },
      {
        type: "donation",
        enabled: false,
        label: "Donate",
        label_mn: "Хандив өгөх",
      },
      {
        type: "registration",
        enabled: true,
        label: "Register",
        label_mn: "Бүртгүүлэх",
      },
    ],

    contact: {
      email: "calgarymongolians@gmail.com",
      phone: ["587-435-4494"],
    },

    whoWeWant: [
      {
        title: "Backstage Assistant",
        title_mn: "Тайзны арын туслах",
        description:
          "Help performers prepare and move between backstage and stage areas.",
        contact: "587-435-4494",
      },
      {
        title: "Stage Manager",
        title_mn: "Тайзны зохицуулагч",
        description: "Coordinate performance order and help manage stage timing.",
        contact: "587-435-4494",
      },
      {
        title: "Photography Volunteer",
        title_mn: "Зураг авалтын сайн дурын ажилтан",
        description:
          "Capture photos and short video clips for community archives and social media.",
        contact: "587-435-4494",
      },
    ],
  },

  

  
];

export function getListings(events: EventItem[]) {
  const listings: OrganizedListing[] = [];

  for (const event of events) {
    for (const listing of event.whoWeWant) {
      listings.push({
        id: event.id,
        listing,
      });
    }
  }

  return listings;
}

export function getEventLink(event: EventItem) {
  return `/events/${event.id}`;
}

export function getEventCardDescription(event: EventItem) {
  return event.details.date;
}

export function getFirstParagraph(text?: string) {
  if (!text) return "";
  return text.split("\n").find((line) => line.trim().length > 0) || "";
}