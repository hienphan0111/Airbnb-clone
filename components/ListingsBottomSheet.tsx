import { Listing } from '@/interfaces/listing';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import Listings from './Listing';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: Listing[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const [refresh, setRefresh] = useState(0);
  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      enablePanDownToClose={false}
      index={1}
    >
      <View style={{ flex: 1 }}>
        <Listings listings={listings} category={category} refresh={refresh} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: 'white'}}>Map</Text>
            <Ionicons name='map' size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    gap: 8,
  },
  sheetContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  }
})