import type { Lang } from "../../context/language";
import { COPY } from "./content/ContactContent";

import { motion, type Variants } from "framer-motion";
import { memo, type ReactNode } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

type ContactProps = {
  lang?: Lang;
};

/* -------------------------------------------------------------------------- */
/*                                   Copy                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Animations                                  */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

function Contact({ lang = "mn" }: ContactProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = COPY[safeLang];

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#27301d]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          mx-auto w-full max-w-[1120px]
          px-5 pb-16 pt-32
          sm:px-8
          md:pt-36
          lg:px-10 lg:pb-20
        "
      >
        {/* Page Header */}
        <motion.header
          variants={fadeUpVariants}
          className="mb-9 max-w-2xl md:mb-11"
        >
          <h1 className="text-3xl font-normal tracking-tight sm:text-4xl md:text-[2.8rem]">
            {copy.title}
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#657054]">
            {copy.description}
          </p>
        </motion.header>

        {/* Main Layout */}
        <div className="grid gap-11 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-18">
          {/* ---------------------------------------------------------------- */}
          {/* Contact Form                                                     */}
          {/* ---------------------------------------------------------------- */}

          <motion.section variants={fadeUpVariants}>
            <div className="mb-6">
              <h2 className="text-xl font-normal">{copy.formTitle}</h2>

              <div className="mt-4 border-l-2 border-[#b8953b] bg-[#eee7d8]/70 px-4 py-3">
                <p className="text-sm leading-6 text-[#626a54]">
                  {copy.formNotice}
                </p>
              </div>
            </div>

            <form className="space-y-5">
              <FormField
                id="contact-name"
                label={copy.nameLabel}
                placeholder={copy.namePlaceholder}
              />

              <FormField
                id="contact-email"
                label={copy.emailLabel}
                placeholder={copy.emailPlaceholder}
                type="email"
              />

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2.5 block text-sm font-medium"
                >
                  {copy.messageLabel}
                </label>

                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder={copy.messagePlaceholder}
                  disabled
                  className="
                    w-full cursor-not-allowed resize-none
                    border border-[#27301d]/15
                    bg-[#eee9dd]/40
                    px-4 py-3.5
                    text-[15px] leading-7
                    text-[#27301d]/60
                    outline-none
                    placeholder:text-[#7b836d]/45
                  "
                />
              </div>

              <button
                type="button"
                disabled
                className="
                  inline-flex cursor-not-allowed
                  items-center gap-3
                  bg-[#27301d]/65
                  px-6 py-3.5
                  text-sm font-medium
                  text-[#fffaf0]/85
                "
              >
                {copy.submit}
                <FaArrowRight size={11} />
              </button>
            </form>
          </motion.section>

          {/* ---------------------------------------------------------------- */}
          {/* Direct Contact                                                   */}
          {/* ---------------------------------------------------------------- */}

          <motion.aside
            variants={fadeUpVariants}
            className="
              border-t border-[#27301d]/15 pt-8
              lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-12
            "
          >
            {/* Email */}
            <section>
              <span
                className="
                  flex size-10 items-center justify-center
                  border border-[#27301d]/20
                  bg-[#eee7d8]
                "
              >
                <FaEnvelope size={14} />
              </span>

              <h2 className="mt-6 text-xl font-normal">{copy.directTitle}</h2>

              <p className="mt-3 max-w-sm text-sm leading-7 text-[#657054]">
                {copy.directBody}
              </p>

              <a
                href={`mailto:${copy.email}`}
                className="
                  group mt-6 inline-flex
                  items-center gap-3
                  text-sm font-medium
                  text-[#27301d]
                  no-underline
                  transition-colors
                  hover:text-[#927322]
                "
              >
                {copy.email}

                <FaArrowRight
                  size={10}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </section>

            {/* Social Links */}
            <section className="mt-10 border-t border-[#27301d]/15 pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#927322]">
                {copy.socialTitle}
              </p>

              <div className="mt-5 space-y-3">
                <SocialLink
                  href={copy.facebookUrl}
                  icon={<FaFacebook size={15} />}
                  title={copy.facebook}
                  subtitle={copy.facebookAction}
                />

                <SocialLink
                  href={copy.linkedinUrl}
                  icon={<FaLinkedin size={16} />}
                  title={copy.linkedin}
                  subtitle={copy.linkedinAction}
                />
              </div>
            </section>
          </motion.aside>
        </div>
      </motion.div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Form Field                                     */
/* -------------------------------------------------------------------------- */

type FormFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
};

function FormField({ id, label, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled
        className="
          w-full cursor-not-allowed
          border border-[#27301d]/15
          bg-[#eee9dd]/40
          px-4 py-3.5
          text-[15px]
          text-[#27301d]/60
          outline-none
          placeholder:text-[#7b836d]/45
        "
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Social Link                                   */
/* -------------------------------------------------------------------------- */

type SocialLinkProps = {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
};

function SocialLink({ href, icon, title, subtitle }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-4 py-1
        text-[#27301d]
        no-underline
        transition-colors
        hover:text-[#927322]
      "
    >
      <span
        className="
          flex size-10 shrink-0 items-center justify-center
          border border-[#27301d]/20
          bg-[#eee7d8]
          transition-colors
          group-hover:border-[#927322]/50
        "
      >
        {icon}
      </span>

      <div>
        <span className="block text-sm font-medium">{title}</span>

        <span className="mt-0.5 block text-xs text-[#717a63]">{subtitle}</span>
      </div>

      <FaArrowRight
        size={9}
        className="
          ml-auto opacity-50
          transition-all
          group-hover:translate-x-1
          group-hover:opacity-100
        "
      />
    </a>
  );
}

export default memo(Contact);
