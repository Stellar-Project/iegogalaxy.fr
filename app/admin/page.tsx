import SideBar from "@/components/shared/SideBar";

const AdminPage = () => {
  const user = {
    username: "Rinzler",
    role: "admin",
    avatar: "/avatar/avatar.jpg",
  };

  return (
    <div className="flex">
      <SideBar user={user} />
    </div>
  );
};

export default AdminPage;
