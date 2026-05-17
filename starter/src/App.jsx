// TODO Day 1: import Header and EvaluatorPage and render them here
// TODO Day 4: import Routes, Route from react-router-dom
//             import LoginPage and RegisterPage
//             add route definitions
import Header from "./components/Header"
import EvaluatorPage from "./pages/EvaluatorPage"

export default function App() {
  return (
    <div>
      <Header /> 
      <EvaluatorPage />
    </div>
  )
}
