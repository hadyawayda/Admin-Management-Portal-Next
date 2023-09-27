import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import './App.css'
import Main from './Body'
import Form from './Form'

type Subtasks = {
  title: string,
  isCompleted: boolean,
}

type Tasks = {
  title: string,
  description: string,
  subtasks: Subtasks[],
  status: string,
}

type Columns = {
  name: string,
  tasks: Tasks[],
}

type Boards = {
  name: string,
  columns: Columns[],
}

export default function Home() {

  const [boards, setBoards] = useState<Boards[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [createTask, setCreateTask] = useState(false);
  const [activeBoard, setActiveBoard] = useState(0);


  async function getData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    setBoards(data.boards);
    // setSelectedBoard(data.boards[0].name)
  }

  useEffect(() => {
    getData();
  }, [])

  function handleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex justify-between h-screen w-full tasks">
      <div
        tabIndex={!isSidebarOpen ? 0 : -1}
        onClick={!isSidebarOpen ? handleSidebar : undefined}
        className={`flex flex-col justify-between w-80 sm:w-80 border-r-2 
        border-r-gray-600 border-opacity-40 transition-all sidebar
        ${isSidebarOpen ? '' : 'hover:bg-indigo-600 sidebar-open'}`
        }>
        <div className='flex flex-col'>
          <div className='flex flex-col mb-6 justify-between h-20 px-12'>
            <h1 className='pt-6 text-4xl text-white'>Kanban</h1>
          </div>
          <div className='py-3 px-6 sm:px-12 spacing'>ALL BOARDS ({boards.length})</div>
          <div className='flex flex-col items-start pr-6'>
            {boards.map((board, index) => (
              <button
                key={index}
                tabIndex={0}
                onClick={() => setActiveBoard(index)}
                className={`buttons py-3 pl-6 sm:pl-12 text-left w-full 
                  rounded-r-full transition-all duration-300 ${activeBoard === index ? "boards" : ""}`}>
                {board.name}
              </button>
            ))}
          </div>
          <div>
            <button className='py-3 pl-6 sm:pl-12'>+ Create New Board</button>
          </div>
        </div>
        <div className='flex flex-col justify-between h-30'>
          <div className='h-12 toggle text-center mx-6 rounded-md py-3'>Toggle Dark Mode</div>
          <button onClick={handleSidebar} className='h-20 text text-center py-4'>Hide Sidebar</button>

        </div>
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between h-24 w-full p-6 border-b border-gray-600 tasks">
          <div className='px-2.5 py-2 text-xl font-semibold'>
            {boards[activeBoard]?.name}
          </div>
          <button type='button' className='boards rounded-full px-6' onClick={() => setCreateTask(true)}>
            + Add new task
          </button>
        </div>
        <Main activeBoard={activeBoard} />
      </div>
      <Transition appear show={createTask} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setCreateTask(false)}>
          <Form />
        </Dialog>
      </Transition>
    </div>
  )
}
