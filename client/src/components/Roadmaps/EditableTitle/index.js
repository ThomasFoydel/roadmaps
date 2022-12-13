import { Tooltip } from 'react-tooltip'
import {
  faCheck,
  faMinusCircle,
  faPencil,
  faShare,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import shine from '../../../assets/audio/shine.wav'
import close from '../../../assets/audio/close.wav'
import './EditableTitle.styles.scss'

const EditableTitle = ({
  props: { _id, type, title, index, complete, handleDelete, handleSubmitEdit }
}) => {
  const [editOpen, setEditOpen] = useState(false)
  const [titleEdit, setTitleEdit] = useState(title || '')
  useEffect(() => setTitleEdit(title || ''), [title])

  const handleEditChange = (e) => setTitleEdit(e.target.value)

  const checkAnimation = useSpring({
    to: {
      opacity: complete ? 1 : 0,
      transform: complete ? 'translateY(0px)' : 'translateY(-20px)'
    },
    config: { friction: 20, tension: 180 }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleSubmitEdit(titleEdit)
    setEditOpen(false)
  }

  const openEdit = () => {
    new Audio(shine).play()
    setEditOpen(true)
  }

  const closeEdit = () => {
    new Audio(close).play()
    setEditOpen(false)
  }

  return (
    <div className='editable-title'>
      <div className='editable-top-section'>
        {type === 'saga' && (
          <p className={`number ${complete && 'complete'}`}>{index}</p>
        )}
        {editOpen ? (
          <form className='edit-form' onSubmit={handleSubmit}>
            <input
              maxLength='25'
              className='title-input'
              placeholder='new title'
              value={titleEdit}
              onChange={handleEditChange}
            />
            <div className='button-section'>
              <button id={`submit-edit-${_id}`} type='submit'>
                <FontAwesomeIcon icon={faShare} />
              </button>
              <Tooltip anchorId={`submit-edit-${_id}`} content='Submit edit' />
              <button
                id={`cancel-edit-${_id}`}
                type='button'
                onClick={closeEdit}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <Tooltip anchorId={`cancel-edit-${_id}`} content='Cancel edit' />
            </div>
          </form>
        ) : (
          <div
            className='title-and-buttons'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            {type === 'roadmap' && <h3>{title}</h3>}
            {type === 'saga' && <h4>{title}</h4>}
            {type === 'task' && <h5>{title}</h5>}

            <div className='button-section'>
              {type === 'saga' && (
                <animated.div style={checkAnimation}>
                  <FontAwesomeIcon className='check' icon={faCheck} />
                </animated.div>
              )}
              <button
                id={`remove-saga-${_id}`}
                type='button'
                className='btn'
                onClick={handleDelete}>
                <FontAwesomeIcon className='minus' icon={faMinusCircle} />
              </button>
              <Tooltip anchorId={`remove-saga-${_id}`} content='Delete saga' />
              <button
                id={`edit-saga-${_id}`}
                type='button'
                className='btn'
                onClick={openEdit}>
                <FontAwesomeIcon className='pencil' icon={faPencil} />
              </button>
              <Tooltip anchorId={`edit-saga-${_id}`} content='Edit saga' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditableTitle
