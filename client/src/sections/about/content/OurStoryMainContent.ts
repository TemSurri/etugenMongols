import type { Lang } from "../../../context/language";
import { aboutMedia } from "../media";
export type { Lang } from "../../../context/language";

export type Copy = {
  brand: string;
  storyTitle: string;
  viewEvents: string;
  viewPrograms: string;
  meetTeam: string;
  closing: string;
  story: readonly StoryItem[];
};

export type StoryItem = {
  body: string;
  imageKey: StoryImageKey;
};

export type StoryImageKey = keyof typeof aboutMedia.story;

export const COPY = {
  en: {
    brand: "Etugen Mongols",
    storyTitle: "Our Story",
    viewEvents: "View Events",
    viewPrograms: "View Programs",
    meetTeam: "Meet the Team",
    closing:
      "We officially host events and programs for the Mongolian community in Calgary.",
    story: [
      {
        body: "We are first-generation immigrant parents from Mongolia. A few of us arrived in Calgary, Alberta, in 2006, drawn here in part because it felt familiar — a similar climate, mountains and rivers that remind us of our homeland, and vast open fields dotted with livestock that echo our nomadic roots. Above all, it is a country that welcomes not only people from every corner of the world, but the cultures and traditions they bring with them. Here we found our footing, grew our careers, and raised our families far from the land where we were born.",
        imageKey: "community",
      },
      {
        body: "There is an old Mongolian saying: when you drink the water of a land, you honour its traditions and live by its values. We carry that wisdom with us every day, weaving our lives, our values, and our hearts into Canadian soil, as every Canadian does. At the same time, we hold our heritage close to our hearts, cherishing where we come from.",
        imageKey: "culture",
      },
      {
        body: "Back then, the Mongolian community in Calgary numbered fewer than a hundred people. We knew nearly every face. And whenever our small community held an event, we showed up — each of us doing a small piece to help, to organize, and to take part with pride, simply as neighbours who didn't want our traditions to fade so far from home.",
        imageKey: "founding",
      },
      {
        body: 'In June 2011, a group of mothers organized our very first Children’s Day festival, "Mom, Dad and Me," at Bowness Park. With no budget and no grand plan, we simply shared a dream of building a home away from home.',
        imageKey: "children",
      },
      {
        body: "From that single day, Etugen Mongols was born — not on paper, but in our shared goals and dreams. For years, we poured our open hearts into it — organizing events, bringing families together, and keeping our kids connected to their roots. As our community grew, so did the need for a true foundation. That's why we officially stepped up to establish our non-profit organization, giving us a lasting way to lead, gather, and pass our heritage on to every generation to come.",
        imageKey: "landing",
      },
    ],
  },
  mn: {
    brand: "Этүгэн Монголчууд",
    storyTitle: "Бидний түүх",
    viewEvents: "Арга хэмжээнүүд",
    viewPrograms: "Хөтөлбөрүүд",
    meetTeam: "Багтай танилцах",
    closing:
      "Бид Калгари дахь Монгол хамт олонд зориулсан арга хэмжээ, хөтөлбөрүүдийг албан ёсоор зохион байгуулдаг.",
    story: [
      {
        body: "“Амьдралын жигүүр үндэснээс эхтэй гэдгийг үр хүүхдийнхээ ухамсарт оршоохыг бид хүссэн.” Бид бол алс холын Монгол Улсаас амьдралынхаа шинэ хуудсыг нээхээр зорин ирсэн анхны үеийн Канадын монголчууд билээ. 2006 оны тэр нэгэн өдөр Алберта мужийн Калгари хотод анхны цөөн хэдэн монголчууд хөл тавихад эх орныг маань санагдуулам өндөр сүрлэг уул нурууд, өргөн тунгалаг гол мөрөн, нүүдэлчин ахуйн цуурай мэт өргөн уудам тал нутаг найрсаг дулаанаар угтсан юм. Хамгийн гол нь Канад Улс дэлхийн өнцөг булан бүрээс ирсэн хүмүүст элгэмсүү ханддагаас гадна өв соёлыг нь гүнээ хүндэтгэдэг нь бидэнд өрх гэрээ энэ сайхан нутагт шинээр цогцлоох урам зоригийг өгсөн. Энд л бид ажил амьдралынхаа гарааг эхэлж, өсөн дэвжиж ирлээ.",
        imageKey: "community",
      },
      {
        body: "“Усыг нь уувал ёсыг нь дага” гэх монгол ардын мэргэн үг бий. Бид өвгөдийнхөө энэхүү мэргэн ухааныг өдөр тутамдаа мөрдлөг болгож, канад хүн бүрийн нэгэн адил ахуй амьдрал, үнэт зүйл, зүрх сэтгэлээ Канадын хөрсөнд шингээж байна. Үүний зэрэгцээ бид өөрсдийн өв уламжлал, гарал угсаагаа марталгүй өр зүрхэндээ нандигнан тээдэг.",
        imageKey: "culture",
      },
      {
        body: "Тэр үед Калгари хотын монголчууд бүгд бие биеэ таньдаг зуу хүрэхгүй хүнтэй жижигхэн хүрээлэл байлаа. Тиймээс ч эх орноосоо алс нутагт өв уламжлалаа умартан замхруулахыг хүсээгүй бидний цөөхөн монголчууд ямар нэгэн үйл явдал зохион байгуулах бүрд айл саахалтынхан мэт бүгд эрвийх дэрвийхээрээ тусалж, дэмжин, оролцдог байлаа.",
        imageKey: "founding",
      },
      {
        body: "2011 оны 6-р сард хэдэн монгол ээж санаачлан Боунесс цэцэрлэгт хүрээлэнд Хүүхдийн баярын анхны өдөрлөг болох “Ээж, аав, бид гурав” хэмээх арга хэмжээг зохион байгуулсан юм. Том төсөв, төлөвлөгөө байгаагүй ч эх орноосоо хол “эх орноо” бий болгох чин хүсэл, мөрөөдөл маань биднийг нэгтгэсэн билээ.",
        imageKey: "children",
      },
      {
        body: "Тэр л мартагдашгүй өдрөөс “Этүгэн Монголчууд” нийгэмлэг албан ёсоор биш ч, бидний нийтлэг зорилго, мөрөөдлөөс үүдэн мэндэлсэн билээ. Урсах он жилүүдийн турш бид нийгэмлэгтээ сэтгэл зүрхээ зориулан олон олон арга хэмжээ зохион байгуулж, айл саахалтаараа хуран цуглаж, үр хүүхдээ үндэс угсаатай нь холбох гүүр нь болсоор ирлээ. Бидний хүрээлэл өсөн нэмэгдэхийн хэрээр илүү бат бөх, албан ёсны суурь хэрэгтэйг ухамсарласан. Тийм ч учраас бид ашгийн бус байгууллагаа албан ёсоор байгуулж, үндэс угсаа нэгтнээ манлайлан, цуглуулж, өв уламжлалаа ирээдүй хойч үедээ өвлүүлэн үлдээх өнө удаан замналаа эхлүүлсэн билээ.",
        imageKey: "landing",
      },
    ],
  },
} as const satisfies Record<Lang, Copy>;
