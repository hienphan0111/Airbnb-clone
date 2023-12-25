import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: 'mon-b',
            fontSize: 16,
            color: active === 0 ? '#000' : '#999',
            textDecorationLine: active === 0 ? 'underline' : 'none',
          }}
        >
          Stay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontFamily: 'mon-b',
            fontSize: 16,
            color: active === 1 ? '#000' : '#999',
            textDecorationLine: active === 1 ? 'underline' : 'none',
          }}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
