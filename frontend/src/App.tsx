import { Footer } from './components/Footer'
import './globals.css'
import { IndexRoutes } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { Analytics } from '@vercel/analytics/react'

function App() {

  return (
    <BrowserRouter>
      <IndexRoutes />
      <Footer />
      <Analytics />
    </BrowserRouter>
  )
}

export default App
