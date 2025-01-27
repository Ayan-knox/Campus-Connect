import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import '../../style/layout.scss'

const Layout = () => {
  return (
    <>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </>
  )
}

export default Layout