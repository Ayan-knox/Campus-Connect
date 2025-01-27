import { ScrollRestoration } from "react-router-dom"
import Layout from "../components/layout/Layout"
import home from "../assets/home.png"

function Home() {
  return (
    <>
      <ScrollRestoration />
      <Layout></Layout>
      <div
        style={{
          height: "53rem",
          background: "linear-gradient(300deg, #00bfff, #ff4c68, #ef8172)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "end"
        }}>
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "5rem",
              color:"whitesmoke",
              padding:"4rem",
              fontStyle:"italic",
            }}>
            Join The Campus!
          </h1>
          <p
          style={{
            width: "50vw",
            textAlign: "center",
            fontSize: "1.4rem",
            color:"whitesmoke",
            lineHeight:"2rem"
          }}>
            Welcome to our exclusive campus social networking app, where connections thrive and campus life comes alive! Dive into a vibrant community tailored to your university, where you can seamlessly share experiences, manage events, and forge lasting friendships.
          </p>
        </div>
        <img src={home} alt=""
          style={{
            width: "30rem",
          }} />
      </div>
    </>
  )
}

export default Home
