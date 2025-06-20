import {
  getActiveInactiveUsers,
  getNewUsersGroupedBy,
  getTotalUsers,
} from "@/actions/users";

export default async function UserStatPage() {
  const totalUsers = await getTotalUsers();

  const newUsers = await getNewUsersGroupedBy("weekly");

  const activeUsers = await getActiveInactiveUsers(10);
  return (
    <div>
      <p>{totalUsers}</p>
      <p>{JSON.stringify(newUsers)}</p>
      <p>{JSON.stringify(activeUsers)}</p>
    </div>
  );
}
