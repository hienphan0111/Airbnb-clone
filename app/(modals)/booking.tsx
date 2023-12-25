import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/defaultStyles';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { places } from '@/assets/data/places';

import DatePicker from 'react-native-modern-datepicker';

const guestsGroups = [
  {
    title: 'Adults',
    subtitle: 'Ages 13 or above',
    count: 0,
  },
  {
    title: 'Children',
    subtitle: 'Ages 2-12',
    count: 0,
  },
  {
    title: 'Infants',
    subtitle: 'Under 2',
    count: 0,
  },
  {
    title: 'Pets',
    subtitle: 'Bringing a service animal or pets?',
    count: 0,
  },
];
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Booking = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const today = new Date().toISOString().substring(0, 10);
  const [groups, setGroups] = useState(guestsGroups);
  const allClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };
  return (
    <BlurView intensity={70} style={styles.container} tint='light'>
      {/* Where */}
      <View style={styles.card}>
        {openCard !== 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name='ios-search' size={20} />
                <TextInput
                  style={styles.inputField}
                  placeholder='Search destination'
                  placeholderTextColor={Colors.grey}
                />
              </View>
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 20,
                marginBottom: 30,
              }}
            >
              {places.map((place, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPlace(index)}
                >
                  <Image
                    source={place.img}
                    style={
                      selectedPlace === index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />
                  <Text
                    style={[
                      { fontFamily: 'mon', paddingTop: 6 },
                      selectedPlace === index ? { fontFamily: 'mon-sb' } : {},
                    ]}
                  >
                    {place.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* When */}
      <View style={styles.card}>
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <Animated.View>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              When are your trip?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                current={today}
                selected={today}
                mode={'calendar'}
                options={{
                  defaultFont: 'mon',
                  borderColor: 'transparent',
                  headerFont: 'mon-sb',
                  mainColor: Colors.primary,
                }}
              />
            </Animated.View>
          </Animated.View>
        )}
      </View>
      {/* Who */}
      <View style={styles.card}>
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guess</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && (
          <Animated.View>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who's comming
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((group, index) => (
                <View key={index} style={styles.guestItem}>
                  <View>
                    <Text>{group.title}</Text>
                    <Text>{group.subtitle}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity>
                      <Ionicons
                        name='remove-circle-outline'
                        size={24}
                        color={
                          groups[index].count > 0 ? Colors.grey : '#cdcdcd'
                        }
                      />
                    </TouchableOpacity>
                    <Text>{group.count}</Text>
                    <TouchableOpacity>
                      <Ionicons
                        name='add-circle-outline'
                        size={24}
                        color={Colors.grey}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </Animated.View>
        )}
      </View>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={allClearAll}>
            <Text
              style={{
                fontFamily: 'mon-sb',
                fontSize: 16,
                textDecorationLine: 'underline',
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              defaultStyles.btn,
              {
                paddingRight: 50,
                paddingLeft: 50,
              },
            ]}
          >
            <Ionicons
              name='search-outline'
              size={24}
              color='white'
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#ABABAB',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputField: {
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});
