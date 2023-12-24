import { useMemo, useState } from 'react';
import ExploreHeader from '../../components/ExploreHeader';
import Listings from '../../components/Listing';
import { Link, Stack } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import listingsData from '../../assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsGeoData from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [category, setCategory] = useState<string>('all');
  const onDataChange = (category: string) => {
    setCategory(category);
  }

  const listings = useMemo(() => listingsData as any, []);
  const listingsGeo = useMemo(() => listingsGeoData as any, []);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      {/* <Listings listings={listings} category={category} /> */}
      <ListingsMap listingsGeo={listingsGeo} />
      <ListingsBottomSheet listings={listings} category={category} />
    </SafeAreaView>
  );
};

export default Page;
