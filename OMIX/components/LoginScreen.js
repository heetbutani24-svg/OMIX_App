import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { firebase } from '../services/firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({ clientId:'YOUR_GOOGLE_CLIENT_ID' });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential)
        .then(() => navigation.replace('Home'))
        .catch(err => Alert.alert('Google Login Error', err.message));
    }
  }, [response]);

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({ clientId:'YOUR_FACEBOOK_APP_ID' });
  React.useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { access_token } = fbResponse.params;
      const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
      firebase.auth().signInWithCredential(credential)
        .then(() => navigation.replace('Home'))
        .catch(err => Alert.alert('Facebook Login Error', err.message));
    }
  }, [fbResponse]);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>Welcome to OMIX</Animatable.Text>

      <TouchableOpacity style={styles.googleBtn} onPress={() => promptAsync()}>
        <Text style={styles.btnText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fbBtn} onPress={() => fbPromptAsync()}>
        <Text style={styles.btnText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', padding:20 },
  title: { fontSize:24, fontWeight:'bold', color:'#333', marginBottom:40 },
  googleBtn: { backgroundColor:'#db4a39', padding:15, width:'80%', borderRadius:10, marginBottom:15, alignItems:'center' },
  fbBtn: { backgroundColor:'#4267B2', padding:15, width:'80%', borderRadius:10, alignItems:'center' },
  btnText: { color:'#fff', fontSize:16, fontWeight:'bold' }
});
