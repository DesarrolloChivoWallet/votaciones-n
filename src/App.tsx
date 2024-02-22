import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect, useMemo } from 'react';
import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk";

type FrameOptions = {
  url: string;
  container: string | HTMLElement;
  width?: string;
  height?: string;
  resizeHeightOnSizeChangedEvent?: boolean;
  withIframePlaceholder?: boolean | HTMLElement;
  className?: string;
};
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

    const embeddingContext = createEmbeddingContext();
    embeddingContext.then(({ embedDashboard }) => {
      const container1 = document.querySelector("#iframe1") as HTMLElement;

      // Create an embedding configuration
      const config: FrameOptions = {
        url: panel1,
        container: container1,
      };

      // Embed the QuickSight dashboard
      embedDashboard(config)
        .then(() => {
        })
        .catch((error) => {
          console.log("🚀 ~ useMemo ~ error:", error)
        });
    });


  }, []);


  const setPanel = (index: number) => {
    const num = index;
    const embeddingContext = createEmbeddingContext();
    embeddingContext.then(({ embedDashboard }) => {
      const container = document.querySelector(`#iframe${num}`) as HTMLElement;

      console.log("🚀 ~ embeddingContext.then ~ container:", container)
      // Create an embedding configuration
      const config: FrameOptions = {
        url: num === 1 ? panel1 : (num === 2 ? panel2 : panel3),
        container: container,
      };

      // Embed the QuickSight dashboard
      embedDashboard(config)
        .then(() => {
        })
        .catch((error) => {
          console.log("🚀 ~ useMemo ~ error:", error)
        });
    });

  }
  return (
    <div className='p-4 h-screen w-full'>
      {/* component */}
      <Tabs onSelect={(index) => setPanel(index + 1)}>
        <TabList>
          <Tab>Panel 1</Tab>
          <Tab>Panel 2</Tab>
          <Tab>Panel 3</Tab>
        </TabList>

        <TabPanel className="h-screen relative">
          <div
            id=
            "iframe1"
            className="w-full h-full"></div>
        </TabPanel>
        <TabPanel className="h-screen relative">
          <div
            id=
            "iframe2"
            className="w-full h-full"></div>
        </TabPanel>
        <TabPanel className="h-screen relative">
          <div
            id=
            "iframe3"
            className="w-full h-full"></div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
