import { useState, useEffect } from 'react';
import Panel from './Panel';


function App() {
  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [panel3, setPanel3] = useState("");
  // const [laoding, setLoading] = useState(false)
  // const [laoding2, setLoading2] = useState(false)
  // const [laoding3, setLoading3] = useState(false)

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
        setPanel2(data?.EmbedUrl)
      });

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/3`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { data } = response
        setPanel3(data?.EmbedUrl)
      });




  }, []);



  return (
    <div className='p-4 h-screen w-full'>
      {/* component */}
      <div className='h-12 flex flex-row'> </div>
      <Panel url={panel1}></Panel>
      <Panel url={panel2}></Panel>
      <Panel url={panel3}></Panel>
    </div>
  )
}

export default App
