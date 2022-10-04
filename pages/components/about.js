import React from "react";
import { getSession } from "next-auth/react";
import { Router } from "react-router-dom";

import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
} from "@heroicons/react/solid";

const features = [
  {
    name: "Free and easy to use",
    description:
      "OnSchedule is free to use. We don't charge you for using our service. Easy to use calendar that allows you to add events and view them in a variety of ways.",
  },
  {
    name: "Version 1.0",
    description:
      "This is the first version of OnSchedule. We are working on adding more features and improving the user experience. Functionality for adding events is only available for monthly and daily views until the next versioning update.",
  },
  {
    name: "Mobile Friendly",
    description:
      "OnSchedule is mobile friendly. You can use it on your phone or tablet or browser. We are working on adding a mobile app in the future.",
  },
  {
    name: "Open Source",
    description:
      "OnSchedule is open source. You can view the source code on GitHub. Feel free to contribute to the project.",
  },
];

const About = () => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">OnSchedule</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Calendar for your life
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Thank you for using OnSchedule. We hope you enjoy it!
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
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
