import { IonApp, IonContent, IonPage } from '@ionic/react'
import { Map } from 'leaflet'
import { render, renderHook } from '@testing-library/react'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, useMapEvents, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css'
import {
  useIonViewDidEnter,

} from '@ionic/react';

import {BiCurrentLocation,  BiPlusCircle} from 'react-icons/bi'
import { FaSearchLocation } from 'react-icons/fa';
import { Preferences } from '@capacitor/preferences'
import { useHistory } from 'react-router'

const Antar: React.FC = () => {
  const history = useHistory();
  function geoLocation(){
    const [location, setLocation] = useState({
    loaded: false,
    coordinates: {lat:'', lang:''}
  })
  const onSuccess = (location:any)=> {
    setLocation({
      loaded:true,
      coordinates:{
        lat:location.coords.latitude,
        lang: location.coords.longitude,
      }
    }) 
  }
  const onError = (Error:any) =>{
    setLocation(
      {
        loaded:true,
        Error
      }
    )

  }
  useEffect(()=>{
    if(!("geolocation" in navigator)){
      onError({
        code:0,
        message:"Geolocation not supported"
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  },[])
  return location
  }



  /**
   * Trigger a 'resize' event when Page has finished rendering and animating, so leaflet map can read a consistent height value.
   */
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });
  const ZOOM_LEVEL = 13
  const mapRef:any = useRef()
  const location:any = geoLocation()

  async function addLocation(){
   await Preferences.set({
    key: 'lat',
    value: location.coordinates.lat,
  });
   await Preferences.set({
    key: 'lang',
    value: location.coordinates.lang,
  });
  console.log(location.coordinates)
  history.goBack()

  }
  const [map, setMap] = useState<Map|null>(null)
  function FlyToButton() {
  const onClick = () => map?.flyTo([location.coordinates.lat, location.coordinates.lang], ZOOM_LEVEL);
    
  return <button  className='bg-gray-800 rounded-full p-3' onClick={onClick}>
  <BiCurrentLocation color='white' size={30} ></BiCurrentLocation>
  </button>
}
 
  return (
    <IonPage>
   
      <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={13}
    scrollWheelZoom={false}
    ref={setMap}
    >
    <TileLayer

      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {location.loaded && !location.error}(
      <Marker position={[location.coordinates.lat, location.coordinates.lang]}></Marker>
    )
    
  </MapContainer>
  <div className='absolute right-2 bottom-[50px] z-[9999]'>
  <div className='flex flex-col gap-4 justify-center items-center'>
  <FlyToButton></FlyToButton>
  <button className='bg-white rounded-2xl p-3' onClick={addLocation}>
  <BiPlusCircle color='blue' size={30}></BiPlusCircle>
  </button>
  </div>
  </div>
    </IonPage>
  );
}
export default Antar