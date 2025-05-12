import React, { useEffect, useState } from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function CustomMap({ locations }: {
  locations: any[];
}) {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required');
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  if (!location) return null;

  return (
    <MapView
      style={{ flex: 1 }}
      region={location}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      <UrlTile
        urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />
      {locations?.length > 0 && locations.map((loc) => {
        const latitude = parseFloat(loc.latitude);
        const longitude = parseFloat(loc.longitude);
        const isValidCoordinate = !isNaN(latitude) && !isNaN(longitude);

        if (!isValidCoordinate) return null;

        return (
          <Marker
            key={loc.id}
            coordinate={{ latitude, longitude }}
            title={loc.title}
          />
        );
      })}

    </MapView>
  );
}
