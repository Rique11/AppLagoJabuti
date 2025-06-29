import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { register } from "../../services/autenticacaoService"; // ajuste o caminho
import { Alert } from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmaSenha] = useState('');
  const [cpf, setCPF] = useState('');

const handleRegister = async () => {
  if (senha !== confirmarSenha) {
    Alert.alert("Erro", "As senhas não coincidem.");
    return;
  }

  try {
    const response = await register(email, senha, cpf);
    console.log("Usuário registrado:", response);

    router.replace("/(drawer)");
  } catch (error: any) {
    console.error("Erro ao criar conta:", error.message);
    Alert.alert("Erro no registro", error.message);
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
      <Text style={styles.title}>Cadastro</Text>
      <Text style={{fontSize:14, marginLeft:40, marginBottom:5 }}>CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="xxx.xxx.xxx-x"
        placeholderTextColor={'#999'} 
        autoCapitalize="none"
        onChangeText={setCPF}
        value={cpf} 
      />
      <Text style={{fontSize:15, marginLeft:40, marginBottom:5 }}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="seuMelhorEmail@gmail.com"
        placeholderTextColor={'#999'} 
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}  
      />
      <Text style={{fontSize:15, marginLeft:40, marginBottom:5 }}>Senha:</Text>
      <TextInput
        style={styles.input} 
        placeholder="Senha"
        placeholderTextColor={'#999'} 
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />
      <Text style={{fontSize:15, marginLeft:40, marginBottom:5 }}>Confirme sua senha:</Text>
      <TextInput
        style={styles.input} 
        placeholder="Confirme sua senha"
        placeholderTextColor={'#999'} 
        secureTextEntry
        onChangeText={setConfirmaSenha}
        value={confirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
   container: {
  flex: 1,
  backgroundColor: '#fff',
},
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center', fontWeight: 'bold',  marginTop:90  },
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
  link: {     fontSize:15,
    marginTop:5,
    color: '#888',
    fontWeight: 'bold', alignSelf:'center' }
});
