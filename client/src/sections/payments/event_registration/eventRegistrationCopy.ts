import type {
    Lang
} from "./eventRegistrationTypes";


export type EventRegistrationCopy = {

    backToEvent: string;

    registerFor: string;

    registrationIntro: (
        price: string
    ) => string;


    yourInformation: string;

    yourInformationDescription: string;

    firstName: string;

    lastName: string;

    email: string;

    accountSuggestion: string;

    createAccount: string;


    additionalGuests: string;

    additionalGuestsDescription: string;

    addPerson: string;

    guest: string;

    remove: string;

    noAdditionalGuests: string;


    registrationSummary: string;

    pricePerGuest: string;

    people: string;

    person: string;

    total: string;

    continueToPayment: string;


    preparingPayment: string;

    existingPaymentTitle: string;

    existingPaymentDescription: string;

    continueExistingPayment: string;

    cancelExistingPayment: string;

    cancel: string;


    currentPayment: string;

    paymentType: string;

    paymentAmount: string;

    paymentEmail: string;

    paymentPayer: string;

    paymentAttendees: string;

    donation: string;

    eventRegistration: string;

    existingDonationDescription: string;

    existingEventRegistrationDescription: string;


    paymentTitle: string;

    paymentDescription: string;

    paymentComplete: string;


    donationPaymentTitle: string;

    donationPaymentDescription: string;

    completeDonation: string;
};


export const EVENT_REGISTRATION_COPY: Record<
    Lang,
    EventRegistrationCopy
> = {

    en: {

        backToEvent:
            "Back to event",

        registerFor:
            "Register for",

        registrationIntro:
            (
                price: string
            ) =>
                `You are registering one ticket for yourself. Registration is ${price} per guest. You can add additional people below and the total will increase for each guest you add.`,


        yourInformation:
            "Your information",

        yourInformationDescription:
            "You'll be the primary contact for this registration.",

        firstName:
            "First name",

        lastName:
            "Last name",

        email:
            "Email",

        accountSuggestion:
            "Want faster registrations in the future? Create an account and we'll be able to fill this information in for you.",

        createAccount:
            "Create an account",


        additionalGuests:
            "Additional guests",

        additionalGuestsDescription:
            "Add anyone else who will be attending with you.",

        addPerson:
            "Add person",

        guest:
            "Guest",

        remove:
            "Remove",

        noAdditionalGuests:
            "No additional guests yet.",


        registrationSummary:
            "Registration summary",

        pricePerGuest:
            "Price per guest",

        people:
            "people",

        person:
            "person",

        total:
            "Total",

        continueToPayment:
            "Continue to payment",


        preparingPayment:
            "Preparing payment…",

        existingPaymentTitle:
            "Existing payment",

        existingPaymentDescription:
            "You already have a payment in progress. You can continue it or cancel it before starting a new payment.",

        continueExistingPayment:
            "Continue payment",

        cancelExistingPayment:
            "Cancel payment",

        cancel:
            "Cancel",


        currentPayment:
            "Current payment",

        paymentType:
            "Type",

        paymentAmount:
            "Amount",

        paymentEmail:
            "Email",

        paymentPayer:
            "Registrant",

        paymentAttendees:
            "Attendees",

        donation:
            "Donation",

        eventRegistration:
            "Event registration",

        existingDonationDescription:
            "You currently have a donation payment in progress. Finish or cancel that donation before starting this event registration.",

        existingEventRegistrationDescription:
            "You currently have an event registration payment in progress. You can continue that registration or cancel it and start again.",


        paymentTitle:
            "Complete registration",

        paymentDescription:
            "Complete your payment to finish registering.",

        paymentComplete:
            "Registration complete",


        donationPaymentTitle:
            "Complete donation",

        donationPaymentDescription:
            "Complete your existing donation payment.",

        completeDonation:
            "Complete donation"
    },


    mn: {

        backToEvent:
            "Арга хэмжээ рүү буцах",

        registerFor:
            "Бүртгүүлэх",

        registrationIntro:
            (
                price: string
            ) =>
                `Та өөрийн нэг тасалбарын бүртгэлийг хийж байна. Бүртгэл нэг зочинд ${price}. Та доор нэмэлт хүмүүс нэмж болох бөгөөд нэмсэн хүн бүрийн хувьд нийт үнэ нэмэгдэнэ.`,


        yourInformation:
            "Таны мэдээлэл",

        yourInformationDescription:
            "Та энэ бүртгэлийн үндсэн холбоо барих хүн байна.",

        firstName:
            "Нэр",

        lastName:
            "Овог",

        email:
            "Имэйл",

        accountSuggestion:
            "Дараагийн бүртгэлээ илүү хурдан хийхийн тулд бүртгэл үүсгэж болно.",

        createAccount:
            "Бүртгэл үүсгэх",


        additionalGuests:
            "Нэмэлт зочид",

        additionalGuestsDescription:
            "Тантай хамт оролцох хүмүүсийг нэмнэ үү.",

        addPerson:
            "Хүн нэмэх",

        guest:
            "Зочин",

        remove:
            "Устгах",

        noAdditionalGuests:
            "Одоогоор нэмэлт хүн алга.",


        registrationSummary:
            "Бүртгэлийн мэдээлэл",

        pricePerGuest:
            "Нэг хүний үнэ",

        people:
            "хүн",

        person:
            "хүн",

        total:
            "Нийт",

        continueToPayment:
            "Төлбөр үргэлжлүүлэх",


        preparingPayment:
            "Төлбөр бэлдэж байна…",

        existingPaymentTitle:
            "Үргэлжилж буй төлбөр",

        existingPaymentDescription:
            "Танд аль хэдийн үргэлжилж буй төлбөр байна. Шинэ төлбөр эхлүүлэхээс өмнө үргэлжлүүлэх эсвэл цуцлах боломжтой.",

        continueExistingPayment:
            "Төлбөр үргэлжлүүлэх",

        cancelExistingPayment:
            "Төлбөр цуцлах",

        cancel:
            "Цуцлах",


        currentPayment:
            "Одоогийн төлбөр",

        paymentType:
            "Төрөл",

        paymentAmount:
            "Дүн",

        paymentEmail:
            "Имэйл",

        paymentPayer:
            "Бүртгүүлэгч",

        paymentAttendees:
            "Оролцогчид",

        donation:
            "Хандив",

        eventRegistration:
            "Арга хэмжээний бүртгэл",

        existingDonationDescription:
            "Танд үргэлжилж буй хандивын төлбөр байна. Энэ бүртгэлийн төлбөрийг эхлүүлэхээс өмнө хандиваа дуусгах эсвэл цуцална уу.",

        existingEventRegistrationDescription:
            "Танд үргэлжилж буй арга хэмжээний бүртгэлийн төлбөр байна. Та үргэлжлүүлэх эсвэл цуцалж дахин эхлэх боломжтой.",


        paymentTitle:
            "Бүртгэл дуусгах",

        paymentDescription:
            "Бүртгэлээ дуусгахын тулд төлбөрөө хийнэ үү.",

        paymentComplete:
            "Бүртгэл амжилттай",


        donationPaymentTitle:
            "Хандив дуусгах",

        donationPaymentDescription:
            "Үргэлжилж буй хандивын төлбөрөө дуусгана уу.",

        completeDonation:
            "Хандив дуусгах"
    }

};