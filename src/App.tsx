import { useState } from 'react';
import Panel from './Panel';


function App() {

  const [view1, setView1] = useState(true)
  const [view2, setView2] = useState(false)
  const [view3, setView3] = useState(false)


  return (
    <div className='p-4 h-screen w-full'>
      {/* component */}
      <div className='h-12 flex flex-wrap gap-x-4 mb-2'>
        <button onClick={() => { setView1(true); setView2(false); setView3(false) }} className='bg-gray-200 p-2 rounded-md'>Panel 1</button>
        <button onClick={() => { setView1(false); setView2(true); setView3(false) }} className='bg-gray-200 p-2 rounded-md'>Panel 2</button>
        <button onClick={() => { setView1(false); setView2(false); setView3(true) }} className='bg-gray-200 p-2 rounded-md'>Panel 3</button>
      </div>
      {view1 && <Panel index={1}></Panel>}
      {view2 && <Panel index={2}></Panel>}
      {view3 && <Panel index={3}></Panel>}
    </div>
  )
}

export default App
