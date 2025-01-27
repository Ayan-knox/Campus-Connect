import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
    
  const logo = useSelector((state) => state.imgTracker.logo);

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <NavLink to="/"> <img src={logo} alt="" /> Campus Connect</NavLink>
                </div>
                <div className="menu">
                    <ul className="list">
                        <li className='chat'>
                            <NavLink to="/chat">Chat</NavLink>
                        </li>
                        <li className='login'>
                            <NavLink to="/user/login">Log in</NavLink>
                        </li>
                        <li className='signup'>
                            <NavLink to="/user/signup">Sign up</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Navbar