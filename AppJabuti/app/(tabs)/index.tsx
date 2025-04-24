// app/index.tsx
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // substitua pela sua logo real
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Novidades</Text>
      <View style={styles.carouselPlaceholder}>
        <Text style={styles.carouselText}>[ Carrossel de imagens aqui ]</Text>
      </View>

      <Text style={styles.title}>Sobre o Lago Jaboti</Text>
      <Image
        source={{ uri: 'https://placekitten.com/300/200' }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur. Velit pulvinar imperdiet
        viverra lacus commodo elementum nam cras nunc...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  logo: { width: 180, height: 50, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#131B7A', marginVertical: 10 },
  carouselPlaceholder: {
    height: 150,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
  },
  carouselText: { color: '#999' },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  text: { fontSize: 14, color: '#333' },
});
