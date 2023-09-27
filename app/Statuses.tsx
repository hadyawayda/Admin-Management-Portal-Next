import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const statuses = [
  { name: 'Todo' },
  { name: 'Doing' },
  { name: 'Done' },
]

export default function Statuses() {
  const [status, setStatus] = useState(statuses[0])
  return (
    <div className="w-full">
      <Listbox value={status} onChange={setStatus}>
        <div className="relative mt-1">
          <Listbox.Button className="relative border-gray-500 border-opacity-30 border-solid border-2 rounded-md h-11  w-full cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 sm:text-sm">
            <span className="block truncate">{status.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <svg width="16" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" /></svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {statuses.map((status, statusIdx) => (
                <Listbox.Option
                  key={statusIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-500' : 'text-gray-900'
                    }`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {status.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
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
      </Listbox>
    </div>
  )
}
