import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../(tabs)/index'; // Importando a tela inicial
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#101B72', paddingTop: 60 }}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <DrawerItem icon="time" label="Horário de Funcionamento" />
      <DrawerItem icon="map" label="Mapa do Lago" />
      <DrawerItem icon="image" label="Fotos do Lago" />
      <DrawerItem icon="lock-closed" label="Regras do Lago" />
      <DrawerItem icon="calendar" label="Agendamento" />
      <DrawerItem icon="bar-chart" label="Avaliação do Lago" />
      <DrawerItem icon="call" label="Chame as Autoridades" />
      <DrawerItem icon="help-circle" label="FAQ" />

      <View style={{ marginTop: 'auto', padding: 20 }}>
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.authButtonText}>Login</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={[styles.authButton, { backgroundColor: '#FFF' }]}>
          <Text style={[styles.authButtonText, { color: '#101B72' }]}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

function DrawerItem({ icon, label }: { icon: any, label: string }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 16 }} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#E0C200',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
