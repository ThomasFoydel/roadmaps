import { Tooltip } from 'react-tooltip'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Congratulations from '../../Congratulations'
import EditableTitle from '../EditableTitle'
import Saga from '../Saga'

const Display = ({
  props: {
    _id,
    sagas,
    title,
    complete,
    handleDelete,
    openTaskModal,
    displayAddSaga,
    handleSubmitEdit,
  }
}) => (
  <div className='roadmap'>
    <EditableTitle
      props={{
        _id,
        type: 'roadmap',
        title,
        complete,
        handleDelete,
        handleSubmitEdit
      }}
    />

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
