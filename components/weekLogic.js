import filterDays from "../helpers/filterDays";
import { format } from "date-fns";
import Link from "next/link";
export default function WeekLogic({ dbEvents, newDays }) {
  function getWeekEvents() {
    const weekEvents = [];
    for (let i = 0; i < newDays.length; i++) {
      let day = newDays[i];
      weekEvents.push(
        dbEvents.filter((meeting) =>
          filterDays(meeting.dateTime, format(day, "MMM dd, yyy"))
        )
      );
    }
    return weekEvents;
  }
  const weekArr = getWeekEvents();
  return (
    <>
      {weekArr[0].length > 0 ? (
        weekArr[0].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-0`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[1].length > 0 ? (
        weekArr[1].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-1`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[2].length > 0 ? (
        weekArr[2].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-2`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[3].length > 0 ? (
        weekArr[3].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-3`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[4].length > 0 ? (
        weekArr[4].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-4`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[5].length > 0 ? (
        weekArr[5].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-5`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
      {weekArr[6].length > 0 ? (
        weekArr[6].map((meeting) => (
          <>
            <li
              className={`relative mt-px flex sm:col-start-6`}
              key={meeting.id}
              style={{
                gridRowStart: `${(meeting.start.id - 0.5) * 4}`,
                gridRowEnd: `${(meeting.end.id - 0.5) * 4}`,
              }}
            >
              <Link href="#">
                <a
                  className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-teal-50 p-2 text-xs leading-5 hover:bg-teal-100`}
                >
                  <p className={`order-1 font-semibold text-teal-700`}>
                    {meeting.details}
                  </p>
                  <p className={`text-teal-500 group-hover:text-teal-700`}>
                    {meeting.start.time} - {meeting.end.time}
                  </p>
                </a>
              </Link>
            </li>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
