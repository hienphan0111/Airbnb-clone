import { useMemo, useState } from 'react';
import ExploreHeader from '../../components/ExploreHeader';
import Listings from '../../components/Listing';
import { Link, Stack } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import listingsData from '../../assets/data/air-bnb-listings.json';

const Page = () => {
  const [category, setCategory] = useState<string>('all');
  const onDataChange = (category: string) => {
    setCategory(category);
  }

  const listings = useMemo(() => listingsData as any, [])
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 190 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listings listings={listings} category={category} />
    </SafeAreaView>
  );
};

export default Page;
