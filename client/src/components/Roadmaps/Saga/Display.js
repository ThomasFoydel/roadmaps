import { Tooltip } from 'react-tooltip'
import {
  faCheck,
  faMinusCircle,
  faPencil,
  faPlus,
  faShare,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated, useSpring } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Task from '../Task'

const Display = ({
  props: {
    _id,
    tasks,
    index,
    title,
    complete,
    editOpen,
    titleEdit,
    handleEdit,
    setEditOpen,
    handleDelete,
    openTaskModal,
    handleSubmitEdit,
    handleEditChange
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

  const checkAnimation = useSpring({
    to: {
      opacity: complete ? 1 : 0,
      transform: complete ? 'translateY(0px)' : 'translateY(-20px)'
    },
    config: { friction: 20, tension: 180 }
  })

  return (
    <div className='saga'>
      <div className='saga-title-section'>
        <div className='saga-top-section'>
          <div className='left-section'>
            <p className={`number ${complete && 'complete'}`}>{index}</p>
            {editOpen ? (
              <form className='edit-form' onSubmit={handleSubmitEdit}>
                <input
                  maxLength='25'
                  className='saga-title-input'
                  placeholder='new title'
                  value={titleEdit}
                  onChange={handleEditChange}
                />
                <div>
                  <button id={`submit-edit-${_id}`} type='submit'>
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                  <Tooltip
                    anchorId={`submit-edit-${_id}`}
                    content='Submit edit'
                  />
                  <button
                    id={`cancel-edit-${_id}`}
                    type='button'
                    onClick={() => setEditOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <Tooltip
                    anchorId={`cancel-edit-${_id}`}
                    content='Cancel edit'
                  />
                </div>
              </form>
            ) : (
              <h4>{title}</h4>
            )}
          </div>
          {!editOpen && (
            <div className='right-section'>
              <animated.div style={checkAnimation}>
                <FontAwesomeIcon className='check' icon={faCheck} />
              </animated.div>
              <button
                id={`remove-saga-${_id}`}
                type='button'
                className='btn'
                onClick={handleDelete}>
                <FontAwesomeIcon
                  className='minus'
                  size='sm'
                  icon={faMinusCircle}
                />
              </button>
              <Tooltip anchorId={`remove-saga-${_id}`} content='Delete saga' />
              <button
                id={`edit-saga-${_id}`}
                type='button'
                className='btn'
                onClick={handleEdit}>
                <FontAwesomeIcon className='pencil' size='sm' icon={faPencil} />
              </button>
              <Tooltip anchorId={`edit-saga-${_id}`} content='Edit saga' />
            </div>
          )}
        </div>
      </div>
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
