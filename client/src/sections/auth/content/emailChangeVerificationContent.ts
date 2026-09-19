import type { VerificationCopy } from "../verification/VerificationSection";
export const emailChangeVerificationContent = {
  en: {
    verifyingTitle: "Verifying your new email",

    verifyingDescription:
      "Please wait while we confirm your new email address.",

    successTitle: "Email updated",

    successDescription: "Your email address has been successfully changed.",

    errorTitle: "Email change failed",

    errorDescription:
      "This verification link is invalid, expired, or has already been used.",

    redirectingText: "Redirecting to your account...",

    errorButtonText: "Back to account",
  },
  mn: {
    verifyingTitle: "Шинэ имэйлийг баталгаажуулж байна",

    verifyingDescription:
      "Таны шинэ имэйл хаягийг баталгаажуулах хүртэл түр хүлээнэ үү.",

    successTitle: "Имэйл шинэчлэгдлээ",

    successDescription: "Таны имэйл хаяг амжилттай шинэчлэгдлээ.",

    errorTitle: "Имэйл шинэчлэхэд алдаа гарлаа",

    errorDescription:
      "Энэ баталгаажуулах холбоос хүчингүй, хугацаа дууссан эсвэл өмнө нь ашиглагдсан байна.",

    redirectingText: "Таны бүртгэл рүү шилжүүлж байна...",

    errorButtonText: "Бүртгэл рүү буцах",
  },
} satisfies Record<"en" | "mn", VerificationCopy>;
