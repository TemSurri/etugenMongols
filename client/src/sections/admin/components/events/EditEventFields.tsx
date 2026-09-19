import type { Lang } from "../../../../context/language";
import { editEventModalCopy } from "../../content/EditEventModalCopy";
import type { useEditEvent } from "../../hooks/useEditEvent";
import { inputClasses } from "../../model/eventEditorUtils";
import { Field, FormSection, Input, TextArea } from "./EventEditorFields";
type Props = { editor: ReturnType<typeof useEditEvent>; lang: Lang };
export default function EditEventFields({ editor, lang }: Props) {
  const {
    titleEn,
    setTitleEn,
    titleMn,
    setTitleMn,
    descriptionEn,
    setDescriptionEn,
    descriptionMn,
    setDescriptionMn,
    startsAt,
    setStartsAt,
    endsAt,
    setEndsAt,
    location,
    setLocation,
    registerable,
    setRegisterable,
    registrationDollars,
    setRegistrationDollars,
    coverImage,
    setCoverImage,
    coverImageAltEn,
    setCoverImageAltEn,
    coverImageAltMn,
    setCoverImageAltMn,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
  } = editor;
  return (
    <div className="space-y-7">
      <FormSection title={editEventModalCopy[lang].eventInformation}>
        <div
          className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
        >
          <Field label="English title" required>
            <Input value={titleEn} onChange={setTitleEn} />
          </Field>

          <Field label="Монгол гарчиг" required>
            <Input value={titleMn} onChange={setTitleMn} />
          </Field>

          <Field label="English description" required>
            <TextArea value={descriptionEn} onChange={setDescriptionEn} />
          </Field>

          <Field label="Монгол тайлбар" required>
            <TextArea value={descriptionMn} onChange={setDescriptionMn} />
          </Field>
        </div>
      </FormSection>

      <FormSection title={editEventModalCopy[lang].scheduleLocation}>
        <div
          className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
        >
          <Field label={editEventModalCopy[lang].starts} required>
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(inputEvent) => setStartsAt(inputEvent.target.value)}
              className={inputClasses}
            />
          </Field>

          <Field label={editEventModalCopy[lang].ends}>
            <input
              type="datetime-local"
              value={endsAt}
              onChange={(inputEvent) => setEndsAt(inputEvent.target.value)}
              className={inputClasses}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label={editEventModalCopy[lang].location} required>
              <Input value={location} onChange={setLocation} />
            </Field>
          </div>
        </div>
      </FormSection>

      <FormSection title={editEventModalCopy[lang].registration}>
        <label
          className="
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-3
                                        rounded-lg
                                        border
                                        border-transparent
                                        p-2
                                        transition-colors
                                        duration-150
                                        hover:border-[#27301d]/10
                                        hover:bg-[#f6efdf]/50
                                    "
        >
          <input
            type="checkbox"
            checked={registerable}
            onChange={(inputEvent) =>
              setRegisterable(inputEvent.target.checked)
            }
            className="
                                            h-4
                                            w-4
                                            accent-[#27301d]
                                        "
          />

          <span
            className="
                                            text-sm
                                            font-medium
                                            text-[#27301d]
                                        "
          >
            {editEventModalCopy[lang].allowRegistrationForThisEvent}
          </span>
        </label>

        {registerable && (
          <div
            className="
                                            mt-4
                                            max-w-sm
                                        "
          >
            <Field label={editEventModalCopy[lang].registrationCostCad}>
              <input
                type="number"
                min="0"
                step="0.01"
                value={registrationDollars}
                onChange={(inputEvent) =>
                  setRegistrationDollars(inputEvent.target.value)
                }
                className={inputClasses}
              />
            </Field>
          </div>
        )}
      </FormSection>

      <FormSection title={editEventModalCopy[lang].coverImage}>
        {coverImage && (
          <div
            className="
                                            mb-4
                                            h-40
                                            overflow-hidden
                                            rounded-xl
                                            bg-[#27301d]
                                        "
          >
            <img
              src={coverImage}
              alt=""
              className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
            />
          </div>
        )}

        <div
          className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
        >
          <div className="md:col-span-2">
            <Field label="Cover image URL">
              <Input value={coverImage} onChange={setCoverImage} />
            </Field>
          </div>

          <Field label="English alt text">
            <Input value={coverImageAltEn} onChange={setCoverImageAltEn} />
          </Field>

          <Field label="Монгол alt text">
            <Input value={coverImageAltMn} onChange={setCoverImageAltMn} />
          </Field>
        </div>
      </FormSection>

      <FormSection title={editEventModalCopy[lang].contact}>
        <div
          className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
        >
          <Field label={editEventModalCopy[lang].contactEmail}>
            <Input
              type="email"
              value={contactEmail}
              onChange={setContactEmail}
            />
          </Field>

          <Field label={editEventModalCopy[lang].contactPhone}>
            <Input value={contactPhone} onChange={setContactPhone} />
          </Field>
        </div>
      </FormSection>
    </div>
  );
}
