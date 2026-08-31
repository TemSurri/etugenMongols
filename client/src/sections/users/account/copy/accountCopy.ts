export const accountCopy = {

    en: {

        title: "My Account",

        subtitle:
            "Keep track of your account, security, and recent activity.",

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

            changingName:
                "Updating name...",

            nameSuccess:
                "Your name has been updated.",

            invalidName:
                "First name and last name are required.",

            genericError:
                "Unable to update your name. Please try again."

        },

        security: {

            title: "Security",

            email: "Email",
            changeEmail:
                "Change email",

            password: "Password",
            passwordValue: "••••••••",

            changePassword:
                "Change password",

            currentPassword:
                "Current password",

            newPassword:
                "New password",

            confirmPassword:
                "Confirm new password",

            newEmail:
                "New email",

            confirmEmail:
                "Confirm new email",

            save: "Save",
            cancel: "Cancel",

            changing:
                "Changing password...",

            success:
                "Your password has been changed.",

            changingEmail:
                "Sending verification email...",

            emailSuccess:
                "A verification email has been sent to your new address. Your account email will only change after you verify it.",

            incorrectPassword:
                "Your current password is incorrect.",

            mismatch:
                "The new passwords do not match.",

            weakPassword:
                "Password must be at least 8 characters and contain one uppercase letter and one number or special character.",

            emailMismatch:
                "The email addresses do not match.",

            invalidEmail:
                "Please enter a valid email address.",

            genericError:
                "Unable to update your account. Please try again."

        },

        history: {

            title: "History",

            emptyTitle:
                "No activity yet",

            emptyBody:
                "Your donations, registrations, and other account activity will appear here."

        }

    },

    mn: {

        title: "Миний бүртгэл",

        subtitle:
            "Бүртгэл, аюулгүй байдал болон сүүлийн үйл ажиллагаагаа хянаарай.",

        profile: {

            title: "Хувийн мэдээлэл",

            firstName: "Нэр",
            lastName: "Овог",
            email: "Имэйл",

            memberSince:
                "Бүртгүүлсэн огноо",

            emailStatus:
                "Имэйлийн төлөв",

            verified:
                "Баталгаажсан",

            notVerified:
                "Баталгаажаагүй",

            editName:
                "Нэр засах",

            save:
                "Хадгалах",

            cancel:
                "Цуцлах",

            changingName:
                "Нэрийг шинэчилж байна...",

            nameSuccess:
                "Таны нэр амжилттай шинэчлэгдлээ.",

            invalidName:
                "Нэр болон овгийг оруулна уу.",

            genericError:
                "Нэрийг шинэчлэх боломжгүй байна. Дахин оролдоно уу."

        },

        security: {

            title:
                "Аюулгүй байдал",

            email:
                "Имэйл",

            changeEmail:
                "Имэйл солих",

            password:
                "Нууц үг",

            passwordValue:
                "••••••••",

            changePassword:
                "Нууц үг солих",

            currentPassword:
                "Одоогийн нууц үг",

            newPassword:
                "Шинэ нууц үг",

            confirmPassword:
                "Шинэ нууц үгээ давтах",

            newEmail:
                "Шинэ имэйл",

            confirmEmail:
                "Шинэ имэйлээ давтах",

            save:
                "Хадгалах",

            cancel:
                "Цуцлах",

            changing:
                "Нууц үгийг сольж байна...",

            success:
                "Таны нууц үг амжилттай солигдлоо.",

            changingEmail:
                "Баталгаажуулах имэйл илгээж байна...",

            emailSuccess:
                "Шинэ имэйл хаяг руу баталгаажуулах холбоос илгээгдлээ. Баталгаажуулсны дараа таны имэйл хаяг солигдоно.",

            incorrectPassword:
                "Одоогийн нууц үг буруу байна.",

            mismatch:
                "Шинэ нууц үгүүд таарахгүй байна.",

            weakPassword:
                "Нууц үг хамгийн багадаа 8 тэмдэгттэй, нэг том үсэг болон нэг тоо эсвэл тусгай тэмдэгт агуулсан байх ёстой.",

            emailMismatch:
                "Имэйл хаягууд таарахгүй байна.",

            invalidEmail:
                "Зөв имэйл хаяг оруулна уу.",

            genericError:
                "Бүртгэлийг шинэчлэх боломжгүй байна. Дахин оролдоно уу."

        },

        history: {

            title:
                "Түүх",

            emptyTitle:
                "Одоогоор үйл ажиллагаа алга",

            emptyBody:
                "Таны хандив, бүртгэл болон бусад үйл ажиллагаа энд харагдана."

        }

    }

} as const;