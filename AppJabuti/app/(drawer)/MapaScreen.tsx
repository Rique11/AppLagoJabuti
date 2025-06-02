import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapaScreen() {
  const mapaURL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.894141887699!2d-51.4729348!3d-23.5677004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ec9bba768407a9%3A0x1abf9b7eb7492d05!2sLago%20Jaboti!5e0!3m2!1spt-BR!2sbr!4v1717350910593!5m2!1spt-BR!2sbr';

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <iframe
          src={mapaURL}
          width="100%"
          height="100%"
          style={styles.iframe}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.google.com/maps/place/Lago+Jaboti/@-23.5677004,-51.4729348,865m/data=!3m1!1e3!4m6!3m5!1s0x94ec9bba768407a9:0x1abf9b7eb7492d05!8m2!3d-23.5676031!4d-51.4722057!16s%2Fg%2F11jhxmhsvp' }} 
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Centraliza o iframe
    justifyContent: 'center',
  },
  iframe: {
    width: '60%',
    height: '60%',
    border: 'none', // Remove a borda do iframe
    backgroundColor: '#fff',
  },
});
