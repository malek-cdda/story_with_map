 
export async function autoCompleteDeclare(
  marker: any,
  map: any,
  infoWindow: any,
  setAstor: any,
  setPlaceData: any,
  input: any
) {
  const options = {
    fields: [
      "address_components",
      "geometry",
      "icon",
      "name",
      "place_id",
      "formatted_address",
    ],
    strictBounds: false,
  };
  // find place library  = autcomplete
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place, "place name");
    setPlaceData({
      placeId: place?.place_id,
      address: place?.address_components,
      formatted_address: place?.formatted_address,
      position: {
        lat: place?.geometry?.location?.lat() ?? null,
        lng: place?.geometry?.location?.lng() ?? null,
      },
    });
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      // window.alert("No details available for input: " + place.name + "'");
      return;
    }

    // console.log(place?.geometry?.location?.lat());
    marker.setPosition(place.geometry.location);
    if (place.formatted_address) {
      map.setCenter(place.geometry.location);
      infoWindow.setContent(place?.formatted_address);
      infoWindow.setPosition(place.geometry.location);
      infoWindow.open(map);
      setAstor({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
    }
  });
}
 