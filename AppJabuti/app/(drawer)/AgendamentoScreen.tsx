import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

const AgendamentoScreen = () => {
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [hora, setHora] = useState('');
    const [atividade, setAtividade] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleAgendar = () => {
        if (!dataSelecionada || !hora || !atividade || !nome || !telefone) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
            return;
        }

        Alert.alert('Agendado', `Agendamento realizado para ${dataSelecionada} às ${hora}.`);
        setHora('');
        setAtividade('');
        setNome('');
        setTelefone('');
        setDataSelecionada('');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agendamento da Quadra de Futebol</Text>

            <Calendar
                style={styles.calendar}
                onDayPress={(day) => setDataSelecionada(day.dateString)}
                markedDates={{
                    [dataSelecionada]: { selected: true, marked: true, selectedColor: '#1a237e' },
                }}
                theme={{
                    selectedDayBackgroundColor: '#1a237e',
                    todayTextColor: '#d32f2f',
                    arrowColor: '#1a237e',
                }}
            />

            <Text style={styles.label}>Horário desejado</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={hora}
                    onValueChange={(itemValue) => setHora(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um horário..." value="" />
                    <Picker.Item label="08:00 - 09:00" value="08:00 - 09:00" />
                    <Picker.Item label="09:00 - 10:00" value="09:00 - 10:00" />
                    <Picker.Item label="10:00 - 11:00" value="10:00 - 11:00" />
                    <Picker.Item label="14:00 - 15:00" value="14:00 - 15:00" />
                    <Picker.Item label="15:00 - 16:00" value="15:00 - 16:00" />
                    <Picker.Item label="16:00 - 17:00" value="16:00 - 17:00" />
                    <Picker.Item label="17:00 - 18:00" value="17:00 - 18:00" />
                </Picker>
            </View>

            <Text style={styles.label}>Atividade</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. Jogo de futebol"
                value={atividade}
                onChangeText={setAtividade}
            />

            <Text style={styles.label}>Seu nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu nome..."
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Seu telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="(xx) xxxxx-xxxx"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleAgendar}>
                <Text style={styles.sendButtonText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

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
    calendar: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#f4f4f4',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#f4f4f4',
    },
    sendButton: {
        backgroundColor: '#1a237e',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AgendamentoScreen;
