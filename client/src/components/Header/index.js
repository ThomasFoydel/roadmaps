import logo from '../../assets/images/logo.png'
import './Header.styles.scss'

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt='roadmaps logo' />
      <h1>Roadmaps</h1>
    </div>
  )
}

export default Header
