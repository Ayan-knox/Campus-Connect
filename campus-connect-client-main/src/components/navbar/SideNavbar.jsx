import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../style/SideNavbar.scss';
import signout from "../../assets/signout.svg"
import user from "../../assets/user.svg"
import { logout } from '../../redux/features/authSlice';


const SideNavbar = () => {
    const dispatch = useDispatch();
    const { logo, home, chat, search } = useSelector((state) => state.imgTracker);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="left-navbar">
            <div className="navbar-uperside">
                <div className="logo">
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'aliceblue' : ''
                        })}
                    >
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                <div className='icons'>
                    <NavLink
                        to="/home"
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'aliceblue' : ''
                        })}
                    >
                        <img src={home} alt="" />
                    </NavLink>
                </div>
                <div className="icons">
                    <NavLink
                        to="/chat"
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? 'aliceblue' : ''
                            };
                        }}
                    >
                        <img src={chat} alt="" />
                    </NavLink>
                </div>
                <div className="icons">
                    <NavLink
                        to='/search'
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? 'aliceblue' : ''
                            };
                        }}
                    >
                        <img src={search} alt="" />
                    </NavLink>
                </div>
            </div>

            <div className="navbar-downside">
                <div className="icons">
                    <NavLink
                        to={'/home'}
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? 'aliceblue' : ''
                            };
                        }}
                    >
                        <img src={user} alt="" />
                    </NavLink>
                </div>
                <div className="icons logout" onClick={()=> handleLogout()}>
                <NavLink
                        to={'/user/login'}
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? 'aliceblue' : ''
                            };
                        }}
                    >
                        <img src={signout} alt="logout" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
