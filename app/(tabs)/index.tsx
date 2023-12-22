import { Link } from 'expo-router';
import { View, Text } from 'react-native';

const Index = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>
        <Text>Login</Text>
      </Link>
      <Link href={'/(modals)/booking'}><Text>Booking</Text></Link>
      <Link href={'/listing/123'}><Text>Listing detail</Text></Link>
    </View>
  );
};

export default Index;
