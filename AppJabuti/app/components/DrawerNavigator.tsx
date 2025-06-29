// app/(drawer)/DrawerNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../(drawer)/index';
import AgendamentoScreen from '../(drawer)/AgendamentoScreen';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AutoridadesScreen from '../(drawer)/AutoridadesScreen';
import MapaScreen from '../(drawer)/MapaScreen';
import FAQScreen from '../(drawer)/FAQScreen';
import RegrasDoLagoScreen from '../(drawer)/RegrasDoLagoScreen';
import HorarioFuncionamentoScreen from '../(drawer)/HorarioFuncionamentoScreen';
import FotosDoLagoScreen from '../(drawer)/FotosDoLagoScreen';
import AvaliacaoLagoScreen from '../(drawer)/AvaliacaoLagoScreen'; // Importe a nova tela

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#101B72' }}>
      <View style={{ padding: 20, backgroundColor:'#E0C200', alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <DrawerItem 
        icon="time" 
        label="Horário de Funcionamento" 
        onPress={() => navigation.navigate('HorarioFuncionamento')}
      /> 
      <DrawerItem 
          icon="map" 
          label="Mapa do Lago"
          onPress={() => navigation.navigate('MapaDoLago')}
        />
      <DrawerItem 
        icon="image" 
        label="Fotos do Lago" 
        onPress={() => navigation.navigate('FotosDoLago')}
      />
      <DrawerItem 
        icon="lock-closed" 
        label="Regras do Lago" 
        onPress={() => navigation.navigate('RegrasDoLago')}
      />
      <DrawerItem 
        icon="calendar" 
        label="Agendamento" 
        onPress={() => navigation.navigate('Agendamento')}
      />
      
      <DrawerItem 
        icon="bar-chart" 
        label="Avaliação do Lago" 
        onPress={() => navigation.navigate('AvaliacaoLago')} // Adicione a navegação
      />
      <DrawerItem
        icon ="call"
        label = "Chame as Autoridades"
        onPress={()=> navigation.navigate('ChameAutoridades')}
        />
      <DrawerItem 
        icon="help-circle" 
        label="FAQ" 
        onPress={() => navigation.navigate('FAQ')}
      />

      <View style={{ marginTop: 'auto', padding: 20 }}>
        <TouchableOpacity style={styles.authButton} onPress={() => router.push('../(auth)/login')}>
          <Text style={styles.authButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.authButton, { backgroundColor: '#FFF' }]} onPress={() => router.push('../(auth)/register')}>
          <Text style={[styles.authButtonText, { color: '#101B72' }]}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DrawerItem({ icon, label, onPress }: { icon: any; label: string, onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 16 }} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#E0C200', height: 100 }, 
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ paddingLeft: 16 }}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        ),
        headerTitle: () => (
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
        ),
        drawerStyle: {
          backgroundColor: '#101B72',
        },
        drawerLabelStyle: {
          color: '#fff',
          fontSize: 16,
          textAlign: 'center',
        },
        drawerActiveTintColor: '#E0C200',
      })}
    >
      <Drawer.Screen
        name="Home" 
        component={HomeScreen}
        options={{
          title: '',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen 
        name="Agendamento" 
        component={AgendamentoScreen} 
        options={{ title: 'Agendamento' }} 
      />
    <Drawer.Screen 
      name="MapaDoLago" 
      component={MapaScreen} 
      options={{ title: 'Mapa do Lago' }} 
    />

      <Drawer.Screen
        name="ChameAutoridades"
        component={AutoridadesScreen}
        options={{ title: 'Chame as Autoridades' }}
      />
      <Drawer.Screen 
        name="FAQ" 
        component={FAQScreen} 
        options={{ title: 'Perguntas Frequentes' }} 
      />
      <Drawer.Screen 
        name="RegrasDoLago" 
        component={RegrasDoLagoScreen} 
        options={{ title: 'Regras do Lago' }} 
      />
      <Drawer.Screen 
        name="HorarioFuncionamento" 
        component={HorarioFuncionamentoScreen} 
        options={{ title: 'Horário de Funcionamento' }} 
      />
      <Drawer.Screen 
        name="FotosDoLago" 
        component={FotosDoLagoScreen} 
        options={{ title: 'Fotos do Lago' }} 
      />
      <Drawer.Screen // Adicione a nova tela de Avaliação do Lago
        name="AvaliacaoLago" 
        component={AvaliacaoLagoScreen} 
        options={{ title: 'Avaliação do Lago' }} 
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
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