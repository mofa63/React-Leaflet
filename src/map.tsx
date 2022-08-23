import React , { useEffect , useRef , useState }  from 'react';
import { MapContainer, TileLayer, useMap,Marker,Popup,GeoJSON  } from 'react-leaflet'
import './App.css';
import L  from "leaflet";
import { Map as MapProp, tileLayer } from "leaflet";
import axios from 'axios';

 

export default function App() {
  const [data, setData] = React.useState();
  const [map, setMap] = useState<MapProp | null>(null);
  

  useEffect(() => {
    
     const getData = async () => {
      const daa_ = axios.get(
        "http://78.38.136.131:8082/region_total/"
      );
      const response = await daa_
      setData(response.data);  
    };
     
    getData();
      
  },[]);

  const geojsonObject = L.geoJSON(data , {
    
    onEachFeature: (feature, layer) => {
      
       const  Name  = feature.properties.reg_name;
       
      //  layer.bindPopup(`<p style="font-family: Bnazanin;">${Name}</p>`);
      layer.bindTooltip(
        '' + feature.properties.companyid,
        {
            permanent:true,
            direction:'center',
            className: 'countryLabel',
            opacity: 0.9
        }
    );

    }
  }); 
  
   useEffect(() => {
    if (!map) return;

    geojsonObject.addTo(map)
  });

   
  return (
    
    <MapContainer
        doubleClickZoom={false}
        scrollWheelZoom={true}
        id="mapId"
        zoom={9}
        center={[36.2972 ,59.6067 ]}
        ref={setMap}
      >
 
       
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

 