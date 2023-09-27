import { useEffect, useState } from "react";

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

function Main(props: { activeBoard: number }) {
  const { activeBoard } = props;
  const [boards, setBoards] = useState<Boards[]>([]);

  async function getData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    console.log(data.boards[1].columns);
    setBoards(data.boards);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="flex flex-row justify-around h-full body-bg">
      <div className="flex flex-row w-full h-full justify-between mt-2 px-2">
        {boards[activeBoard]?.columns.map((column) => (
          <div className="w-60 mx-3">
            <div className="flex w-28 justify-start items-center py-4">
              <div className={`w-4 h-4 rounded-full 
                  ${column.name === 'Todo' ? ' bg-cyan-300'
                  : column.name === 'Doing' ? ' boards'
                    : column.name === 'Done' ? ' bg-emerald-300'
                      : column.name === 'Now' ? ' bg-cyan-300'
                        : column.name === 'Next' ? ' boards'
                          : column.name === 'Later' ? ' bg-emerald-300' : ''}
                  `}>
              </div>
              <div className="ml-3 flex justify-start tracking-widest text-sm text-gray-400 font-medium">
                <div>
                  {column.name.toUpperCase()}
                </div>
                <div className="ml-2">
                  ({column.tasks.length})
                </div>
              </div>
            </div>
            <div>
              {column.tasks.map((task) => (
                <div className="flex flex-col tasks p-4 my-3 rounded-md font-semibold text-sm">
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;