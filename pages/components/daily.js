import { useEffect, useRef } from "react";
import { getSession } from "next-auth/react";
import { useState } from "react";
import {
  startOfToday,
  format,
  isEqual,
  isToday,
  parse,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  add,
} from "date-fns";
import { times } from "../../helpers/times.js";
import filterDays from "../../helpers/filterDays.js";
import HeadlessSlideOver from "./addEvent.js";
import getEvents from "../../helpers/getEvents.js";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Daily() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [open, setOpen] = useState(false);
  const [dbEvents, setDbEvents] = useState([]);
  const [addEventState, setAddEventState] = useState({});
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  useEffect(() => {
    getEvents().then((data) => {
      setDbEvents([...data]);
    });
  }, []);
  let selectedDayMeetings = dbEvents.filter((meeting) =>
    filterDays(meeting.dateTime, format(selectedDay, "MMM dd, yyy"))
  );
  useEffect(() => {
    getEvents().then((data) => {
      setDbEvents([...data]);
    });
  }, [addEventState]);

  // useEffect(() => {
  //   // Set the container scroll position based on the current time.
  //   const currentMinute = new Date().getHours() * 60;
  //   container.current.scrollTop =
  //     ((container.current.scrollHeight -
  //       containerNav.current.offsetHeight -
  //       containerOffset.current.offsetHeight) *
  //       currentMinute) /
  //     1440;
  // }, []);

  return (
    <div className="flex h-full flex-col">
      <header className="relative flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <div>
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
              {format(selectedDay, "MMM dd, yyy")}
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {format(selectedDay, "MMMM dd, yyy")}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {format(selectedDay, "iiii")}
          </p>
        </div>
        <HeadlessSlideOver
          setAddEventState={setAddEventState}
          open={open}
          setOpen={setOpen}
          dateTime={format(selectedDay, "MMM dd, yyy")}
        />
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-auto overflow-hidden bg-white">
        <div
          ref={container}
          className="flex flex-auto flex-col overflow-auto mt-2"
        >
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                {/* <div ref={containerOffset} className="row-end-1 h-7"></div> */}
                {times.map((time) => (
                  <>
                    <div>
                      <div className="sticky left-0 -mt-1.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {time}
                      </div>
                    </div>
                    <div />
                  </>
                ))}
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows: "7rem repeat(92, minmax(0, 1fr)) auto",
                }}
              >
                {selectedDayMeetings.map((meeting) => (
                  <li
                    className="relative mt-px flex"
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
                        <p
                          className={`text-teal-500 group-hover:text-teal-700`}
                        >
                          {meeting.start.time} - {meeting.end.time}
                        </p>
                      </a>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button
              type="button"
              onClick={previousMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {newDays.map((day, dayIdx) => (
              <button
                key={day.toString()}
                onClick={() => setSelectedDay(day)}
                type="button"
                className={classNames(
                  "py-1.5 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (isEqual(day, selectedDay) || isEqual(day, today)) &&
                    "font-semibold",
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    !isToday(day) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    !isToday(day) &&
                    "text-gray-400",
                  isToday(day) &&
                    !isEqual(day, selectedDay) &&
                    "text-indigo-600"
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={classNames(
                    "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-indigo-600",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900"
                  )}
                >
                  {format(day, "d")}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
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
