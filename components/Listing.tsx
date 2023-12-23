import { Listing } from '../interfaces/listing';
import { defaultStyles } from '../constants/defaultStyles';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface ListingsProps {
  listings: any[];
  category: string;
}

const Listings = ({ listings, category }: ListingsProps) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    setLoading(true);
    console.log(listings.length);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderItem: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <Pressable>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeInLeft}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <Pressable
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Ionicons name='heart-outline' size={24} color={'#000'} />
          </Pressable>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Ionicons name='star' size={16} />
              <Text style={{ fontFamily: 'mon-sb' }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon' }}>${item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}> / night</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 200);
        }}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 5,
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});
