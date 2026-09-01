"use client";

import {
  useState
} from "react";

import {
  motion
} from "framer-motion";

import AdminSidebar
  from "./components/AdminSidebar";
  
import AdminOverview
  from "./components/AdminOverview";

import AdminEvents
  from "./components/events/AdminEvents";
import {
  useAdminEvents
} from "./hooks/useAdminEvents";

import type {
  AdminSection
} from "./types";


export default function AdminDashboard() {

  const [
    section,
    setSection
  ] =
    useState<AdminSection>(
      "overview"
    );


  const adminEvents =
    useAdminEvents();


  return (
    <main className="min-h-screen bg-[#f6efdf] pt-20 text-[#303824]">

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">

        <div className="mb-8">

          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#92752b]">
            Etugen Mongols
          </p>

          <h1 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#59604d]">
            Manage organization events and administrative content.
          </p>

        </div>


        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

          <AdminSidebar
            section={section}
            onChange={setSection}
          />


          <motion.section
            key={section}
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.25
            }}
            className="min-w-0"
          >

            {section === "overview" && (

              <AdminOverview
                events={
                  adminEvents.events
                }
                publishedCount={
                  adminEvents.publishedCount
                }
                draftCount={
                  adminEvents.draftCount
                }
                loading={
                  adminEvents.loading
                }
              />

            )}


            {section === "events" && (

              <AdminEvents
                events={
                  adminEvents.events
                }
                loading={
                  adminEvents.loading
                }
                error={
                  adminEvents.error
                }
                createEvent={
                  adminEvents.createEvent
                }
                updateEvent={
                  adminEvents.updateEvent
                }
              />

            )}

          </motion.section>

        </div>

      </div>

    </main>
  );
}