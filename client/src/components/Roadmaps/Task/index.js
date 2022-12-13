import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { useRecoilState, useRecoilValue } from 'recoil'
import { roadmapsState, selectedRoadmapIdState } from '../../../recoil/atoms'
import { DELETE_TASK, UPDATE_TASK } from '../../../graphql/queries'
import deletion from '../../../assets/audio/deletion.wav'
import error from '../../../assets/audio/error.wav'
import happy from '../../../assets/audio/happy.wav'
import Display from './Display'
import './Task.styles.scss'

const Task = ({ task: { _id, title, done } }) => {
  const [updateTask] = useMutation(UPDATE_TASK)
  const [deleteTask] = useMutation(DELETE_TASK)
  const [roadmaps, setRoadmaps] = useRecoilState(roadmapsState)
  const selectedRoadmapId = useRecoilValue(selectedRoadmapIdState)

  const selectedRoadmap = roadmaps.find(
    (roadmap) => roadmap._id === selectedRoadmapId
  )

  const updateRoadmapState = (taskUpdate) => {
    const { sagas } = selectedRoadmap
    const sagaToUpdate = sagas.find((saga) =>
      saga.tasks.some((task) => task._id === _id)
    )
    const updatedTasks = taskUpdate
      ? sagaToUpdate.tasks.map((task) => (task._id === _id ? taskUpdate : task))
      : sagaToUpdate.tasks.filter((task) => task._id !== _id)

    const sagaUpdate = { ...sagaToUpdate, tasks: updatedTasks }
    const updatedSagas = selectedRoadmap.sagas.map((saga) =>
      saga._id === sagaToUpdate._id ? sagaUpdate : saga
    )
    const roadmapUpdate = { ...selectedRoadmap, sagas: updatedSagas }
    const updatedRoadmaps = roadmaps.map((roadmap) =>
      roadmap._id === selectedRoadmapId ? roadmapUpdate : roadmap
    )
    setRoadmaps(updatedRoadmaps)
  }

  const toggleDone = async () => {
    const toastId = toast.info('Updating task...')
    try {
      const res = await updateTask({
        variables: { _id, done: !done }
      })
      updateRoadmapState(res?.data?.updateTask)
      new Audio(res?.data?.updateTask?.done ? happy : deletion).play()
      toast.update(toastId, {
        type: 'success',
        render: 'Task updated!',
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

  const handleDelete = async () => {
    const toastId = toast.info('Deleting task...')
    try {
      const res = await deleteTask({ variables: { _id } })
      const deletedTaskId = res?.data?.deleteTask
      if (deletedTaskId === _id) updateRoadmapState()
      new Audio(deletion).play()
      toast.update(toastId, {
        type: 'success',
        render: 'Task deleted!',
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
    const toastId = toast.info('Updating task...')
    try {
      const res = await updateTask({
        variables: { _id, title: titleEdit }
      })
      const updatedTask = res?.data?.updateTask
      updateRoadmapState(updatedTask)
      new Audio(happy).play()
      toast.update(toastId, {
        type: 'success',
        render: 'Task updated!',
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

  return (
    <Display
      props={{
        _id,
        done,
        title,
        toggleDone,
        handleDelete,
        handleSubmitEdit
      }}
    />
  )
}
export default Task
