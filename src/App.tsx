import { useState, useEffect } from 'react';
import Panel from './Panel';


function App() {
  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [panel3, setPanel3] = useState("");
  const [view1, setv1] = useState(true)
  const [view2, setv2] = useState(false)
  const [view3, setv3] = useState(false)

  const URL_HUB = 'https://chivo-hub-dev.api.chivowallet.com/api/v1/'
  useEffect(() => {

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/1`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { data } = response
        setPanel1(data?.EmbedUrl)
      });

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/2`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { data } = response
        console.log("🚀 ~ .then ~ data:", data)
        setPanel2(data?.EmbedUrl)
      });

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/3`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { data } = response
        console.log("🚀 ~ .then ~ data:", data)
        setPanel3(data?.EmbedUrl)
      });



  }, []);



  return (
    <div className='p-4 h-screen w-full'>
      {/* component */}
      <div className='h-12 flex flex-wrap gap-x-4 mb-2'>
        <button onClick={() => { setv1(true); setv2(false); setv3(false) }} className='bg-gray-200 p-2 rounded-md'>Resultados de votos general</button>
        <button onClick={() => { setv1(false); setv2(true); setv3(false) }} className='bg-gray-200 p-2 rounded-md'>Resultados de votos</button>
        <button onClick={() => { setv1(false); setv2(false); setv3(true) }} className='bg-gray-200 p-2 rounded-md'>Alertas</button>
      </div>
      {panel1 != '' && view1 && <Panel url={panel1}></Panel>}
      {panel2 != '' && view2 && <Panel url={panel2}></Panel>}
      {panel3 != '' && view3 && <Panel url={panel3}></Panel>}
    </div>
  )
}

export default App
