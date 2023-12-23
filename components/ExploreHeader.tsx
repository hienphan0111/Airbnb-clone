import Colors from '../constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

const categories = [
  {
    name: 'Tiny home',
    icon: 'home',
  },
  {
    name: 'Cabin',
    icon: 'house-siding',
  },
  {
    name: 'Cottage',
    icon: 'home',
  },
  {
    name: 'Treehouse',
    icon: 'local-fire-department',
  },
  {
    name: 'Beach',
    icon: 'beach-access',
  },
  {
    name: 'Farm stay',
    icon: 'nature-people',
  },
  {
    name: 'Entire home',
    icon: 'home',
  },
  {
    name: 'Pets welcome',
    icon: 'home',
  },
  {
    name: 'Free cancellation',
    icon: 'home',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'city',
    icon: 'apartment',
  },
  {
    name: 'Airbnb Plus',
    icon: 'home',
  },
];

interface Props {
  onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const scollRef = useRef<ScrollView | null>(null);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x, y, width, height, pageX, pageY) => {
      scollRef.current?.scrollTo({ x: pageX - 100, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].name);
  };
  const handleSelect = (index: number) => {
    setActiveIndex(index);
    selectCategory(index);
  };
  return (
    <SafeAreaView style={{ marginTop: 50, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='search' size={24} />
              <View>
                <Text style={{ fontFamily: 'mon-sb', color: '#000' }}>
                  Where to?
                </Text>
                <Text style={{ fontFamily: 'mon', color: Colors.grey }}>
                  Any where . Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
            <Ionicons name='options-outline' size={24}/>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', gap: 20, paddingHorizontal: 16, }} ref={scollRef} showsHorizontalScrollIndicator={false}>
          {
            categories.map((category, index) => (
              <TouchableOpacity onPress={() => handleSelect(index)} key={index} ref={((el) => itemsRef.current[index] = el)} style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}>
                <MaterialIcons name={category.icon as any} size={24} color={activeIndex === index ? '#000' : Colors.grey } />
                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#aaac1c',
    height: 180,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    // width: 280,
    flex: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#c2c2c2',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  categoryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-b',
    color: '#000',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-b',
    color: Colors.grey,
  },
});
