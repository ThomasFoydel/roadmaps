import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { DELETE_ROADMAP, UPDATE_ROADMAP } from '../../../graphql/queries'
import deletion from '../../../assets/audio/deletion.wav'
import error from '../../../assets/audio/error.wav'
import happy from '../../../assets/audio/happy.wav'
import Display from './Display'
import './Roadmap.styles.scss'
import {
  modalState,
  roadmapsState,
  selectedRoadmapIdState
} from '../../../recoil/atoms'

const Roadmap = () => {
  const [selectedRoadmapId, setSelectedRoadmap] = useRecoilState(
    selectedRoadmapIdState
  )
  const [roadmaps, setRoadmaps] = useRecoilState(roadmapsState)
  const [updateRoadmap] = useMutation(UPDATE_ROADMAP)
  const [deleteRoadmap] = useMutation(DELETE_ROADMAP)
  const setModal = useSetRecoilState(modalState)

  const { title, sagas, _id } =
    roadmaps.find((r) => r._id === selectedRoadmapId) || {}

  const displayAddSaga = roadmaps.length > 0 && selectedRoadmapId

  const complete =
    sagas?.every((saga) => saga.tasks.every((task) => task.done)) &&
    sagas.some((saga) => saga.tasks.length)

  const openTaskModal = () => {
    if (_id) setModal({ type: 'saga', roadmapId: _id, sagaId: null })
  }

  const handleDelete = async () => {
    const toastId = toast.info('Deleting roadmap...')
    try {
      const res = await deleteRoadmap({ variables: { _id } })
      const deletedRoadmapId = res?.data?.deleteRoadmap
      setRoadmaps((roadmaps) =>
        roadmaps.filter((roadmap) => roadmap._id !== deletedRoadmapId)
      )
      setSelectedRoadmap(null)
      new Audio(deletion).play()
      toast.update(toastId, {
        type: 'success',
        render: 'Roadmap deleted!',
        autoClose: 3000
      })
    } catch (err) {
      new Audio(error).play()
      toast.update(toastId, {
        type: 'error',
        render: err.message,
        autoClose: 3000
      })
    }
  }

  const handleSubmitEdit = async (titleEdit) => {
    const toastId = toast.info('Updating roadmap...')
    try {
      const res = await updateRoadmap({ variables: { _id, title: titleEdit } })
      const updatedRoadmap = res?.data?.updateRoadmap
      setRoadmaps((roadmaps) =>
        roadmaps.map((roadmap) =>
          roadmap._id === updatedRoadmap._id ? updatedRoadmap : roadmap
        )
      )
      new Audio(happy).play()
      toast.update(toastId, {
        type: 'success',
        render: 'Roadmap updated!',
        autoClose: 3000
      })
    } catch (err) {
      new Audio(error).play()
      toast.update(toastId, {
        type: 'error',
        render: err.message,
        autoClose: 3000
      })
    }
  }

  if (!selectedRoadmapId) return <></>
  return (
    <Display
      props={{
        _id,
        sagas,
        title,
        complete,
        handleDelete,
        openTaskModal,
        displayAddSaga,
        handleSubmitEdit
      }}
    />
  )
}

export default Roadmap
