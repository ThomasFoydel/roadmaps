import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { roadmapsState } from './recoil/atoms/roadmaps'
import { GET_ALL_ROADMAPS } from './graphql/queries'
import Roadmaps from './components/Roadmaps'
import Header from './components/Header'
import Modal from './components/Modal'
import './App.scss'

function App() {
  const setRoadmaps = useSetRecoilState(roadmapsState)

  const { data } = useQuery(GET_ALL_ROADMAPS)

  useEffect(() => {
    try {
      const response = data?.getAllRoadmaps || []
      setRoadmaps((existing) => (existing.length ? existing : response))
    } catch (err) {
      toast.error(
        'There was an error fetching roadmaps. Please refresh the page.'
      )
    }
  }, [data?.getAllRoadmaps, setRoadmaps])

  return (
    <div className='App'>
      <Header />
      <Roadmaps />
      <Modal />
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App
