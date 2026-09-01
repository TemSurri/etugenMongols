import type {
  AdminSection
} from "../types";


type Props = {
  section: AdminSection;

  onChange:
    (
      section:
        AdminSection
    ) => void;
};


export default function AdminSidebar({
  section,
  onChange
}: Props) {

  return (
    <aside className="h-fit border border-[#d7caa8] bg-[#fffaf0] p-3 lg:sticky lg:top-28">

      <nav
        aria-label="Admin navigation"
        className="space-y-1"
      >

        <SidebarButton
          active={
            section ===
            "overview"
          }
          onClick={() =>
            onChange(
              "overview"
            )
          }
        >
          Overview
        </SidebarButton>


        <SidebarButton
          active={
            section ===
            "events"
          }
          onClick={() =>
            onChange(
              "events"
            )
          }
        >
          Events
        </SidebarButton>

      </nav>

    </aside>
  );
}


function SidebarButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
        active
          ? "bg-[#303824] text-[#fffaf0]"
          : "text-[#59604d] hover:bg-[#eee4ca]"
      }`}
    >
      {children}
    </button>
  );
}