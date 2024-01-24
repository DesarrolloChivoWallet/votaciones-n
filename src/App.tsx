import logo from './assets/n-logo.svg';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { find } from "./api";
import pin from './assets/pin.svg'
import dummyimage from './assets/dummy.svg'
import { icon } from "leaflet";
import data from "./data/votaciones.json";
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  // const map = useMap();
  const [search, setSearch] = useState("")
  const [position, setPosition] = useState({
    lat: 13.691316,
    lng: -89.236491,
  });
  const [dataFiltered, setDataFiltered] = useState<any[]>([])
  console.log("🚀 ~ App ~ data:", dataFiltered)
  const PinMarker = icon({
    iconUrl: pin,
    iconSize: [38, 46],
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log("🚀 ~ useEffect ~ coords:", coords)
        setPosition({ lat: coords.latitude, lng: coords.longitude });
      },
      (blocked) => {
        if (blocked) {
          const fetch = async () => {
            try {
              const { data } = await axios.get("https://ipapi.co/json");
              setPosition({ lat: data.latitude, lng: data.longitude });
            } catch (err) {
              console.error(err);
            }
          };
          fetch();
        }
      }
    );
  }, []);
  useEffect(() => {
    setDataFiltered(find({ votingCenter: search }))
  }, [search])

  const RecenterAutomatically = ({ position }: { position: { lat: number, lng: number } }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([position.lat, position.lng], 18);
    }, [position]);
    return null;
  }

  // const debouncedFunction = debounce(find, 300);

  const ListItem = (item: any) => {
    return (<li onClick={() => { setPosition({ lat: item.y, lng: item.x }); setSearch("") }} className='text-xs cursor-pointer hover:bg-gray-100 p-2 rounded-md text-pretty' > {item.centro_de_votacion}</li >)
  }

  return (
    <>
      {/* component */}
      <section className="text-gray-600 body-font relative h-screen w-screen">
        <div className="bg-blue-400 w-full  sticky inset-0 h-[70px] z-10 flex-row">
          <div className='container px-4 h-full w-full flex justify-between mx-auto items-center'>
            <img src={logo} alt="Nuevas Ideas" className=' h-[50px]' />
            <h2 className='text-white text-bold text-lg'>
              Centros de votaciones - Elecciones 2024
            </h2>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 z-0">
          <div className='relative w-full h-full inset-0 max-h-screen max-w-screen'>
            <MapContainer
              center={position}
              zoom={16}
              maxZoom={20}
              attributionControl={true}
              zoomControl={false}
              zoomAnimation={true}
              fadeAnimation={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              style={{ minHeight: "100vh", minWidth: "100vw" }}>
              <RecenterAutomatically position={position}></RecenterAutomatically>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <MoveCenter lat={newPos.lat} lng={newPos.lng} /> */}
              {/* <Marker position={position} icon={PinMarker}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
              {data?.map((marker: any, index: number) => (
                <Marker
                  position={[marker.y, marker.x]}
                  icon={PinMarker}
                  key={index * Date.now()}
                // eventHandlers={{
                //   click: () => {
                //     setSelected(marker.atm_id);
                //   },
                // }}
                >
                  <Popup >
                    <div className="flex h-auto justify-start items-start w-[300px] flex-row ">
                      <img
                        className="rounded-lg"
                        src={dummyimage}
                        alt=""
                        width="80px"
                        height="50px"
                      />
                      <div className="w-full ml-2 flex flex-col gap-y-1">
                        <h3 className=" text-md font-medium text-[#101A3C] ">
                          {marker.centro_de_votacion}
                        </h3>

                        <span className="font-medium  text-xs">
                          Departamento: {marker.departamento}
                        </span>
                        <span className="font-medium  text-xs">
                          Municipio: {marker.municipio}
                        </span>

                      </div>
                    </div>
                    <div className="flex h-auto justify-start mt-2 items-start w-[300px] flex-col ">
                      {/* <div className='grid grid-cols-2 flex-row gap-x-4 justify-between'> */}
                      <span className="font-medium  text-xs">
                        Distrito: {marker.distrito}
                      </span>
                      <span className="font-medium">
                        Meta de contactos: {marker.meta_de_contactos}
                      </span>
                      {/* </div> */}
                      {/* <div className='grid grid-cols-2 flex-row gap-x-4 justify-between'> */}
                      <span className="font-medium">
                        JRV 2024: {marker.jrv_2024}
                      </span>
                      <span className="font-medium">
                        JRV No Actualizada: {marker.jrv_no_actualizada}
                      </span>
                      {/* </div> */}
                      <span className="font-medium">
                        Centro Focal: {marker.centro_focal}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div >
        <div className="container px-4 py-4 mx-auto flex z-30 ">
          <div className="lg:w-1/2 bg-white rounded-lg p-4 flex flex-row px-4 w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <div className="relative w-full ">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                value={search}
                onChange={(e) => setSearch(e.target?.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                placeholder="Buscar centro de votación"
              />
            </div>
            {search.length != 0 && <div className='shadow-xl  mr-4 rounded-lg bg-white absolute flex flex-col mt-12 p-2 overflow-scroll overscroll-hidden overscroll-x-none max-h-[500px] mx-4'>
              <ul>
                {dataFiltered.map((item) => ListItem(item))}
              </ul>
            </div>}
          </div>
        </div>
      </section >
    </>
  )
}

export default App
