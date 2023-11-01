import { IonApp, IonContent, IonPage } from '@ionic/react'
import { Map } from 'leaflet'
import { render, renderHook } from '@testing-library/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, useMapEvents, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './TRouting.css'
import './TLeafletlogo.css'
import {
  useIonViewDidEnter,

} from '@ionic/react';
import '../theme/variables.css'

import {BiCurrentLocation,  BiPlusCircle} from 'react-icons/bi'
import { FaSearchLocation } from 'react-icons/fa';
import { Preferences } from '@capacitor/preferences'
import { useHistory } from 'react-router'
import axios from 'axios'
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const customIcon = new L.Icon({
  iconUrl: 'loc.png',
  iconSize: [32, 32], // ukuran marker
  iconAnchor: [16, 32], // titik ancor di bagian bawah marker
  popupAnchor: [0, -32], // titik ancor popup
});
const createRoutineMachineLayer = (props:any) => {
    const { x1, y1, x2, y2 }:any = props
    const [waktu, setWaktu] = React.useState(0);
    const [distance, setDistance] = React.useState(0);
    const [price, setPrice] = React.useState(0);
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(x1, y1),
      L.latLng(x2, y2)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    draggableWaypoints: false,
  });
  instance.on('routesfound', function(e:any) {
    var routes = e.routes;
    var summary = routes[0].summary;
    // alert distance and time in km and minutes
    Preferences.set({
        key: 'distance',
        value: (summary.totalDistance / 1000).toFixed(2).toString(),
      });
    Preferences.set({
        key: 'waktu',
        value: Math.round(summary.totalTime % 3600 / 60).toString(),
      });
   if(summary.totalDistance/1000 > 5){
    Preferences.set({
        key: 'price',
        value: Math.round(5 * 2000 + (summary.totalDistance / 1000-5) * 1000).toString(),
    })
   }
   else{
    Preferences.set({
        key: 'price',
        value: Math.round(summary.totalDistance / 1000 * 2000).toString(),
    })
    
   }
 })
  return instance;
};



const RoutingMachine = createControlComponent(createRoutineMachineLayer);


const Routing: React.FC = (props:any) => {
    const { x1, y1, x2, y2 }:any = props
  
 
  return (

   
      <MapContainer
     style={{ width: '300px !important', height: '400px', margin: '0 auto' }}
    center={{ lat:  -7.288777649928778 , lng: 112.79206222243513 }}
    zoom={15}
    scrollWheelZoom={false}
    touchZoom={false}
    doubleClickZoom={true}
  
    >
    <TileLayer

      url="https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=LQSbQNKkuQysgah4V5mNAwvuaRXl7jODkexfifakY8BuWYbrv5kA7DU9FNxzHrkt"


    />
    <RoutingMachine x1={x1} y1={y1} x2={x2} y2={y2}/>
    {/* <Marker position={[x1, y1]} icon={customIcon}>
        <Popup>
          Marker Custom untuk Lokasi 1
        </Popup>
      </Marker>
      <Marker position={[x2, y2]} icon={customIcon}>
        <Popup>
          Marker Custom untuk Lokasi 2
        </Popup>
      </Marker> */}
    
    
    
  </MapContainer>

  );
}
export default Routing