import { Button } from "@tremor/react";

export default function LandingPage() {
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
            <Button variant="light">
              LOG IN
            </Button>
            <Button>SIGN UP</Button>
          </div>
        </section>
        <section>
          <p>✨Image Sketch✨</p>
        </section>
      </article>
    </main>
  )
}