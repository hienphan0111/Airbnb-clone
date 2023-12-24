import { defaultStyles } from '@/constants/defaultStyles';
import { ListingsGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { memo } from 'react';

interface Props {
  listingsGeo: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122.03,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = memo(({ listingsGeo }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: ListingsGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
        renderCluster={renderCluster}
      >
        {listingsGeo.features.map((listing: ListingsGeo) => (
          <Marker
            key={listing.properties.id}
            onPress={() => onMarkerSelected(listing)}
            coordinate={{
              latitude: +listing.properties.latitude,
              longitude: +listing.properties.longitude,
            }}
            title={listing.properties.name}
            description={listing.properties.price.toString()}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>${listing.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {},
});
