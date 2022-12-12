import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { createMutations } from '../../graphql/queries'
import {
  modalState,
  roadmapsState,
  selectedRoadmapIdState
} from '../../recoil/atoms'
import Display from './Display'

function Modal() {
  const [{ type, roadmapId, sagaId }, setModal] = useRecoilState(modalState)
  const [create, { loading }] = useMutation(createMutations[type || 'roadmap'])
  const [selectedRoadmapId, setSelectedRoadmapId] = useRecoilState(
    selectedRoadmapIdState
  )
  const [roadmaps, setRoadmaps] = useRecoilState(roadmapsState)
  const [title, setTitle] = useState('')

  const currentRoadmap = roadmaps.find(
    (roadmap) => roadmap._id === selectedRoadmapId
  )
  const [typeText, setTypeText] = useState(type)
  useEffect(() => {
    if (type) setTypeText(type)
  }, [type])

  const closeModal = () => {
    setTitle('')
    setModal({ type: null, roadmapId: null, sagaId: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    const toastId = toast.info(`Creating new ${type}`)
    const variables = { title }
    if (type === 'saga') variables.roadmap = roadmapId
    if (type === 'task') variables.saga = sagaId
    try {
      const { data } = await create({ variables })

      if (data?.createRoadmap) {
        setRoadmaps((roadmaps) =>
          roadmaps.some((roadmap) => roadmap._id === data.createRoadmap._id)
            ? roadmaps
            : [...roadmaps, data?.createRoadmap]
        )
        setSelectedRoadmapId(data.createRoadmap._id)
      }
      if (data?.createSaga) {
        const updatedRoadmaps = roadmaps.map((roadmap) =>
          roadmap._id === roadmapId
            ? { ...roadmap, sagas: [...roadmap.sagas, data.createSaga] }
            : roadmap
        )
        setRoadmaps(updatedRoadmaps)
      }

      if (data?.createTask) {
        const selectedSaga = currentRoadmap.sagas.find(
          (saga) => saga._id === sagaId
        )

        const sagaUpdate = {
          ...selectedSaga,
          tasks: [...selectedSaga.tasks, data.createTask]
        }

        const updatedRoadmaps = roadmaps.map((roadmap) =>
          roadmap._id === currentRoadmap._id
            ? {
                ...roadmap,
                sagas: roadmap.sagas.map((saga) =>
                  saga._id === sagaId ? sagaUpdate : saga
                )
              }
            : roadmap
        )
        setRoadmaps(updatedRoadmaps)
      }
      toast.update(toastId, {
        type: 'success',
        render: `New ${type} created!`,
        autoClose: 3000
      })
      setTitle('')
      closeModal()
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
        type,
        title,
        setTitle,
        typeText,
        closeModal,
        handleSubmit
      }}
    />
  )
}

export default Modal
