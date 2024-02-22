import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
function App() {
  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [panel3, setPanel3] = useState("");

  useEffect(() => {
    // fetch('https://chivo-hub-dev.api.chivowallet.com/api/v1/voting-dashboard/get-dashboard/5dcb4597-0a89-4986-a8eb-ce7168d3d635')
    //   .then((res) => {
    //     return res.json();

    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setPanel1('hello world')
    //     setPanel2('hello world')
    //     setPanel3('hello world')
    // });

    setPanel1('hello world')
    setPanel2('hello world')
    setPanel3('hello world')
  }, []);

  return (
    <div className='p-4'>
      {/* component */}
      <Tabs>
        <TabList>
          <Tab>Panel 1</Tab>
          <Tab>Panel 2</Tab>
          <Tab>Panel 3</Tab>
        </TabList>

        <TabPanel>
          {panel1}
        </TabPanel>
        <TabPanel>
          {panel2}
        </TabPanel>
        <TabPanel>
          {panel3}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
