import { IonApp, IonContent, IonPage } from '@ionic/react'
import { Map } from 'leaflet'
import { render, renderHook } from '@testing-library/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, useMapEvents, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './TLeafletlogo.css'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import '../theme/variables.css'
import {
  useIonViewDidEnter,

} from '@ionic/react';

import {BiCurrentLocation,  BiPlusCircle} from 'react-icons/bi'
import { FaSearchLocation } from 'react-icons/fa';
import { Preferences } from '@capacitor/preferences'
import { useHistory } from 'react-router'
import axios from 'axios'

const Jemput: React.FC = () => {
    const [outputPosition, setOutputPosition] = useState<any>({
      lat: '',lng:''
    })
  const history = useHistory();
  function geoLocation() {
    const [location, setLocation] = useState<{
      loaded: boolean;
      coordinates?: { lat: string; lng: string };
      Error?: any;
    }>({
      loaded: false,
    });
  
    const onSuccess = (location: any) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    };
  
    const onError = (Error: any) => {
      setLocation({
        loaded: true,
        Error,
      });
    };
  
    useEffect(() => {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
  
    return location;
  }
  



  /**
   * Trigger a 'resize' event when Page has finished rendering and animating, so leaflet map can read a consistent height value.
   */
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });
  const ZOOM_LEVEL = 16
  const mapRef:any = useRef()
  const location:any = geoLocation()
  const [titikJemput, setTitikJemput] = useState<any>('')
  async function addLocation(){
   await Preferences.set({
    key: 'latjemput',
    value: outputPosition.lat,
  });
   await Preferences.set({
    key: 'lngjemput',
    value: outputPosition.lng,
  });
  if(outputPosition.lat){
    axios.get(
       `https://api.geoapify.com/v1/geocode/reverse?lat=${outputPosition.lat}&lon=${outputPosition.lng}&lang=id&apiKey=a635989136eb4253bdd4b000412173c6`
     )
   .then((res:any)=>{
       setTitikJemput(res.data.features[0]['properties']['formatted'].toString())
       Preferences.set({
         key: 'titikjemput',
         value: res.data.features[0]['properties']['formatted'].toString()
       })
   })
   .catch((err)=>{
       console.log(err)
   })
   }
  console.log(outputPosition.lat, outputPosition.lng)
  history.goBack()

  }
  const [userLocation, setUserlocation] = useState(false)
  const [map, setMap] = useState<Map|null>(null)
  function FlyToButton() {
  const onClick = () => {
    setUserlocation(true)
    map?.flyTo([location.coordinates.lat, location.coordinates.lng], ZOOM_LEVEL)
    setOutputPosition(location.coordinates)
};
    
  return <button  className='bg-gray-800 rounded-full p-3' onClick={onClick}>
  <BiCurrentLocation color='white' size={30} ></BiCurrentLocation>
  </button>
}
const center = { lat:  -7.288777649928778 , lng: 112.79206222243513 }

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker:any = markerRef.current
          if (marker != null) {
            setUserlocation(false)
            setPosition(marker.getLatLng())
            setOutputPosition(marker.getLatLng())
            console.log(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
  
 
  return (
    <IonPage>
   
      <MapContainer
     
    center={{ lat:  -7.288777649928778 , lng: 112.79206222243513 }}
    zoom={16}
    scrollWheelZoom={false}
    ref={setMap}
    >
    <TileLayer
    url = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    subdomains= {['mt0','mt1','mt2','mt3']}
    maxZoom={20}

// url="https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=LQSbQNKkuQysgah4V5mNAwvuaRXl7jODkexfifakY8BuWYbrv5kA7DU9FNxzHrkt"
// maxZoom={22}
// subdomains={'abcd'}
    />

      <Marker ref={markerRef} eventHandlers={eventHandlers} draggable={true} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41],})} position={
        userLocation? 
        [location.coordinates.lat, location.coordinates.lng]
        :
        position
        }></Marker>

    
    
    
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
export default Jemput