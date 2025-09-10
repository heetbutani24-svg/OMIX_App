import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../services/firebase';

export default function ProgressScreen() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const progressRef = firebase.firestore().collection('progress').doc(currentUser.uid);
      progressRef.get().then(doc => {
        if (doc.exists) setProgress(doc.data().topics || []);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <FlatList
        data={progress}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text>{index+1}. {item.topic}</Text>
            <Text>Score: {item.score}/{item.total}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'bold', marginBottom:15 },
  card: { padding:10, marginBottom:10, borderRadius:8, backgroundColor:'#f1f2f6' }
});
