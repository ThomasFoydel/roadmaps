import { Tooltip } from 'react-tooltip'
import {
  faMinusCircle,
  faPencil,
  faPlus,
  faShare,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Congratulations from '../../Congratulations'
import Saga from '../Saga'

const Display = ({
  props: {
    _id,
    sagas,
    title,
    editOpen,
    complete,
    titleEdit,
    setEditOpen,
    handleDelete,
    openTaskModal,
    displayAddSaga,
    handleEditSubmit,
    handleTitleChange
  }
}) => (
  <div className='roadmap'>
    <div className='roadmap-top-section'>
      {editOpen ? (
        <form className='edit-form' onSubmit={handleEditSubmit}>
          <input
            maxLength='25'
            value={titleEdit}
            placeholder='new title'
            onChange={handleTitleChange}
          />
          <div>
            <button id={`submit-edit-${_id}`} type='submit'>
              <FontAwesomeIcon icon={faShare} />
            </button>
            <Tooltip anchorId={`submit-edit-${_id}`} content='Submit edit' />

            <button
              id={`cancel-edit-${_id}`}
              type='button'
              onClick={() => setEditOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <Tooltip anchorId={`cancel-edit-${_id}`} content='Cancel edit' />
          </div>
        </form>
      ) : (
        <div className='title-section'>
          <h3>{title}</h3>
          <div className='button-section'>
            <button
              id='delete-roadmap'
              onClick={handleDelete}
              className='btn minus'>
              <FontAwesomeIcon className='plus' icon={faMinusCircle} />
            </button>
            <Tooltip anchorId='delete-roadmap' content='Delete roadmap' />
            <button
              id='edit-roadmap'
              onClick={() => setEditOpen(true)}
              className='btn pencil'>
              <FontAwesomeIcon className='plus' icon={faPencil} />
            </button>
            <Tooltip anchorId='edit-roadmap' content='Edit roadmap' />
          </div>
        </div>
      )}
    </div>
    {sagas && !sagas.length && <p>Add a saga...</p>}
    {sagas &&
      sagas.map((saga, i) => (
        <Saga saga={saga} key={saga._id} roadmapId={_id} index={i + 1} />
      ))}
    {displayAddSaga && (
      <>
        <button id='add-saga' className='add-saga' onClick={openTaskModal}>
          <FontAwesomeIcon className='plus' icon={faPlus} />
        </button>
        <Tooltip anchorId='add-saga' content='Add saga' />
      </>
    )}
    {complete && <Congratulations />}
  </div>
)

export default Display
