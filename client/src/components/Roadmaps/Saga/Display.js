import { Tooltip } from 'react-tooltip'
import { useTransition, animated } from 'react-spring'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditableTitle from '../EditableTitle'
import Task from '../Task'

const Display = ({
  props: {
    _id,
    tasks,
    index,
    title,
    complete,
    handleDelete,
    openTaskModal,
    handleSubmitEdit
  }
}) => {
  const animateTasks = useTransition(tasks, {
    from: { opacity: '0', height: '0rem', transform: 'translateY(-10px)' },
    enter: { opacity: '1', height: '1.75rem', transform: 'translateY(0px)' },
    leave: {
      opacity: '0',
      height: '0rem',
      transform: 'translateY(0px)'
    },
    keys: tasks.map((task) => task._id),
    trail: 300,
    config: { friction: 12, tension: 180 }
  })

  return (
    <div className='saga'>
      <EditableTitle
        props={{
          _id,
          type: 'saga',
          index,
          title,
          complete,
          handleDelete,
          handleSubmitEdit
        }}
      />

      {!tasks?.length && <p>add some tasks...</p>}
      {animateTasks((style, task) => (
        <animated.div style={style} key={task._id}>
          <Task task={task} />
        </animated.div>
      ))}
      <div className='plus-section'>
        <button id={`add-task-${_id}`} onClick={openTaskModal}>
          <FontAwesomeIcon className='plus' icon={faPlus} />
        </button>
        <Tooltip anchorId={`add-task-${_id}`} content='Add task' />
      </div>
    </div>
  )
}

export default Display
