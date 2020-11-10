import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./DefaultMapMarker"
import { v4 as uuidv4 } from 'uuid';

const Map = ({defaultCenter, defaultZoom, KEY, links = []}) => {

    const [markers, setMarkers] = useState(links)
    const [origin, setOrigin] = useState(undefined)
    const [destination, setDestination] = useState(undefined)
    const [waypoints, setWaypoints] = useState([])
    const [directions, setDirections] = useState([])
    const [center, setCenter] = useState(undefined)
    const [mapId, setMapId] = useState(uuidv4())

    const mapRef = useRef(null)
    
    useEffect(() => {
        const lat = links && links[0] && links[0].lat 
        const lng = links && links[0] && links[0].lng
    
        setCenter({
            lat: lat,
            lng: lng
        })

        let markers = []

        links && links.map(link => {
            if (link.lat && link.lng) {
                markers.push({
                    ...link,
                    lat: link.lat,
                    lng: link.lng
                })
            }
        })

        setOrigin(markers && markers[0])
        setDestination(markers && markers[markers.length-1])

        let newWaypoints = [];

        markers && markers.map((marker, index) => {

            if (index > 0 && index < markers.length-1) {
                newWaypoints.push({
                    location: marker.lat + "," + marker.lng
                })
            }

        })

        setWaypoints(newWaypoints)
        setMarkers(markers)
        setMapId(uuidv4())
    
    }, [links])



    useEffect(() => {

        console.log("mapRef", mapRef.current)

    }, [mapRef.current])
    
    const renderMarker = ({lat, lng, ...props}, index) => {

        return (
            <Marker lat={lat} lng={lng} index={index} {...props} />
        )

    }

    const drawDirections = (google, result) => {

        const path = result.routes[0].overview_path

        const roundTripPath = new google.maps.Polyline({
            map: google.map,
            path: path,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        roundTripPath.setMap(google.map);        

    }

    const getDirections = (google) => {

        const directionsService = new google.maps.DirectionsService();

        console.log('WAYPOINTS', waypoints)

        directionsService.route(
            {
              origin: origin,
              waypoints: waypoints,
              destination: destination,
              travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                  drawDirections(google, result)
                  setDirections(result)
              } else {
                setDirections("FAIL:" + result)
                //console.error(`error fetching directions ${result}`);
              }
            }
          );        
    }

    const handleApiLoaded = (google) => {

//        getDirections(google)

        const bounds = new google.maps.LatLngBounds();

        markers.map(marker => {

            const lat = marker.lat
            const lng = marker.lng

            if (lat && lng) {
                bounds.extend(new google.maps.LatLng(lat, lng))
            }


        })

        google.map.fitBounds(bounds);

    }

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                ref={mapRef}
                key={mapId}
                bootstrapURLKeys={{ key: KEY }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                center={center}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
                >
                {markers && markers.map(renderMarker)}
            </GoogleMapReact>
        </div>
      );

}

Map.defaultProps = {
    KEY: "AIzaSyA0UKwjqalA0BdK5GBh8RPR9HJjtifWLAg",
    defaultCenter: {
        lat: 59.95,
        lng: 30.33
    },
    defaultZoom: 14
}


export default Map;