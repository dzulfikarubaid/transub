import { IonApp, IonContent, IonPage } from '@ionic/react'
import { Map } from 'leaflet'
import { render, renderHook } from '@testing-library/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, useMapEvents, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './TRouting.css'
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

const createRoutineMachineLayer = (props:any) => {
    const { x1, y1, x2, y2 } = props
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
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);


const Routing: React.FC = (props:any) => {
    const { x1, y1, x2, y2 } = props
  
 
  return (

   
      <MapContainer
     style={{ width: '300px !important', height: '400px', margin: '0 auto' }}
    center={{ lat:  -7.288777649928778 , lng: 112.79206222243513 }}
    zoom={16}
    scrollWheelZoom={false}
   
    >
    <TileLayer

      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <RoutingMachine x1={x1} y1={y1} x2={x2} y2={y2}/>

    
    
    
  </MapContainer>

  );
}
export default Routing