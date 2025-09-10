import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { generateNotesQuiz } from '../services/openai';
import { firebase } from '../services/firebase';

export default function HomeScreen() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState([]);

  const handleGenerate = async () => {
    if (!topic) return Alert.alert('Enter a topic');
    try {
      const data = await generateNotesQuiz(topic);
      setNotes(data.notes);
      setQuiz(data.quiz);

      // Save progress to Firebase
      const user = firebase.auth().currentUser;
      if (user) {
        const progressRef = firebase.firestore().collection('progress').doc(user.uid);
        progressRef.set({
          topics: firebase.firestore.FieldValue.arrayUnion({
            topic,
            score: 0,
            total: data.quiz.length,
            date: new Date().toLocaleDateString()
          })
        }, { merge: true });
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'text/*' });
    if (result.type === 'success') setTopic(result.name.replace(/\.[^/.]+$/, ""));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enter Topic</Text>
      <TextInput style={styles.input} placeholder="Topic" value={topic} onChangeText={setTopic} />
      <Button title="Upload File" onPress={handleUpload} />
      <Button title="Generate Notes & Quiz" onPress={handleGenerate} />

      {notes ? (
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text>{notes}</Text>

          <Text style={styles.notesTitle}>Quiz:</Text>
          {quiz.map((q, i) => (
            <Text key={i}>{i+1}. {q.question} {q.options.join(' ')}</Text>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:20, fontWeight:'bold', marginBottom:10 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginBottom:10 },
  notesContainer: { marginTop:20 },
  notesTitle: { fontWeight:'bold', fontSize:18, marginTop:10, marginBottom:5 }
});
