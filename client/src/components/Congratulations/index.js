import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import yayMp3 from '../../assets/audio/yay.mp3'

const yay = new Audio(yayMp3)

const Congratulations = () => {
  const [randomFact, setRandomFact] = useState('')

  useEffect(() => {
    let subscribed = true
    yay.play()
    const fetchRandomFact = async () => {
      try {
        const res = await fetch(
          'https://uselessfacts.jsph.pl/random.json?language=en'
        )
        const data = await res.json()
        if (subscribed) {
          setRandomFact((existing) => (existing ? existing : data.text))
        }
      } catch (err) {
        toast.error('Sorry! There was an error fetching your fun fact.')
      }
    }
    fetchRandomFact()
    return () => {
      subscribed = false
      yay.pause()
      yay.currentTime = 0
    }
  }, [])

  return (
    <div>
      <p>Congratulations!</p>
      <p>You finished this roadmap!</p>
      {randomFact && (
        <p>
          Here's a random fact for you: <span>{randomFact}</span>
        </p>
      )}
    </div>
  )
}

export default Congratulations
