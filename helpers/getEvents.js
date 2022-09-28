import { getSession } from "next-auth/react";
const getEvents = async () => {
  const session = await getSession();
  if (session) {
    console.log(session.user.email);
  }
  const res = await fetch("/api/auth/eventState", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session.user.email),
  });
  const data = await res.json();
  console.log(data, "data from getEvents");
  return data;
};
export default getEvents;
