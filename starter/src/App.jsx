import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css'
import Header from "./components/Header"
import EvaluatorPage from "./pages/EvaluatorPage"

import ApiCall from "./components/ApiCall"
import PostList from "./components/PostList"
import AxiosFilter from "./components/AxiosFilter"
import AIJobsFilter from "./components/AIJobsFilter"
import TaskManager from "./components/TaskManager"
function App() {

  return (

    <>
      <Header />
      <EvaluatorPage />
      <ApiCall/>
      <PostList/>
      <AIJobsFilter/>
      <TaskManager/>
      {/* <AxiosFilter/> */}
    </>
  )
}

export default App