import { ImageProvider } from "./lib/ImageContext"
import HomePage from "./pages/Home"

function App() {
  return (
    <ImageProvider >
      <HomePage />
    </ImageProvider>
  )
}

export default App