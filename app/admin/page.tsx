import { redirect } from "next/navigation";

const AdminPage = () => {
  redirect("/admin/statistiques");
  return <div className="flex">ADMIN</div>;
};

export default AdminPage;
