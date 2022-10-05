import { Fragment, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { getSession } from "next-auth/react";
import filterDays from "../helpers/filterDays.js";
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
import HeadlessSlideOver from "../components/addEvent.js";
import getEvents from "../helpers/getEvents.js";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Monthly() {
  const [dbEvents, setDbEvents] = useState([]);
  const [addEventState, setAddEventState] = useState({});
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [open, setOpen] = useState(false);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });
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

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  let selectedDayMeetings = dbEvents.filter((meeting) =>
    filterDays(meeting.dateTime, format(selectedDay, "MMM dd, yyy"))
  );

  return (
    <div className="pt-16 pl-16">
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div className="md:pr-14">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="mt-2 grid grid-cols-7 text-sm">
            {newDays.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-2"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-indigo-600",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-indigo-600",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) && "hover:bg-gray-200",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
                <div className="w-1 h-1 mx-auto mt-1">
                  {dbEvents.some((meeting) =>
                    isSameDay(parseISO(meeting.dateTime), day)
                  ) && <div className="w-1 h-1 rounded-full bg-sky-500"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-12 md:mt-0 md:pl-14">
          <div className="flex mx-4">
            <h2 className="font-semibold text-gray-900">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <button
              type="button"
              className="ml-24 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setOpen(true)}
            >
              Add event
            </button>
            <HeadlessSlideOver
              setAddEventState={setAddEventState}
              open={open}
              setOpen={setOpen}
              dateTime={format(selectedDay, "MMM dd, yyy")}
            />
          </div>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
            {dbEvents.length > 0 ? (
              selectedDayMeetings.map((meeting) => (
                <Meeting meeting={meeting} key={meeting._id} />
              ))
            ) : (
              <p> No events for today.</p>
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
function Meeting({ meeting }) {
  return (
    <li
      key={meeting._id}
      className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-100"
    >
      <div className="flex-auto">
        <p className="text-gray-900">Starts: {meeting.start.time}</p>
        <p className="mt-0.5">Ends: {meeting.end.time}</p>
        <p className="mt-0.5">Event Details: {meeting.details}</p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link href="#">
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Edit
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="#">
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Cancel
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
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
