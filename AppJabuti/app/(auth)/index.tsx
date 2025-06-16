import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
export default function LoginScreen() {
      const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Topo amarelo com logo */}
      <View style={styles.header}>
        <Image source={require('../../assets/logoSemFundo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Parte inferior com os botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginText}>Iniciar Sessão</Text>
        </TouchableOpacity>
        <View style={styles.containerLine}>
            <View style={styles.line} />
                <Text style={styles.orText}>OU</Text>
            <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../assets/google-icon.png')}
            style={styles.googleIcon} 
          />
          <Text style={styles.googleText}>Entrar com Google</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.linkCadastro}>Não tem conta? Cadastre-se aqui</Text>
        </TouchableOpacity>
      </View>
      
      {/* Rodapé */}
      <Text style={styles.footerText}>© 2025 Lago Jaboti. Todos os direitos reservados.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFE600',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  logo: {
    width: 180,
    height: 180,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
    marginTop: 15
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#002147',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    marginVertical: 8,
    color: '#999',
  },
containerLine: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginVertical: 8,
},
    line: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
    marginHorizontal: 16,
  },
  googleButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFE600',
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  linkCadastro:{
    fontSize:15,
    marginTop:5,
    color: '#888',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 10,
    color: '#888',
    marginBottom: 10,
  },
});
