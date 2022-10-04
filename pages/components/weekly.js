import { Fragment, useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import getEvents from "../../helpers/getEvents";
import filterDays from "../../helpers/filterDays";
import HeadlessSlideOver from "./addEvent.js";
import { times } from "../../helpers/times.js";
import WeekLogic from "./weekLogic";

import {
  format,
  startOfToday,
  eachDayOfInterval,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isToday,
  isSameMonth,
  parseISO,
  isEqual,
  getDay,
  parse,
  add,
  isSameDay,
} from "date-fns";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Weekly() {
  const [dbEvents, setDbEvents] = useState([]);
  const [addEventState, setAddEventState] = useState({});
  let today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let newDays = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });
  console.log(newDays, "newDays");
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function getWeekEvents() {
    let weekEvents = [];
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

  // gonna have to fix this logic to get all the events for the week
  // let selectedDayMeetings = dbEvents.filter((meeting) =>
  //   filterDays(meeting.dateTime, format(selectedDay, "MMM dd, yyy"))
  // );
  let [open, setOpen] = useState(false);
  useEffect(() => {
    getEvents().then((data) => {
      setDbEvents([...data]);
    });
  }, []);
  useEffect(() => {
    getEvents().then((data) => {
      setDbEvents([...data]);
    });
  }, [addEventState]);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

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
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="2022-01">{format(today, "MMMM yyy")}</time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              {format(newDays[0], "MMM d") +
                " - " +
                format(newDays[6], "MMM d")}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="md:hidden border-t border-b border-gray-300 bg-white py-2 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              {format(newDays[0], "MMM d") +
                " - " +
                format(newDays[6], "MMM d")}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
            <HeadlessSlideOver
              setAddEventState={setAddEventState}
              open={open}
              setOpen={setOpen}
              dateTime={format(today, "MMM dd, yyy")}
            />
          </div>
        </div>
      </header>
      <div
        ref={container}
        className="flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {newDays.map((day) => (
                <>
                  <button
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    {format(new Date(day), "eee")}{" "}
                    <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                      {format(day, "d")}
                    </span>
                  </button>
                </>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {newDays.map((day) => (
                <div
                  key={day.toString()}
                  className="flex items-center justify-center py-3"
                >
                  <span
                    className={
                      isEqual(day, today)
                        ? "items-center justify-center font-semibold text-white bg-indigo-600"
                        : "items-center justify-center font-semibold text-gray-900"
                    }
                  >
                    {format(new Date(day), "eee")}{" "}
                    <span
                      className={
                        isEqual(day, today)
                          ? "items-center justify-center font-semibold text-white bg-indigo-600"
                          : "items-center justify-center font-semibold text-gray-900"
                      }
                    >
                      {format(day, "d")}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
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
                      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {time}
                      </div>
                    </div>
                    <div />
                  </>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "7rem repeat(92, minmax(0, 1fr)) auto",
                }}
              >
                <WeekLogic dbEvents={dbEvents} newDays={newDays} />
              </ol>
            </div>
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
