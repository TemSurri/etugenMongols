import { AnimatePresence,cubicBezier,motion } from "framer-motion";
import { Link } from "react-router-dom";
const easeOut = cubicBezier(0.22, 1, 0.36, 1);
export default function SignupBenefitsModal({showWhyAccount, setShowWhyAccount, language}: { showWhyAccount: boolean; setShowWhyAccount: (value: boolean) => void; language: "en" | "mn" }) { return (<AnimatePresence>

                {showWhyAccount && (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="
                            fixed
                            inset-0
                            z-50

                            flex
                            items-center
                            justify-center

                            bg-black/55

                            px-4
                            py-5

                            backdrop-blur-[2px]
                        "
                        onClick={() =>
                            setShowWhyAccount(false)
                        }
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.985,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 8,
                                scale: 0.985,
                            }}
                            transition={{
                                duration: 0.18,
                                ease: easeOut,
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            className="
                                max-h-[calc(100vh-2.5rem)]
                                w-full
                                max-w-3xl
                                overflow-y-auto

                                border
                                border-[#efe7d4]

                                bg-white

                                shadow-2xl
                                shadow-black/30
                            "
                        >

                            {/* Modal header */}
<div
    className="
        sticky
        top-0
        z-10

        flex
        items-center
        justify-between
        gap-5

        border-b
        border-[#27301d]/10

        bg-white

        px-6
        py-4

        md:px-7
    "
>

    <h2
        className="
            text-xl
            font-semibold
            text-[#27301d]

            md:text-2xl
        "
    >
        {language === "en"
            ? "Why create an account with Etugen Mongols?"
            : "Яагаад Etugen Mongols-д бүртгэл үүсгэх вэ?"}
    </h2>


    <button
        type="button"
        onClick={() =>
            setShowWhyAccount(false)
        }
        aria-label="Close"
        className="
            text-base
            text-[#667056]

            transition-colors

            hover:text-[#27301d]
        "
    >
        ✕
    </button>

</div>


{/* Modal content */}
<div
    className="
        px-6
        py-5

        md:px-7
    "
>

    {language === "en" ? (

        <>

            <p
                className="
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#667056]
                "
            >
                You can still donate and buy tickets without an account.
                Creating one simply makes it easier to get involved,
                stay connected, and keep track of your activity with us.
            </p>


            <div
                className="
                    mt-5
                    grid
                    gap-3

                    sm:grid-cols-3
                "
            >

                {/* Left */}
                <Benefit
                    title="Get involved"
                    body="Take part in programs, events, and community opportunities more easily."
                />


                {/* Middle */}
                <Benefit
                    title="Stay connected"
                    body="Receive useful updates and reminders about upcoming activities."
                />


                {/* Right */}
                <Benefit
                    title="Track your history"
                    body="View your registrations, donations, and payments in one place."
                />

            </div>

        </>

    ) : (

        <>

            <p
                className="
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#667056]
                "
            >
                Та бүртгэлгүйгээр хандив өгөх болон тасалбар авах
                боломжтой. Бүртгэл үүсгэснээр бидний үйл ажиллагаанд
                оролцох, холбоотой байх, өөрийн түүхээ хянах илүү
                хялбар болно.
            </p>


            <div
                className="
                    mt-5
                    grid
                    gap-3

                    sm:grid-cols-3
                "
            >

                {/* Left */}
                <Benefit
                    title="Оролцоорой"
                    body="Хөтөлбөр, арга хэмжээ болон олон нийтийн боломжуудад илүү хялбар оролцоорой."
                />


                {/* Middle */}
                <Benefit
                    title="Холбоотой байгаарай"
                    body="Удахгүй болох үйл ажиллагааны мэдээлэл болон сануулгыг аваарай."
                />


                {/* Right */}
                <Benefit
                    title="Түүхээ хянах"
                    body="Бүртгэл, хандив болон төлбөрийн мэдээллээ нэг дор хараарай."
                />

            </div>

        </>

    )}


    {/* Etugen Mongols branding */}
    <div
        className="
            mt-6
            flex
            justify-center

            border-t
            border-[#27301d]/10
            pt-5
        "
    >

        <Link
            to="/"
            onClick={() =>
                setShowWhyAccount(false)
            }
            className="
                inline-flex
                items-center
                gap-3

                no-underline

                transition-opacity

                hover:opacity-80
            "
        >

            <img
                src="/logo.webp"
                alt="Etugen Mongols logo"
                loading="lazy"
                decoding="async"
                className="
                    h-10
                    w-10
                    object-contain
                "
            />


            <div className="text-left">

                <p
                    className="
                        text-sm
                        font-semibold
                        text-[#27301d]
                    "
                >
                    Etugen Mongols
                </p>

                <p
                    className="
                        mt-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#9a7b26]
                    "
                >
                    Not For Profit
                </p>

            </div>

        </Link>

    </div>

</div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>); }
function Benefit({
    title,
    body,
}: {
    title: string;
    body: string;
}) {

    return (
        <div
            className="
                border
                border-[#27301d]/10
                bg-[#fffaf0]
                px-4
                py-4
            "
        >

            <h3
                className="
                    text-sm
                    font-semibold
                    text-[#27301d]
                "
            >
                {title}
            </h3>


            <p
                className="
                    mt-2
                    text-xs
                    leading-5
                    text-[#667056]
                "
            >
                {body}
            </p>

        </div>
    );
}
