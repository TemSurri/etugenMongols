import { cubicBezier, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { authPageShellCopy } from "../content/AuthPageShellCopy";
import AuthBackground from "./AuthBackground";
const entranceMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};
type Props = {
  language: "en" | "mn";
  setLanguage: (language: "en" | "mn") => void;
  background: string;
  backTo: string;
  backLabel: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
};
export default function AuthPageShell({
  language,
  setLanguage,
  background,
  backTo,
  backLabel,
  title,
  description,
  children,
}: Props) {
  return (
    <main
      className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#27301d]
                text-[#27301d]
            "
    >
      {/* Background */}
      <AuthBackground background={background} />

      {/* Background treatment */}
      <div
        className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[#182010]/58
                "
      />

      <div
        className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-b
                    from-black/15
                    via-transparent
                    to-black/35
                "
      />

      {/* Verification area */}
      <section
        className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center

                    px-5
                    pb-10
                    pt-20

                    md:px-10
                    md:pb-12
                    md:pt-24
                "
      >
        <motion.div
          variants={entranceMotion}
          initial="hidden"
          animate="show"
          className="
                        relative
                        w-full
                        max-w-[29rem]
                    "
        >
          {/* Top controls */}
          <div
            className="
                            absolute
                            -top-9
                            left-0

                            flex
                            w-full
                            items-center
                            justify-between
                        "
          >
            <Link
              to={backTo}
              className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-white/75

                                no-underline
                                transition-colors

                                hover:text-white
                            "
            >
              {backLabel}
            </Link>

            {/* Language */}
            <div
              className="
                                flex
                                items-center

                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                            "
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={authPageShellCopy[language].textWhite}
              >
                EN
              </button>

              <span
                className="
                                    mx-2
                                    text-white/25
                                "
              >
                |
              </span>

              <button
                type="button"
                onClick={() => setLanguage("mn")}
                className={
                  authPageShellCopy[language]
                    .textWhite45TransitionColorsHoverText
                }
              >
                MN
              </button>
            </div>
          </div>

          {/* Verification card */}
          <div
            className="
                            border
                            border-white/20
                            bg-[#f7f7f4]

                            shadow-2xl
                            shadow-black/25
                        "
          >
            {/* Header */}
            <div
              className="
                                border-b
                                border-[#27301d]/10
                                bg-white

                                px-7
                                py-6

                                text-center

                                md:px-9
                            "
            >
              <h1
                className="
                                    text-3xl
                                    font-semibold
                                    leading-tight
                                    text-[#27301d]
                                "
              >
                {title}
              </h1>

              <p
                className="
                                    mx-auto
                                    mt-2
                                    max-w-sm

                                    text-sm
                                    leading-6
                                    text-[#667056]
                                "
              >
                {description}
              </p>
            </div>

            {/* Form */}
            <div
              className="
                                px-7
                                py-6
                                md:px-9
                            "
            >
              {children}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
