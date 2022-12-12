import { useRecoilState } from 'recoil'
import { selectedRoadmapIdState } from '../../../recoil/atoms'
import './RoadmapTitle.styles.scss'

const RoadmapTitle = ({ roadmap }) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useRecoilState(
    selectedRoadmapIdState
  )

  const open = roadmap._id === selectedRoadmapId

  return (
    <div className='roadmap-title'>
      <p className='title-text'>{roadmap.title}</p>
      <button onClick={() => setSelectedRoadmapId(open ? null : roadmap._id)}>
        {open ? 'close' : 'open'}
      </button>
    </div>
  )
}

export default RoadmapTitle
