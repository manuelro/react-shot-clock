import React from 'react'
import ShotClock from './ShotClock'

function App() {
  return (
    <div className='flex min-h-screen p-5 md:p-24 justify-center items-center bg-gray-400 gap-4'>
      <ShotClock />
      <ShotClock />
    </div>
  )
}

export default App
