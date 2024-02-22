import { useState, useEffect } from 'react';
import Panel from './Panel';


function App() {
  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [panel3, setPanel3] = useState("");
  // const [viewOne, serViewOne] = useState(false)
  // const [viewOne, serViewOne] = useState(false)
  // const [viewOne, serViewOne] = useState(false)

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
      <div className='h-12 flex flex-row'>

      </div>
      {panel1 != '' && <Panel url={panel1}></Panel>}
      {panel2 != '' && <Panel url={panel2}></Panel>}
      {panel3 != '' && <Panel url={panel3}></Panel>}
    </div>
  )
}

export default App
