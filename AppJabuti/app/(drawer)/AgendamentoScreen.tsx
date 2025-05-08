import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Instale o pacote de calendário

const AgendamentoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento da Quadra de Futebol</Text>
      
      {/* Calendario */}
      <Calendar
        style={styles.calendar}
        markedDates={{
          '2025-05-10': { selected: true, marked: true, selectedColor: 'blue' },
          '2025-05-11': { selected: true, marked: true, selectedColor: 'green' },
        }}
      />
      
      <Text style={styles.subtitle}>Agende seu horário</Text>
      
      {/* adicionar os campos de agendamento (hora, atividade e tals)*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
  calendar: {
    marginBottom: 20,
  },
});

export default AgendamentoScreen;
