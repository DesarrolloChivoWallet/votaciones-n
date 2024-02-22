import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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

    console.log("setPanel")
    fetch(`${URL_HUB}voting-dashboard/get-dashboard/1`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        const { data } = response
        setPanel1(data?.EmbedUrl)
      });

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/2`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        const { data } = response
        setPanel2(data?.EmbedUrl)
      });

    fetch(`${URL_HUB}voting-dashboard/get-dashboard/3`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        const { data } = response
        setPanel3(data?.EmbedUrl)
      });




  }, []);



  return (
    <div className='p-4 h-screen w-full'>
      {/* component */}
      <Tabs >
        <TabList>
          <Tab>Panel 1</Tab>
          <Tab>Panel 2</Tab>
          <Tab>Panel 3</Tab>
        </TabList>

        <TabPanel className="h-screen relative">
          <Panel url={panel1}></Panel>
        </TabPanel>
        <TabPanel className="h-screen relative">
          <Panel url={panel2}></Panel>
        </TabPanel>
        <TabPanel className="h-screen relative">
          <Panel url={panel3}></Panel>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
