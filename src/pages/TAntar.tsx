import { IonApp, IonContent, IonPage } from '@ionic/react'
import { render, renderHook } from '@testing-library/react'
import React, { useLayoutEffect, useState } from 'react'
import { MapContainer, Marker, Popup, useMapEvents, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css'
import {
  useIonViewDidEnter,

} from '@ionic/react';
import {BiCurrentLocation,  BiPlusCircle} from 'react-icons/bi'
import { FaSearchLocation } from 'react-icons/fa';
 
const Antar: React.FC = () => {
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e:any) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

  /**
   * Trigger a 'resize' event when Page has finished rendering and animating, so leaflet map can read a consistent height value.
   */
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });
 
  return (
    <IonPage>
   
      <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={13}
    scrollWheelZoom={false}>
    <TileLayer

      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker></LocationMarker>
    
  </MapContainer>
  <div className='absolute right-2 bottom-[50px] z-[9999]'>
  <div className='flex flex-col gap-4 justify-center items-center'>
  <button  className='bg-gray-800 rounded-full p-3'>
  <BiCurrentLocation color='white' size={30}></BiCurrentLocation>
  </button>
  <button className='bg-white rounded-2xl p-3'>
  <BiPlusCircle color='blue' size={30}></BiPlusCircle>
  </button>
  </div>
  </div>
    </IonPage>
  );
}
export default Antar