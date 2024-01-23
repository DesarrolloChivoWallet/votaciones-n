import logo from './assets/n-logo.svg';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "./hooks";
import { find } from "./api";
import pin from './assets/pin.svg'
import dummyimage from './assets/dummy.svg'
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
                        <span className="font-medium  text-xs">
                          Distrito: {marker.distrito}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-auto justify-start mt-2 items-start w-[300px] flex-col ">
                      <span className="font-medium">
                        Meta de contactos: {marker.meta_de_contactos}
                      </span>
                      <span className="font-medium">
                        JRV 2024: {marker.jrv_2024}
                      </span>
                      <span className="font-medium">
                        JRV No Actualizada: {marker.jrv_no_actualizada}
                      </span>
                      <span className="font-medium">
                        Centro Focal: {marker.centro_focal}
                      </span>
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
