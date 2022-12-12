import { Tooltip } from 'react-tooltip'
import { useTransition, animated } from 'react-spring'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { roadmapsState, modalState } from '../../recoil/atoms'
import RoadmapTitle from './RoadmapTitle'
import Roadmap from './Roadmap'
import './Roadmaps.styles.scss'

const Roadmaps = () => {
  const roadmaps = useRecoilValue(roadmapsState)
  const setModal = useSetRecoilState(modalState)

  const animateRoadmaps = useTransition(roadmaps, {
    from: { opacity: '0', height: '0rem', transform: 'translateY(-20px)' },
    enter: { opacity: '1', height: '2.5rem', transform: 'translateY(0px)' },
    leave: {
      opacity: '0',
      height: '0rem',
      transform: 'translateY(0px)'
    },
    trail: 300,
    config: { friction: 12, tension: 180 },
    keys: roadmaps.map((title) => title._id)
  })

  return (
    <div className='roadmaps'>
      <div className='top-section'>
        <h2>roadmaps</h2>
        <button
          id='add-roadmap'
          onClick={() =>
            setModal({ type: 'roadmap', roadmapId: null, sagaId: null })
          }>
          <FontAwesomeIcon className='plus' icon={faPlus} />
        </button>
        <Tooltip anchorId='add-roadmap' content='Add a roadmap' />
      </div>
      {!!roadmaps.length && (
        <div className='titles-section'>
          {animateRoadmaps((style, item) => (
            <animated.div style={style} key={item._id}>
              <RoadmapTitle roadmap={item} />
            </animated.div>
          ))}
        </div>
      )}
      <Roadmap />
    </div>
  )
}

export default Roadmaps
