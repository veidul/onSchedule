import React from "react";
const Daily = () => {
  const hours = [
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "Noon",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "Midnight",
  ];

  return (
    <div className="flex-box width-max height-max border-2 border-black">
      <h1 className="border-2 border-black h-fit w-screen text-center">
        Daily SECTION
      </h1>
      <div>
        <ul>
          {hours.map((a) => (
            <li>
              <div className="width-max border-2 border-black">{a}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Daily;
