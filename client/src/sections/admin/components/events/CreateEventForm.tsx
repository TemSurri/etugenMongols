"use client";

import {
  useState,
  type FormEvent
} from "react";

import type {
  ApiEvent,
  EventCreateRequest
} from "../../types";


type Props = {
  onCreate:
    (
      request:
        EventCreateRequest
    ) => Promise<ApiEvent>;

  onCancel: () => void;
};


export default function CreateEventForm({
  onCreate,
  onCancel
}: Props) {

  const [
    saving,
    setSaving
  ] =
    useState(false);


  const [
    error,
    setError
  ] =
    useState(false);


  const [
    registerable,
    setRegisterable
  ] =
    useState(false);


  async function submit(
    event:
      FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const form =
      new FormData(
        event.currentTarget
      );


    const registrationDollars =
      String(
        form.get(
          "registrationCost"
        ) ?? ""
      );


    const request:
      EventCreateRequest = {

        slug:
          String(
            form.get("slug")
          ).trim(),

        titleEn:
          String(
            form.get("titleEn")
          ).trim(),

        titleMn:
          String(
            form.get("titleMn")
          ).trim(),

        descriptionEn:
          String(
            form.get(
              "descriptionEn"
            )
          ).trim(),

        descriptionMn:
          String(
            form.get(
              "descriptionMn"
            )
          ).trim(),

        startsAt:
          new Date(
            String(
              form.get(
                "startsAt"
              )
            )
          ).toISOString(),

        endsAt:
          form.get("endsAt")
            ? new Date(
                String(
                  form.get(
                    "endsAt"
                  )
                )
              ).toISOString()
            : null,

        location:
          String(
            form.get(
              "location"
            )
          ).trim(),

        registerable,

        registrationCost:
          registerable
            ? Math.round(
                Number(
                  registrationDollars
                ) * 100
              )
            : null,

        coverImage:
          nullableString(
            form.get(
              "coverImage"
            )
          ),

        coverImageAltEn:
          nullableString(
            form.get(
              "coverImageAltEn"
            )
          ),

        coverImageAltMn:
          nullableString(
            form.get(
              "coverImageAltMn"
            )
          ),

        contactEmail:
          nullableString(
            form.get(
              "contactEmail"
            )
          ),

        contactPhone:
          nullableString(
            form.get(
              "contactPhone"
            )
          ),
      };


    try {

      setSaving(true);
      setError(false);


      await onCreate(
        request
      );


      onCancel();

    } catch {

      setError(true);

    } finally {

      setSaving(false);
    }
  }


  return (
    <form
      onSubmit={submit}
      className="border border-[#d7caa8] bg-[#fffaf0] p-6 sm:p-8"
    >

      <div className="mb-7">

        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#92752b]">
          New Event
        </p>

        <h3 className="mt-2 text-2xl font-normal tracking-tight">
          Create Event
        </h3>

        <p className="mt-2 text-sm text-[#59604d]">
          New events are created as drafts.
        </p>

      </div>


      <div className="grid gap-5 md:grid-cols-2">

        <Field
          name="slug"
          label="Slug"
          placeholder="naadam-2026"
          required
        />


        <Field
          name="location"
          label="Location"
          placeholder="Calgary, Alberta"
          required
        />


        <Field
          name="titleEn"
          label="English Title"
          required
        />


        <Field
          name="titleMn"
          label="Mongolian Title"
          required
        />


        <div className="md:col-span-2">

          <TextArea
            name="descriptionEn"
            label="English Description"
            required
          />

        </div>


        <div className="md:col-span-2">

          <TextArea
            name="descriptionMn"
            label="Mongolian Description"
            required
          />

        </div>


        <Field
          name="startsAt"
          label="Starts At"
          type="datetime-local"
          required
        />


        <Field
          name="endsAt"
          label="Ends At"
          type="datetime-local"
        />


        <Field
          name="coverImage"
          label="Cover Image"
          placeholder="/upcoming_event_assets/event.webp"
        />


        <Field
          name="coverImageAltEn"
          label="English Image Alt"
        />


        <Field
          name="coverImageAltMn"
          label="Mongolian Image Alt"
        />


        <Field
          name="contactEmail"
          label="Contact Email"
          type="email"
        />


        <Field
          name="contactPhone"
          label="Contact Phone"
        />

      </div>


      <div className="mt-6 border-t border-[#ddd0af] pt-6">

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={
              registerable
            }
            onChange={
              event =>
                setRegisterable(
                  event.target.checked
                )
            }
            className="h-4 w-4 accent-[#303824]"
          />

          <span className="text-sm text-[#4e593c]">
            Registration enabled
          </span>

        </label>


        {registerable && (

          <div className="mt-4 max-w-xs">

            <Field
              name="registrationCost"
              label="Registration Cost (CAD)"
              type="number"
              placeholder="20.00"
              step="0.01"
              min="0"
              required
            />

          </div>

        )}

      </div>


      {error && (

        <p className="mt-5 text-sm text-[#8a4d42]">
          Could not create the event.
        </p>

      )}


      <div className="mt-7 flex flex-wrap gap-3">

        <button
          type="submit"
          disabled={saving}
          className="bg-[#303824] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#fffaf0] transition hover:bg-[#414c31] disabled:opacity-50"
        >
          {saving
            ? "Creating..."
            : "Create Event"}
        </button>


        <button
          type="button"
          onClick={onCancel}
          className="border border-[#b8aa84] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6f591f]"
        >
          Cancel
        </button>

      </div>

    </form>
  );
}


function nullableString(
  value: FormDataEntryValue | null
) {

  const string =
    String(
      value ?? ""
    ).trim();

  return string.length > 0
    ? string
    : null;
}


type FieldProps = {
  name: string;
  label: string;

  type?: string;
  placeholder?: string;

  required?: boolean;

  step?: string;
  min?: string;
};


function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  step,
  min
}: FieldProps) {

  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#92752b]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        placeholder={
          placeholder
        }
        required={
          required
        }
        step={step}
        min={min}
        className="w-full border border-[#cfc19f] bg-white px-4 py-3 text-sm text-[#303824] outline-none transition placeholder:text-[#7c826f]/50 focus:border-[#8d7020]"
      />

    </label>
  );
}


function TextArea({
  name,
  label,
  required
}: {
  name: string;
  label: string;
  required?: boolean;
}) {

  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#92752b]">
        {label}
      </span>

      <textarea
        name={name}
        required={
          required
        }
        rows={5}
        className="w-full resize-y border border-[#cfc19f] bg-white px-4 py-3 text-sm leading-6 text-[#303824] outline-none transition focus:border-[#8d7020]"
      />

    </label>
  );
}