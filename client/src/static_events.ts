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