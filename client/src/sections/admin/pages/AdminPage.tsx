import { Navigate } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";

import { useLanguage } from "../../../context/useLanguage";

import Header from "../../../components/navigation/SiteHeader";

import AdminDashboard from "../AdminDashboard";

export default function AdminPage() {
  const { user } = useAuth();

  const { lang, setLang } = useLanguage();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <AdminDashboard />
    </>
  );
}
