import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return(
    <main>
      <p>This page does not exist</p>
      <Link to="/">
        Back to home
      </Link>
    </main>
  )
}