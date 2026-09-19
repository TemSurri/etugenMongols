import type { ReactNode } from "react";
import { inputClasses } from "../../model/eventEditorUtils";
export function FormSection({
  title,
  children,
}: {
  title: string;

  children: ReactNode;
}) {
  return (
    <section>
      <h3
        className="
                    mb-4
                    border-b
                    border-[#27301d]/10
                    pb-2
                    text-sm
                    font-semibold
                    text-[#27301d]
                "
      >
        {title}
      </h3>

      {children}
    </section>
  );
}

export function Field({
  label,
  required = false,
  children,
}: {
  label: string;

  required?: boolean;

  children: ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[#667056]
                "
      >
        {label}

        {required && <span className="text-[#8b4a42]"> *</span>}
      </span>

      {children}
    </label>
  );
}

export function Input({
  value,
  onChange,
  type = "text",
}: {
  value: string;

  onChange: (value: string) => void;

  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(inputEvent) => onChange(inputEvent.target.value)}
      className={inputClasses}
    />
  );
}

export function TextArea({
  value,
  onChange,
}: {
  value: string;

  onChange: (value: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(inputEvent) => onChange(inputEvent.target.value)}
      rows={4}
      className={`
                ${inputClasses}
                resize-y
            `}
    />
  );
}
