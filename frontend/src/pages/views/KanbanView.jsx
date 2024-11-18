/* eslint-disable react/prop-types */
import TaskCard from '../../components/TaskCard'
import { renderIcon } from '../../utils'

const KanbanView = ({ tasks, onCompleteTask, onEdit, onDelete }) => {
  return (
    <article className='grid grid-cols-3 col-span-8 gap-4 grow'>
        <section className='col-span-1 gap-2 p-2 border-2 border-blue-500 rounded-lg place-content-start bg-blue-500/10'>
            <h1 className='flex items-center m-2 mb-8 text-2xl font-bold text-blue-700 text-start'>{renderIcon("To Do")} To Do</h1>
            {tasks?.filter(task => task.status === 'To Do').map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    className='row-span-1 my-2'
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCompleteTask={onCompleteTask}
                />
            ))}
        </section>
        <section className='col-span-1 gap-2 p-2 border-2 rounded-lg border-amber-500 bg-amber-500/10 place-content-start'>
            <h1 className='flex items-center m-2 mb-8 text-2xl font-bold text-amber-700 text-start'>{renderIcon("In Progress")} In Progress</h1>
            {tasks?.filter(task => task.status === 'In Progress').map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    className='row-span-1 my-2'
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCompleteTask={onCompleteTask}
                />
            ))}
        </section>
        <section className='col-span-1 gap-2 p-2 border-2 border-green-500 rounded-lg bg-green-500/10 place-content-start'>
            <h1 className='flex items-center m-2 mb-8 text-2xl font-bold text-green-700 text-start'>{renderIcon("Done")} Done</h1>
            {tasks?.filter(task => task.status === 'Done').map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    className='row-span-1 my-2'
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCompleteTask={onCompleteTask}
                />
            ))}
        </section>
        
      
    </article>
  )
}

export default KanbanView
