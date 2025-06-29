import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ajuste o path se necessário
import { login } from "../../services/autenticacaoService"; // ajuste o caminho conforme sua estrutura
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native"; // ou qualquer lib de toast/mensagem de erro
import { Platform } from "react-native";
import { storeItem } from '@/services/storage';


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, senha);
      
      console.log("Usuário logado via backend:", response);
      await storeItem("userId", response.userId);
      await storeItem("userEmail", response.email);

      router.replace("/(drawer)"); // ou o caminho da sua home após login
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      Alert.alert("Erro no login", error.message); // ou use seu sistema de toast
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/logoSemFundo.png')} // certifique-se de que a logo está aqui
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.linkCadastro}>Não tem conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
},

form: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 24,
  justifyContent: 'center',
},
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFE600',
  height: 100,
  paddingHorizontal: 16,
  paddingTop: 10,
  justifyContent: 'center',
  position: 'relative',
  width:'100%'
},
backButton: {
  position: 'absolute',
  left: 16,
  top: 50,
},
backText: {
  fontSize: 24,
  color: '#000',
},
logo: {
  height: 40,
  resizeMode: 'contain',
},
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center', fontWeight: 'bold', marginTop:90 },
  input: { 
    width:'80%',
    alignSelf:'center',
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 12, 
    borderRadius: 8,
    fontSize: 16, // aumenta o tamanho da fonte
    backgroundColor: '#f8f9fa', // adiciona um fundo sutil
    shadowColor: '#000', // adiciona uma sombra sutil
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1, // sombra no Android
  },
  button: { backgroundColor: '#FFE600', padding: 14, borderRadius: 8, width:'70%', alignSelf:'center', marginTop:10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    linkCadastro:{
    fontSize:15,
    marginTop:5,
    color: '#888',
    fontWeight: 'bold',
    alignSelf:'center'
  }
});
