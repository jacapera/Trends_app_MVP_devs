import { Button } from "@tremor/react";


import { Link, useNavigate } from "react-router-dom";



export default function LandingPage() {
  const navigate = useNavigate()

  const handlePage = (to) => {
    navigate(to)
  }

  return (
    <main>
      <article>
        <section>
          <h1>
            we are <strong>TRENDS!</strong>
          </h1>
          <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, asperiores?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quae ex ea sunt, velit voluptatum eveniet nulla praesentium error dolore omnis ad veritatis recusandae assumenda vero pariatur! Deleniti accusamus sunt est. Itaque obcaecati totam, voluptatem facere provident voluptas beatae mollitia.</p>
          <div>
            <Button variant="light" onClick={() => handlePage("/Trends_app_MVP/login")}>
              LOG IN
            </Button>
            <Button onClick={() => handlePage("/Trends_app_MVP/register")}>SIGN UP</Button>
          </div>
        </section>
        <section>
          <p>✨Image Sketch✨</p>
        </section>


        {/* PROVISIONAL MIENTRAS PRUEBAS DEL CHAT */}
        <Link to="/Trends_app_MVP/chat">ir a chat</Link>


      </article>
    </main>
  )
}