import VerificationSection
    from "../../sections/auth/verification/VerificationSection";


function VerificationPage() {

    return (
        <VerificationSection

            endpoint="/verify-token"

            successRedirect="/auth/login"

            redirectDelay={1800}

            english={{

                verifyingTitle:
                    "Verifying your account",

                verifyingDescription:
                    "Please wait while we verify your account.",


                successTitle:
                    "Account verified",

                successDescription:
                    "Your account has been successfully verified. You can now sign in.",


                errorTitle:
                    "Verification failed",

                errorDescription:
                    "This verification link is invalid, expired, or has already been used.",

            }}

            mongolian={{

                verifyingTitle:
                    "Бүртгэлийг баталгаажуулж байна",

                verifyingDescription:
                    "Таны бүртгэлийг баталгаажуулах хүртэл түр хүлээнэ үү.",


                successTitle:
                    "Бүртгэл баталгаажлаа",

                successDescription:
                    "Таны бүртгэл амжилттай баталгаажлаа. Та одоо нэвтрэх боломжтой.",


                errorTitle:
                    "Баталгаажуулалт амжилтгүй",

                errorDescription:
                    "Энэ баталгаажуулах холбоос хүчингүй, хугацаа дууссан эсвэл өмнө нь ашиглагдсан байна.",

            }}

        />
    );

}


export default VerificationPage;