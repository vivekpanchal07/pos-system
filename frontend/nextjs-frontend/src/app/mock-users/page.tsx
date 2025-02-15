import { revalidatePath } from "next/cache";

type MockUser = {
  id: number;
  name: string;
}

export default async function MockUser() {
  const res = await fetch("https://67b06959dffcd88a678926f4.mockapi.io/users");
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server"
    const name = formData.get("name");
    const res =  await fetch("https://67b06959dffcd88a678926f4.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name }),
    });
    const newUser = await res.json();
    console.log(newUser);
    revalidatePath("/mock-users");
  }

  return (
    <div className="py-10">
      <form action={addUser}>
        <input type="text" name="name" required className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </form>
      <div className="grid grid-cols-4 gap-4 py-10">
        {users.map((user: MockUser) => (
          <div key={user.id} className="bg-white shadow-md text-gray-700 p-4 rounded-lg">
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}