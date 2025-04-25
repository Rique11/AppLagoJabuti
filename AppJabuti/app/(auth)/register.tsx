import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ou onde estiver o seu arquivo

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleRegister = async () =>  {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log("Usuário criado:", userCredential.user);
      router.replace("/(drawer)"); // redireciona após login
    } catch (error: any) {
      console.error("Erro ao criar conta:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8 },
  button: { backgroundColor: '#28a745', padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 16, textAlign: 'center', color: '#007bff' }
});
