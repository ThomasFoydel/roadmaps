import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { DELETE_SAGA, UPDATE_SAGA } from '../../../graphql/queries'
import { modalState } from '../../../recoil/atoms/modal'
import { roadmapsState } from '../../../recoil/atoms'
import Display from './Display'
import './Saga.styles.scss'

const Saga = ({ saga: { title, tasks, _id }, roadmapId, index }) => {
  const [deleteSaga] = useMutation(DELETE_SAGA)
  const [updateSaga] = useMutation(UPDATE_SAGA)
  const setModal = useSetRecoilState(modalState)
  const [editOpen, setEditOpen] = useState(false)
  const [titleEdit, setTitleEdit] = useState(title)
  const [roadmaps, setRoadmaps] = useRecoilState(roadmapsState)
  const complete = tasks.length > 0 && tasks.every((task) => task.done)

  const openTaskModal = () => setModal({ type: 'task', roadmapId, sagaId: _id })

  const handleEdit = async () => setEditOpen((o) => !o)
  
  const handleEditChange = (e) => setTitleEdit(e.target.value)

  const thisSagasRoadmap = roadmaps.find((roadmap) =>
    roadmap.sagas.some((saga) => saga._id === _id)
  )

  const updateSagas = (sagaUpdate) => {
    const roadmapUpdate = { ...thisSagasRoadmap, sagas: sagaUpdate }
    setRoadmaps((roadmaps) =>
      roadmaps.map((roadmap) =>
        roadmap._id === thisSagasRoadmap._id ? roadmapUpdate : roadmap
      )
    )
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    const toastId = toast.info('Updating saga...')
    try {
      const res = await updateSaga({ variables: { _id, title: titleEdit } })
      const updatedSaga = res?.data?.updateSaga
      const sagaUpdate = thisSagasRoadmap.sagas.map((saga) =>
        saga._id === updatedSaga._id ? updatedSaga : saga
      )
      updateSagas(sagaUpdate)
      toast.update(toastId, {
        type: 'success',
        render: 'Saga updated!',
        autoClose: 3000
      })
      setEditOpen(false)
    } catch (err) {
      toast.update(toastId, {
        type: 'error',
        render: err.message,
        autoClose: 3000
      })
    }
  }

  const handleDelete = async () => {
    const toastId = toast.info('Deleting saga...')
    try {
      const res = await deleteSaga({ variables: { _id } })
      const deletedSagaId = res?.data?.deleteSaga

      const sagaUpdate = thisSagasRoadmap.sagas.filter(
        (saga) => saga._id !== deletedSagaId
      )

      updateSagas(sagaUpdate)

      toast.update(toastId, {
        type: 'success',
        render: 'Saga deleted!',
        autoClose: 3000
      })
    } catch (err) {
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
      }}
    />
  )
}

export default Saga
