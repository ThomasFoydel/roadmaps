import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import EditableTitle from '../EditableTitle'

const Display = ({
  props: { _id, done, title, toggleDone, handleDelete, handleSubmitEdit }
}) => (
  <div className='task'>
    <button id={`check-box-${_id}`} onClick={toggleDone}>
      <FontAwesomeIcon
        className='check-box'
        icon={done ? faCheckSquare : faSquare}
      />
    </button>
    <Tooltip anchorId={`check-box-${_id}`} content='Toggle task complete' />
    <EditableTitle
      props={{
        _id,
        type: 'task',
        title,
        handleDelete,
        handleSubmitEdit
      }}
    />
    {/* {editOpen ? (
      <form className='edit-form' onSubmit={handleEditSubmit}>
        <input
          maxLength='25'
          value={titleEdit}
          onChange={(e) => setTitleEdit(e.target.value)}
          placeholder='new title'
        />
        <div>
          <button id={`submit-edit-${_id}`} type='submit'>
            <FontAwesomeIcon icon={faShare} size='lg' />
          </button>
          <Tooltip anchorId={`submit-edit-${_id}`} content='Submit edit' />
          <button
            id={`cancel-edit-${_id}`}
            type='button'
            onClick={() => setEditOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size='lg' />
          </button>
          <Tooltip anchorId={`cancel-edit-${_id}`} content='Cancel edit' />
        </div>
      </form>
    ) : (
      <div className='title-section'>
        <h5>{title}</h5>
        <div>
          <button id={`delete-task-${_id}`} onClick={handleDelete}>
            <FontAwesomeIcon icon={faMinusCircle} size='lg' />
          </button>
          <Tooltip anchorId={`delete-task-${_id}`} content='Delete task' />
          <button id={`edit-task-${_id}`} onClick={() => setEditOpen(true)}>
            <FontAwesomeIcon icon={faPencil} size='lg' />
          </button>
          <Tooltip anchorId={`edit-task-${_id}`} content='Edit task' />
        </div>
      </div>
    )} */}
  </div>
)

export default Display
