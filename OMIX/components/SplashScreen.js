import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Animatable.Image animation="bounceIn" duration={2000} source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.appName}>OMIX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  logo: { width:200, height:200 },
  appName: { fontSize:30, fontWeight:'bold', marginTop:20, color:'#333' },
});
