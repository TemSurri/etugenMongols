import type {
  DonationCopy,
  Lang,
} from "./donateTypes";


export const DONATION_COPY: Record<
  Lang,
  DonationCopy
> = {

  en: {

    donationTitle:
      "Your donation",

    amountLabel:
      "Donation amount",

    amountPlaceholder:
      "Enter amount",

    amountMinimum:
      "The minimum donation amount is $1.00 CAD.",

    detailsTitle:
      "Your details",

    emailLabel:
      "Email address",

    emailPlaceholder:
      "Enter your email address",

    firstNameLabel:
      "First name",

    firstNamePlaceholder:
      "Enter your first name",

    lastNameLabel:
      "Last name",

    lastNamePlaceholder:
      "Enter your last name",

    anonymousLabel:
      "I wish to remain anonymous",

    messageTitle:
      "Message",

    messageDescription:
      "If you have something specific in mind for your donation, let us know here. You can tell us about a program, event, cultural activity, or other area you would especially like your contribution to support. You can also use this space to leave any other information you would like us to know.",

    messageLabel:
      "Anything you'd like us to know? (optional)",

    messagePlaceholder:
      "Tell us if there's something you'd especially like your donation to support, such as a particular event, program, or cultural activity. You can also leave any other information you'd like us to know.",

    summaryTitle:
      "Summary",

    donationSummary:
      "Donation",

    total:
      "Total",

    checkout:
      "Continue to payment",

    processing:
      "Preparing payment...",

    required:
      "Please complete the required information.",

    error:
      "We could not start your payment. Please try again.",

    loggedInAs:
      "Donating as",

    accountTitle:
      "Have an Etugen account?",

    accountDescription:
      "Sign in to automatically fill your information and make future donations easier.",

    login:
      "Sign in",

    createAccount:
      "Create account",


    /*
     * Existing payment
     */

    existingPaymentTitle:
      "You already have a payment in progress",

    existingPaymentDescription:
      "There is already a payment associated with your current session.",

    existingDonationDescription:
      "You currently have a donation payment in progress. You can continue that donation or cancel it and start again.",

    existingEventDescription:
      "You currently have an event registration payment in progress. Finish or cancel that registration before starting a new donation.",

    existingPaymentType:
      "Type",

    existingPaymentAmount:
      "Amount",

    existingPaymentEmail:
      "Email",

    existingPaymentRegistrant:
      "Registrant",

    existingPaymentAttendees:
      "Attendees",

    donation:
      "Donation",

    eventRegistration:
      "Event registration",

    continueExisting:
      "Continue payment",

    cancelExisting:
      "Cancel and start again",

    cancellingPayment:
      "Cancelling payment…",


    /*
     * Stripe payment
     */

    paymentTitle:
      "Complete your donation",

    paymentDescription:
      "Enter your payment information below to securely complete your donation.",

    eventPaymentTitle:
      "Complete event registration",

    eventPaymentDescription:
      "Complete your existing event registration payment.",

    paymentTotal:
      "Total",

    paymentCancel:
      "Cancel payment",

    paymentProcessing:
      "Processing payment...",


    /*
     * Successful payment
     */

    paymentSuccessTitle:
      "Thank you for your donation",

    paymentSuccessDescription:
      "Your payment was successful and your donation has been accepted.",

    paymentSuccessEmail:
      "You will receive a confirmation email shortly.",

    eventSuccessTitle:
      "Registration payment successful",

    eventSuccessDescription:
      "Your payment was successful and your event registration has been accepted.",

    queuedDescription:
      "Your payment is now queued for processing.",

    safeToLeave:
      "You may safely leave this page. Processing will continue in the background.",

    paymentDone:
      "Back to home",

    backToEvents:
      "Back to events",


    /*
     * Processing / errors
     */

    paymentProcessingTitle:
      "Your payment is processing",

    paymentProcessingDescription:
      "Your payment has been submitted and is still being processed. We'll send you an email once it has been confirmed.",

    paymentCancelError:
      "We could not cancel the payment. Please try again.",

    paymentInvalidTitle:
      "Payment session unavailable",

    paymentInvalidDescription:
      "This payment session is no longer valid and cannot be safely continued. Please return and start a new payment.",
  },


  mn: {

    donationTitle:
      "Таны хандив",

    amountLabel:
      "Хандивын хэмжээ",

    amountPlaceholder:
      "Дүн оруулна уу",

    amountMinimum:
      "Хандивын доод хэмжээ $1.00 CAD байна.",

    detailsTitle:
      "Таны мэдээлэл",

    emailLabel:
      "Имэйл хаяг",

    emailPlaceholder:
      "Имэйл хаягаа оруулна уу",

    firstNameLabel:
      "Нэр",

    firstNamePlaceholder:
      "Нэрээ оруулна уу",

    lastNameLabel:
      "Овог",

    lastNamePlaceholder:
      "Овгоо оруулна уу",

    anonymousLabel:
      "Нэрээ нууцлах",

    messageTitle:
      "Зурвас",

    messageDescription:
      "Хэрэв та хандиваа тодорхой зүйлд зориулахыг хүсэж байвал энд бичиж болно. Та дэмжихийг хүссэн хөтөлбөр, арга хэмжээ, соёлын үйл ажиллагаа эсвэл бусад чиглэлийг бидэнд хэлээрэй. Мөн бидэнд мэдэгдэхийг хүссэн бусад мэдээллээ энд үлдээж болно.",

    messageLabel:
      "Бидэнд хэлэх зүйл байна уу? (сонголттой)",

    messagePlaceholder:
      "Хандиваа тодорхой арга хэмжээ, хөтөлбөр, соёлын үйл ажиллагаа эсвэл бусад зүйлд түлхүү зориулахыг хүсэж байвал энд бичнэ үү. Мөн бидэнд мэдэгдэх бусад мэдээллээ үлдээж болно.",

    summaryTitle:
      "Дүн",

    donationSummary:
      "Хандив",

    total:
      "Нийт",

    checkout:
      "Төлбөр рүү үргэлжлүүлэх",

    processing:
      "Төлбөр бэлдэж байна...",

    required:
      "Шаардлагатай мэдээллийг бөглөнө үү.",

    error:
      "Төлбөрийг эхлүүлж чадсангүй. Дахин оролдоно уу.",

    loggedInAs:
      "Хандив өгч буй хэрэглэгч",

    accountTitle:
      "Etugen бүртгэлтэй юу?",

    accountDescription:
      "Нэвтэрснээр таны мэдээлэл автоматаар бөглөгдөж, дараагийн хандив илүү хялбар болно.",

    login:
      "Нэвтрэх",

    createAccount:
      "Бүртгүүлэх",


    /*
     * Existing payment
     */

    existingPaymentTitle:
      "Танд үргэлжилж буй төлбөр байна",

    existingPaymentDescription:
      "Таны одоогийн сесстэй холбоотой төлбөр байна.",

    existingDonationDescription:
      "Танд үргэлжилж буй хандивын төлбөр байна. Та уг төлбөрийг үргэлжлүүлэх эсвэл цуцлаад дахин эхлэх боломжтой.",

    existingEventDescription:
      "Танд үргэлжилж буй арга хэмжээний бүртгэлийн төлбөр байна. Шинэ хандив эхлүүлэхээс өмнө уг төлбөрийг дуусгах эсвэл цуцална уу.",

    existingPaymentType:
      "Төрөл",

    existingPaymentAmount:
      "Дүн",

    existingPaymentEmail:
      "Имэйл",

    existingPaymentRegistrant:
      "Бүртгүүлэгч",

    existingPaymentAttendees:
      "Оролцогчид",

    donation:
      "Хандив",

    eventRegistration:
      "Арга хэмжээний бүртгэл",

    continueExisting:
      "Төлбөрийг үргэлжлүүлэх",

    cancelExisting:
      "Цуцлаад дахин эхлэх",

    cancellingPayment:
      "Төлбөр цуцалж байна…",


    /*
     * Stripe payment
     */

    paymentTitle:
      "Хандиваа дуусгах",

    paymentDescription:
      "Хандиваа аюулгүй дуусгахын тулд төлбөрийн мэдээллээ доор оруулна уу.",

    eventPaymentTitle:
      "Арга хэмжээний бүртгэлээ дуусгах",

    eventPaymentDescription:
      "Үргэлжилж буй арга хэмжээний бүртгэлийн төлбөрөө дуусгана уу.",

    paymentTotal:
      "Нийт",

    paymentCancel:
      "Төлбөр цуцлах",

    paymentProcessing:
      "Төлбөр боловсруулж байна...",


    /*
     * Successful payment
     */

    paymentSuccessTitle:
      "Хандив өгсөнд баярлалаа",

    paymentSuccessDescription:
      "Таны төлбөр амжилттай болж, хандив хүлээн авлаа.",

    paymentSuccessEmail:
      "Баталгаажуулах имэйл удахгүй танд илгээгдэх болно.",

    eventSuccessTitle:
      "Бүртгэлийн төлбөр амжилттай",

    eventSuccessDescription:
      "Таны төлбөр амжилттай болж, арга хэмжээний бүртгэл хүлээн авлаа.",

    queuedDescription:
      "Таны төлбөр одоо боловсруулалтын дараалалд орлоо.",

    safeToLeave:
      "Та энэ хуудсыг аюулгүй хааж болно. Боловсруулалт цаана үргэлжилнэ.",

    paymentDone:
      "Нүүр хуудас руу",

    backToEvents:
      "Арга хэмжээнүүд рүү",


    /*
     * Processing / errors
     */

    paymentProcessingTitle:
      "Таны төлбөр боловсруулагдаж байна",

    paymentProcessingDescription:
      "Таны төлбөр илгээгдсэн бөгөөд одоогоор боловсруулагдаж байна. Баталгаажмагц бид танд имэйл илгээнэ.",

    paymentCancelError:
      "Төлбөрийг цуцалж чадсангүй. Дахин оролдоно уу.",

    paymentInvalidTitle:
      "Төлбөрийн сесс ашиглах боломжгүй",

    paymentInvalidDescription:
      "Энэ төлбөрийн сесс цааш үргэлжлүүлэх боломжгүй болсон байна. Буцаж шинэ төлбөр эхлүүлнэ үү.",
  },
};