import { useRecoilState } from 'recoil'
import { selectedRoadmapIdState } from '../../../recoil/atoms'
import openUp from '../../../assets/audio/openUp.wav'
import close from '../../../assets/audio/close.wav'
import './RoadmapTitle.styles.scss'

const RoadmapTitle = ({ roadmap }) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useRecoilState(
    selectedRoadmapIdState
  )

  const open = roadmap._id === selectedRoadmapId

  const openRoadmap = () => {
    new Audio(open ? close : openUp).play()
    setSelectedRoadmapId(open ? null : roadmap._id)
  }
  return (
    <div className='roadmap-title'>
      <p className='title-text'>{roadmap.title}</p>
      <button onClick={openRoadmap}>{open ? 'close' : 'open'}</button>
    </div>
  )
}

export default RoadmapTitle
