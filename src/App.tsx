import logo from './assets/n-logo.svg';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "./hooks";
import { find } from "./api";
import pin from './assets/pin.svg'
import { icon } from "leaflet";

function App() {
  const { position } = useMap();
  const data = find();
  console.log("🚀 ~ App ~ data:", data)
  const PinMarker = icon({
    iconUrl: pin,
    iconSize: [38, 46],
  });

  return (
    <>
      {/* component */}
      <section className="text-gray-600 body-font relative h-screen w-screen">
        <div className="bg-blue-400 w-full  sticky inset-0 h-[70px] z-10 flex-row">
          <div className='container h-full w-full flex justify-between mx-auto items-center'>
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
              zoom={20}
              scrollWheelZoom={true}
              style={{ minHeight: "100vh", minWidth: "100vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <Marker position={position} icon={PinMarker}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
              {data?.map((marker: any) => (
                <Marker
                  position={[marker.y, marker.x]}
                  icon={PinMarker}
                  key={marker.y}
                // eventHandlers={{
                //   click: () => {
                //     setSelected(marker.atm_id);
                //   },
                // }}
                >
                  <Popup className="w-auto h-auto">
                    <div className="flex w-auto h-auto">
                      <img
                        className="rounded"
                        src={marker.thubmnail}
                        alt=""
                        width="120px"
                        height="50px"
                      />
                      <div className="w-full ml-2">
                        <span className="text-gray-500 block text-[10px] my-1">
                          Tipo de Chivo: {marker.catergory}
                        </span>
                        <span className="bold block text-[12px] my-1">{marker.place}</span>
                        <span className="text-gray-500 block text-[10px] my-1">
                          {marker.address}
                        </span>
                        <span className="bold block text-[10px] my-1">
                          {marker.municipality} - {marker.departament}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        {/* <div className="container px-5 py-24 mx-auto flex z-30">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Feedback
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Post-ironic portland shabby chic echo park, banjo fashion axe
            </p>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                defaultValue={""}
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Chicharrones blog helvetica normcore iceland tousled brook viral
              artisan.
            </p>
          </div>
        </div> */}
      </section >
    </>
  )
}

export default App
