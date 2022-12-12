import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.styles.scss'

const Display = ({
  props: { type, title, setTitle, typeText, closeModal, handleSubmit }
}) => {
  const modalOpen = !!type

  const transition = useTransition(modalOpen, {
    expires: 0,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { friction: 12, tension: 180 }
  })

  const modalWindowAnimation = useSpring({
    to: {
      opacity: modalOpen ? 1 : 0,
      transform: modalOpen ? 'translateY(0px)' : 'translateY(-200px)'
    }
  })

  const preventBubble = (e) => e.stopPropagation()

  return transition((props, item) => {
    return (
      item && (
        <ModalInsert>
          <animated.div
            style={props}
            tabIndex={0}
            className='modal-background'
            onClick={closeModal}>
            <animated.div
              style={modalWindowAnimation}
              className='modal'
              onClick={preventBubble}>
              <form className='modal-form' onSubmit={handleSubmit}>
                <button
                  type='button'
                  className='close-btn'
                  onClick={closeModal}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <h4>new {typeText}</h4>
                <div>
                  <label htmlFor='title'>title</label>
                  <input
                    maxLength='25'
                    placeholder='title'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <button className='submit-btn' type='submit'>
                  submit
                </button>
              </form>
            </animated.div>
          </animated.div>
        </ModalInsert>
      )
    )
  })
}

const ModalInsert = ({ children }) => {
  const mainDivRef = useRef(document.createElement('div'))
  const modalRootRef = useRef(document.getElementById('modal-root'))

  useEffect(() => {
    const modalRoot = modalRootRef.current
    const mainDiv = mainDivRef.current
    modalRoot.appendChild(mainDiv)
    return () => modalRoot.removeChild(mainDiv)
  }, [])

  return createPortal(children, mainDivRef.current)
}

export default Display
