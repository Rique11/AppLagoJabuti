import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';
import * as Linking from 'expo-linking';
import { registrarAvistamento } from '@/services/avistamentoService';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';


export default function AutoridadesScreen() {
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    const [aparencia, setAparencia] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [confirmado, setConfirmado] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

const pickImage = async () => {
  // Pede permissão
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.status !== 'granted') {
    Alert.alert("Permissão necessária", "Você precisa permitir acesso à galeria.");
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
    base64: true, // <-- ISSO aqui é o que ativa o base64
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const base64Image = result.assets[0].base64;
    if (base64Image) {
      setPhoto(`data:image/jpeg;base64,${base64Image}`);
    }
  }
};

    const handleEmergencyCall = () => {
        Linking.openURL('tel:190');
    };

    const handleSend = async () => {
    if (!confirmado) {
        Alert.alert('Confirmação necessária', 'Você deve confirmar que a situação requer intervenção.');
        return;
    }
  setIsLoading(true); // Ativa o loading

    try {
        const dataAtual = new Date();
        const data = dataAtual.toLocaleDateString("pt-BR");
        const horario = dataAtual.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

        await registrarAvistamento({
        descricao,
        local,
        data,
        horario,
        suspeito: aparencia,
        nomeRelator: nome,
        telefone,
        fotoUrl: photo || undefined,
        });

        Alert.alert('Enviado', 'Sua mensagem foi enviada para as autoridades.');

        setDescricao('');
        setLocal('');
        setAparencia('');
        setNome('');
        setTelefone('');
        setPhoto(null);
        setConfirmado(false);

    } catch (error: any) {
        console.error("Erro ao registrar:", error);
        Alert.alert("Erro", error.message || "Erro ao enviar avistamento.");
    }finally {
        setIsLoading(false); // Desativa o loading
    }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chame as Autoridades</Text>

            <Text style={styles.label}>Viu algo estranho?</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. Possível furto..."
                value={descricao}
                onChangeText={setDescricao}
            />

            <Text style={styles.label}>Em qual lugar do Lago?</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. Perto do quiosque..."
                value={local}
                onChangeText={setLocal}
            />

            <Text style={styles.label}>Como se parece?</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. Rapaz de capuz, casaco azul, bermuda verde..."
                value={aparencia}
                onChangeText={setAparencia}
            />

            <Text style={styles.label}>Seu nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu nome..."
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Seu número de telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="(xx) xxxxx-xxxx"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
            />

            <Text style={styles.label}>Enviar uma foto (opcional):</Text>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Selecionar Foto</Text>
            </TouchableOpacity>
            {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}

            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => setConfirmado(!confirmado)} style={styles.checkbox}>
                    <View style={confirmado ? styles.checkedBox : styles.uncheckedBox} />
                </TouchableOpacity>
                <Text style={styles.checkboxText}>
                    Eu confirmo que a situação descrita exige intervenção das autoridades locais
                    e que se trata de uma atividade suspeita séria.
                </Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#1a237e" style={{ marginVertical: 20 }} />
            ) : (
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Enviar avistamento</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.urgente}>! URGENTE !</Text>
            <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
                <Text style={styles.emergencyButtonText}>ACIONAR AUTORIDADES NO LOCAL</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a237e',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#f4f4f4',
    },
    photoButton: {
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    photoButtonText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginTop: 8,
        marginBottom: 16,
        borderRadius: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    checkbox: {
        marginTop: 4,
        marginRight: 8,
    },
    uncheckedBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    checkedBox: {
        width: 20,
        height: 20,
        backgroundColor: '#1a237e',
    },
    checkboxText: {
        flex: 1,
        fontSize: 13,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#1a237e',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    urgente: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10,
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: 18,
    },
    emergencyButton: {
        backgroundColor: '#d32f2f',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 40,
    },
    emergencyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
