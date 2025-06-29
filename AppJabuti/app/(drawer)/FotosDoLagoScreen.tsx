// app/(drawer)/FotosDoLagoScreen.tsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { View, Text, StyleSheet, ScrollView, Platform, Image } from 'react-native';

// Define RowsPhotoAlbum and photos outside the conditional block
let RowsPhotoAlbumComponent: any = null; // Use a different name to avoid conflict
const photos = [
  { src: 'https://media-cdn.tripadvisor.com/media/photo-s/10/84/fc/cf/vista-de-dentro-do-pedalinho.jpg', width: 550, height: 413 },
  { src: 'https://site.sanepar.com.br/sites/site.sanepar.com.br/files/imagecache/800x600/1_a_-_29092021_-_apucarana_-_mutirao_de_limpeza_lago_jaboti_-_principal_todos.jpeg', width: 800, height: 600},
  { src: 'https://jornalreporterdovale.com/wp-content/uploads/2023/03/JABOTI-3.jpg', width: 512, height: 348 },
];

export default function FotosDoLagoScreen() {
  const [isWebPhotoAlbumLoaded, setIsWebPhotoAlbumLoaded] = useState(false);

  useEffect(() => {
        setIsWebPhotoAlbumLoaded(true);
  }, []);

  if (Platform.OS === 'web') {
    if (!isWebPhotoAlbumLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando fotos...</Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Fotos do Lago</Text>
        <Text style={styles.subtitle}>Confira a beleza do nosso lago em diferentes ângulos!</Text>
        <View style={styles.albumContainer}>
          {RowsPhotoAlbumComponent && <RowsPhotoAlbumComponent photos={photos} layout="rows" />}
        </View>
      </ScrollView>
    );
  }

  // Fallback para React Native puro (iOS/Android)
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fotos do Lago</Text>
      <Text style={styles.subtitle}>
        A funcionalidade de álbum de fotos avançada não está disponível na versão nativa.
      </Text>
      <Text style={styles.infoText}>
        Para ver a galeria completa, acesse a versão web do aplicativo ou veja algumas fotos abaixo:
      </Text>
      {/* Exemplo de uma galeria simples de fallback para React Native puro */}
      {photos.map((photo, index) => (
        <Image key={index} source={{ uri: photo.src }} style={styles.fallbackImage} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#1a237e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a237e',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  albumContainer: {
    // Estilos para o contêiner do álbum, se necessário
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  fallbackImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 8,
  }
});