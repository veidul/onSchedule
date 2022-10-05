import React from "react";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { getSession } from "next-auth/react";
import TimeDropDown from "./timeDropDown";

function TextBox({ setEventDetails }) {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Event details
      </label>
      <div className="mt-1">
        <textarea
          onChange={(e) => {
            setEventDetails(e.target.value);
          }}
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={""}
        />
      </div>
    </div>
  );
}

export default function HeadlessSlideOver({
  open,
  setOpen,
  dateTime,
  setAddEventState,
}) {
  //plan is to get all this data then send to backend to be stored in db
  //we will also need the user id to add to the object to save in db
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  async function onEventSubmit() {
    const session = await getSession();
    const event = {
      email: session.user.email,
      dateTime: dateTime,
      start: startTime,
      end: endTime,
      details: eventDetails,
    };
    const res = await fetch("/api/auth/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data = await res.json();
    setAddEventState(data);
    setOpen(false);
  }

  return (
    <Transition.Root show={open ? open : false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                show={open ? open : false}
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Add an Event for {dateTime}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <TimeDropDown
                        start={true}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                      />
                      <TimeDropDown
                        start={false}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                      />
                      <TextBox setEventDetails={setEventDetails} />
                      {/* /End replace */}
                    </div>
                    <button
                      type="button"
                      onClick={onEventSubmit}
                      className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
