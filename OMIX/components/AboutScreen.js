import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About OMIX</Text>
      <Text style={styles.content}>
        OMIX is an AI-powered student assistant app designed to simplify learning.
        {'\n\n'}
        Features include:
        {'\n'}- Simplified notes
        {'\n'}- 10–15 quiz questions per topic
        {'\n'}- Progress tracking
        {'\n'}- Google & Facebook login
        {'\n\n'}
        Our mission is to make learning easier, faster, and more interactive for students.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:28, fontWeight:'bold', marginBottom:20, color:'#333' },
  content: { fontSize:16, lineHeight:24, color:'#555' },
});
