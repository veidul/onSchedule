import React from "react";
import { getSession } from "next-auth/react";
import { Router } from "react-router-dom";
const About = () => {
  return <div>ABOUT SECTION</div>;
};
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default About;
