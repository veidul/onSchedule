import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDoubleDownIcon } from "@heroicons/react/solid";

const times = [
  { id: 0, time: "Midnight" },
  { id: 1, time: "1:00 AM" },
  { id: 2, time: "2:00 AM" },
  { id: 3, time: "3:00 AM" },
  { id: 4, time: "4:00 AM" },
  { id: 5, time: "5:00 AM" },
  { id: 6, time: "6:00 AM" },
  { id: 7, time: "7:00 AM" },
  { id: 8, time: "8:00 AM" },
  { id: 9, time: "9:00 AM" },
  { id: 10, time: "10:00 AM" },
  { id: 11, time: "11:00 AM" },
  { id: 12, time: "Noon" },
  { id: 13, time: "1:00 PM" },
  { id: 14, time: "2:00 PM" },
  { id: 15, time: "3:00 PM" },
  { id: 16, time: "4:00 PM" },
  { id: 17, time: "5:00 PM" },
  { id: 18, time: "6:00 PM" },
  { id: 19, time: "7:00 PM" },
  { id: 20, time: "8:00 PM" },
  { id: 21, time: "9:00 PM" },
  { id: 22, time: "10:00 PM" },
  { id: 23, time: "11:00 PM" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function timeDropDown({ start }) {
  const [selected, setSelected] = useState(times[12]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Time event {start ? "starts" : "ends"}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.time}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDoubleDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {times.map((time) => (
                  <Listbox.Option
                    key={time.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={time}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {time.time}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
