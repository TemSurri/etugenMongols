import { editEventModalCopy } from "../../content/EditEventModalCopy";
import EditEventFields from "./EditEventFields";

import { useEffect } from "react";
import { useDialogFocus } from "../../../../components/useDialogFocus";

import { AnimatePresence, motion } from "framer-motion";

import { useEditEvent, type EditEventOptions } from "../../hooks/useEditEvent";
export default function EditEventModal(props: EditEventOptions) {
  const { event, onClose, lang } = props;
  const dialogRef = useDialogFocus(true);
  const editor = useEditEvent(props);
  const { saving, error, saveChanges } = editor;
  useEffect(() => {
    const previous = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape" && !saving) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, saving]);
  return (
    <AnimatePresence>
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
        transition={{
          duration: 0.16,
        }}
        className="
                    fixed
                    inset-x-0
                    bottom-0
                    top-24
                    z-[110]
                    flex
                    items-center
                    justify-center
                    overflow-y-auto
                    bg-[#172011]/65
                    p-4

                    sm:p-6
                "
        onMouseDown={(mouseEvent) => {
          if (mouseEvent.target === mouseEvent.currentTarget && !saving) {
            onClose();
          }
        }}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={lang === "mn" ? event.titleMn : event.titleEn}
          tabIndex={-1}
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.18,
          }}
          className="
                        flex
                        max-h-[calc(100vh-7rem)]
                        w-full
                        max-w-4xl
                        flex-col
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#27301d]/10
                        bg-[#fffdf8]
                        shadow-2xl
                    "
        >
          <header
            className="
                            flex
                            shrink-0
                            items-start
                            justify-between
                            gap-5
                            border-b
                            border-[#27301d]/10
                            px-6
                            py-5

                            sm:px-7
                        "
          >
            <div className="min-w-0">
              <p
                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#9a7b26]
                                "
              >
                {editEventModalCopy[lang].eventManagement}
              </p>

              <h2
                className="
                                    mt-1
                                    text-xl
                                    font-semibold
                                    tracking-tight
                                    text-[#27301d]
                                "
              >
                {editEventModalCopy[lang].editEvent}
              </h2>

              <p
                className="
                                    mt-1
                                    truncate
                                    text-sm
                                    text-[#667056]
                                "
              >
                {lang === "mn" ? event.titleMn : event.titleEn}
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              aria-label="Close"
              className="
                                shrink-0
                                rounded-lg
                                px-3
                                py-2
                                text-lg
                                leading-none
                                text-[#667056]
                                transition-colors
                                duration-150
                                hover:bg-[#f1ecdf]
                                hover:text-[#27301d]
                                disabled:opacity-40
                            "
            >
              ×
            </button>
          </header>

          <div
            className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            px-6
                            py-5

                            sm:px-7
                        "
          >
            <EditEventFields editor={editor} lang={lang} />
          </div>

          <footer
            className="
                            shrink-0
                            border-t
                            border-[#27301d]/10
                            bg-[#fffdf8]
                            px-6
                            py-4

                            sm:px-7
                        "
          >
            {error && (
              <p
                className="
                                    mb-3
                                    text-sm
                                    text-[#8b4a42]
                                "
              >
                {error}
              </p>
            )}

            <div
              className="
                                flex
                                items-center
                                justify-end
                                gap-2
                            "
            >
              <button
                type="button"
                disabled={saving}
                onClick={onClose}
                className="
                                    rounded-lg
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-[#667056]
                                    transition-colors
                                    duration-150
                                    hover:bg-[#f1ecdf]
                                    hover:text-[#27301d]
                                    disabled:opacity-50
                                "
              >
                {editEventModalCopy[lang].cancel}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={saveChanges}
                className="
                                    rounded-lg
                                    bg-[#27301d]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition-colors
                                    duration-150
                                    hover:bg-[#3b472d]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
              >
                {saving
                  ? editEventModalCopy[lang].saving
                  : editEventModalCopy[lang].saveChanges}
              </button>
            </div>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
