import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ajuste o path se necessário


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", userCredential.user);
      router.replace("/(drawer)"); // redireciona após login
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      // Aqui você pode mostrar um toast ou mensagem de erro pro usuário
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center', fontWeight: 'bold' },
  input: { 
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
  button: { backgroundColor: '#007bff', padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 16, textAlign: 'center', color: '#007bff' }
});
