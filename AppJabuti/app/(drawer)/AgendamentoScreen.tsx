import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { criarReserva, listarReservas } from "../../services/reservasService";

const AgendamentoScreen = () => {
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [hora, setHora] = useState('');
    const [atividade, setAtividade] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [horariosReservados, setHorariosReservados] = useState<string[]>([]);

    const horariosDisponiveis = [
        "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
        "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"
    ];

    const buscarHorariosReservados = async (dia: string) => {
        try {
            const reservas = await listarReservas();
            const diaFormatado = dia.split("-").reverse().join("/");

            const ocupados = reservas
                .filter((res: any) => res.dia === diaFormatado && res.quadra === "Quadra 1")
                .map((res: any) => res.hora);

            setHorariosReservados(ocupados);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar horários reservados");
        }
    };

    const handleDiaSelecionado = (day: any) => {
        setDataSelecionada(day.dateString);
        buscarHorariosReservados(day.dateString);
    };

    const handleAgendar = async () => {
        if (!dataSelecionada || !hora || !atividade || !nome || !telefone) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const diaFormatado = dataSelecionada.split("-").reverse().join("/");

            const resultado = await criarReserva({
                dia: diaFormatado,
                hora: hora,
                quadra: "Quadra 1",
                nomeAtividade: atividade,
                seuNome: nome,
                telefone: telefone,
            });

            Alert.alert("Agendamento Confirmado", `Agendado para ${dataSelecionada} às ${hora}.`);

            setHora('');
            setAtividade('');
            setNome('');
            setTelefone('');
            setDataSelecionada('');
            setHorariosReservados([]);
        } catch (error: any) {
            console.error("Erro ao agendar:", error.message);
            Alert.alert("Erro", error.message || "Não foi possível agendar");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agendamento da Quadra de Futebol</Text>

            <Calendar
                style={styles.calendar}
                onDayPress={handleDiaSelecionado}
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
                    {horariosDisponiveis.map((h) => (
                        <Picker.Item
                            key={h}
                            label={`${h}${horariosReservados.includes(h) ? " (indisponível)" : ""}`}
                            value={h}
                            enabled={!horariosReservados.includes(h)}
                            color={horariosReservados.includes(h) ? "gray" : "black"}
                        />
                    ))}
                </Picker>
            </View>

            {/* Os demais campos seguem iguais */}
            <Text style={styles.label}>Atividade</Text>
            <TextInput style={styles.input} placeholder="Ex. Jogo de futebol" value={atividade} onChangeText={setAtividade} />
            <Text style={styles.label}>Seu nome</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome..." value={nome} onChangeText={setNome} />
            <Text style={styles.label}>Seu telefone</Text>
            <TextInput style={styles.input} placeholder="(xx) xxxxx-xxxx" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />

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
