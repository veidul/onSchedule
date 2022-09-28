import { useSession, getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function LoginLogoutBtn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <a
          href="/auth/login"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >
          Login
        </a>
      </div>
    );
  }
  return (
    <div>
      <a
        onClick={() => signOut()}
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >
        Logout
      </a>
    </div>
  );
}
