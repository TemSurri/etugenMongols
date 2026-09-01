export const accountCopy = {
    en: {
        title: "My Account",
        subtitle:
            "Manage your profile, security settings, and account activity.",

        profile: {
            title: "Profile",
            firstName: "First name",
            lastName: "Last name",
            email: "Email",
            memberSince: "Member since",
            emailStatus: "Email status",

            verified: "Verified",
            notVerified: "Not verified",

            editName: "Edit name",

            save: "Save",
            cancel: "Cancel",

            changingName: "Saving...",
            nameSuccess:
                "Your name has been updated.",

            invalidName:
                "Please enter a valid first and last name.",

            genericError:
                "Something went wrong. Please try again."
        },

        security: {
            title: "Security",

            email: "Email",
            changeEmail: "Change email",

            password: "Password",
            passwordValue: "••••••••",
            changePassword: "Change password",

            newEmail: "New email",
            confirmEmail: "Confirm new email",

            currentPassword: "Current password",
            newPassword: "New password",
            confirmPassword: "Confirm new password",

            changingEmail:
                "Sending verification...",

            changingPassword:
                "Changing password...",

            emailSuccess:
                "A verification link has been sent to your new email address. Your email will be updated after you click the verification link.",

            passwordSuccess:
                "Your password has been changed successfully.",

            emailMismatch:
                "The email addresses do not match.",

            invalidEmail:
                "Please enter a valid email address.",

            passwordMismatch:
                "The new passwords do not match.",

            weakPassword:
                "Password must be at least 8 characters and contain at least one uppercase letter and one number or special character.",

            incorrectPassword:
                "Your current password is incorrect.",

            genericError:
                "Something went wrong. Please try again.",

            cancel: "Cancel",

            show: "Show",
            hide: "Hide"
        },

        history: {
            title: "History",
            emptyTitle:
                "No activity yet",
            emptyBody:
                "Your recent account activity will appear here."
        }
    },

    mn: {
        title: "Миний бүртгэл",
        subtitle:
            "Өөрийн мэдээлэл, аюулгүй байдлын тохиргоо болон бүртгэлийн үйл ажиллагааг удирдана уу.",

        profile: {
            title: "Хувийн мэдээлэл",
            firstName: "Нэр",
            lastName: "Овог",
            email: "Имэйл",
            memberSince: "Бүртгүүлсэн огноо",
            emailStatus: "Имэйлийн төлөв",

            verified: "Баталгаажсан",
            notVerified: "Баталгаажаагүй",

            editName: "Нэр засах",

            save: "Хадгалах",
            cancel: "Цуцлах",

            changingName:
                "Хадгалж байна...",

            nameSuccess:
                "Таны нэр амжилттай шинэчлэгдлээ.",

            invalidName:
                "Нэр болон овгоо зөв оруулна уу.",

            genericError:
                "Алдаа гарлаа. Дахин оролдоно уу."
        },

        security: {
            title: "Аюулгүй байдал",

            email: "Имэйл",
            changeEmail: "Имэйл солих",

            password: "Нууц үг",
            passwordValue: "••••••••",
            changePassword: "Нууц үг солих",

            newEmail: "Шинэ имэйл",
            confirmEmail: "Шинэ имэйлээ баталгаажуулах",

            currentPassword: "Одоогийн нууц үг",
            newPassword: "Шинэ нууц үг",
            confirmPassword: "Шинэ нууц үгээ баталгаажуулах",

            changingEmail:
                "Баталгаажуулах холбоос илгээж байна...",

            changingPassword:
                "Нууц үгийг шинэчилж байна...",

            emailSuccess:
                "Таны шинэ имэйл хаяг руу баталгаажуулах холбоос илгээгдлээ. Холбоос дээр дарж баталгаажуулсны дараа таны имэйл хаяг шинэчлэгдэнэ.",

            passwordSuccess:
                "Таны нууц үг амжилттай шинэчлэгдлээ.",

            emailMismatch:
                "Имэйл хаягууд таарахгүй байна.",

            invalidEmail:
                "Зөв имэйл хаяг оруулна уу.",

            passwordMismatch:
                "Шинэ нууц үгнүүд таарахгүй байна.",

            weakPassword:
                "Нууц үг хамгийн багадаа 8 тэмдэгттэй, нэг том үсэг болон нэг тоо эсвэл тусгай тэмдэгт агуулсан байх ёстой.",

            incorrectPassword:
                "Таны одоогийн нууц үг буруу байна.",

            genericError:
                "Алдаа гарлаа. Дахин оролдоно уу.",

            cancel: "Цуцлах",

            show: "Харах",
            hide: "Нуух"
        },

        history: {
            title: "Түүх",
            emptyTitle:
                "Одоогоор үйл ажиллагаа алга",
            emptyBody:
                "Таны сүүлийн бүртгэлийн үйл ажиллагаа энд харагдана."
        }
    }
} as const;