import { getAllUsers } from "./actions/users";

export default async function Home() {
  const users = await getAllUsers();

  return (
    <div className="">
      <main className="">
        <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
