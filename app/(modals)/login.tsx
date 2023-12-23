import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { defaultStyles } from '../../constants/defaultStyles';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum OAuthStrategy {
  Apple = 'oauth_apple',
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
}

const Login = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: 'oauth_facebook',
  });

  const onSelectAuth = async (strategy: OAuthStrategy) => {
    const selectedAuth = {
      [OAuthStrategy.Apple]: appleAuth,
      [OAuthStrategy.Google]: googleAuth,
      [OAuthStrategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log(createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            flex: 1,
          }}
        />
        <Text style={styles.seperator}>Or</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            flex: 1,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Apple)}
        >
          <Ionicons name='phone-portrait-outline' size={24} />
          <Text style={styles.btnOutlineText}>Continue with phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Apple)}
        >
          <Ionicons name='md-logo-apple' size={24} />
          <Text style={styles.btnOutlineText}>Continue with Aphle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Google)}
        >
          <Ionicons name='md-logo-google' size={24} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(OAuthStrategy.Facebook)}>
          <Ionicons name='md-logo-facebook' size={24} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginLeft: 10,
    textAlign: 'center',
  },
});
