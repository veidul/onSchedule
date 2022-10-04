import { getSession } from "next-auth/react";
const getEvents = async () => {
  const session = await getSession();
  const res = await fetch("/api/auth/eventState", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session.user.email),
  });
  const data = await res.json();
  return data;
};
export default getEvents;
