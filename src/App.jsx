import { useState } from 'react'
import SideBar from './components/SideBar'
import DashBoard from './components/DashBoard'
function App() {

  return (
    <>
    
      <div className='flex '>
      <SideBar/>
      <DashBoard/>
      </div>
    </>
  )
}

export default App
