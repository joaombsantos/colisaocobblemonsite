import { Footer } from './components/Footer'
import './globals.css'
import { IndexRoutes } from "./routes"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <IndexRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
