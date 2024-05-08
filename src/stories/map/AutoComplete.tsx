import React, { useEffect, useState } from 'react';
import { astor } from './type';
import Script from 'next/script';
import { infoWindowDeclare, mapDeclare, markerDeclare } from './utils/map';
import { Button } from '../Button';
import { autoCompleteDeclare } from './utils/autoCompleted';
import { markerDragAble } from './utils/dragable';
import { AutoCompletePage } from './AutoCompletePage';

export const AutoComplete = ({
    mapId,
    mapView,
    setMapView,
    autoComplete,
    dragable,
    streetView,
}:{
    mapId:string,
    mapView:boolean,
    setMapView:(value:boolean)=>void,
    autoComplete:boolean,
    dragable:boolean,
    streetView:boolean
}) => {
    const [error, setError] = useState(false);
    let [astor, setAstor] = useState<astor>({ lat: 40.7128, lng: -74.006 });
    const [placeData, setPlaceData] = useState<any>({});

    useEffect(()=>{
        async function initMap() {
         const {map,AdvancedMarkerElement} = await   mapDeclare(astor,mapId)
         const { infoWindow } = await infoWindowDeclare(map);
         const { marker } = await markerDeclare(map);
         const input = document.querySelector<HTMLInputElement>(".pac-input");
       autoCompleteDeclare(
            marker,
            map,
            infoWindow,
            setAstor,
            setPlaceData,
            input
          );
          dragable &&
          markerDragAble(
            map,
            infoWindow,
            AdvancedMarkerElement,
            setPlaceData,
            setAstor,
            astor,
            input
          );
                // view sreet for using this function you have to make streetView true
          const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("pano") as any,
            {
              position: astor,
              pov: {
                heading: 265,
                pitch: 0,
              },
              disableDefaultUI: true,
              controlSize: 0,
            }
          );
          panorama.addListener("position_changed", (e: any) => {
            const panoramaPosition = panorama.getPosition();
          });
    
          map.setStreetView(panorama);
          // // map.getStreetView();
          panorama.setPosition(astor);
          const svService = new google.maps.StreetViewService();
          // Check if Street View is available at the specified location
          svService.getPanorama({ location: astor, radius: 50 }, (data, status) => {
            if (status === google.maps.StreetViewStatus.OK) {
              setError(false);
            } else {
              // Street View is not available at this location
              setError(true);
            }
          });
        }
        window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    } 
    },[astor, mapView,mapId,autoComplete,streetView , dragable])
    useEffect(() => {
        if (placeData?.formatted_address) {
          const inputValue = document.getElementById(
            "pac-input"
          ) as HTMLInputElement;
          inputValue.value = placeData?.formatted_address;
        }
      }, [placeData?.formatted_address]);
    return (
        <div>
             <div style={{
                display:'flex',
                
             }}>
  <div className='h-[300px]' style={{
                height:'300px',
                width:'50%',
                display: mapView?'none':'block'
            }} id='map' > </div>
              {streetView && (
              <>
                {!error && (
                  <>
                    <div
                      id="pano"
                      className="h-[600px] w-full rounded-l-md" style={{
                        height:'300px',
                        width:'50%'
                      }}></div>
                  </>
                )}
              </>
            )}
             </div>
          
         {  autoComplete &&  <input className='pac-input'   id="pac-input" />}
         {placeData?.formatted_address && autoComplete   && (
          <AutoCompletePage placeData={placeData} />
        )}
            <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places,drawing&v=weekly&v=weekly`}
        defer></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
        </div>
    );
};

 