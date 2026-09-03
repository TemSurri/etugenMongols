"use client";

import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/useAuth";

import {
  useLanguage
} from "../context/LanguageContext";

import Header
  from "../sections/home/Header";

import AdminDashboard
  from "../sections/admin/AdminDashboard";


export default function AdminPage() {

  const {
    user
  } =
    useAuth();


  const {
    lang,
    setLang
  } =
    useLanguage();


  if (
    !user ||
    user.role !== "ADMIN"
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return (
    <>
      <Header
        lang={lang}
        setLang={setLang}
      />

      <AdminDashboard />
    </>
  );
}