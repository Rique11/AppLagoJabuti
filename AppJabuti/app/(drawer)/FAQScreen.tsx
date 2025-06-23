// app/(drawer)/FAQScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const faqData = [
  {
    question: 'Qual o horário de funcionamento do Lago Jaboti?',
    answer: 'O lago está aberto diariamente das 06:00 às 22:00, mas algumas atividades específicas podem ter horários diferenciados.'
  },
  {
    question: 'É permitido pescar no Lago Jaboti?',
    answer: 'A pesca não é permitida no Lago, mesmo havendo a existência de peixes na região.'
  },
  {
    question: 'Posso levar meu animal de estimação?',
    answer: 'Animais de estimação são permitidos, desde que estejam na coleira e que seus dejetos sejam recolhidos. Raças consideradas perigosas devem usar focinheira.'
  },
  {
    question: 'Existe estacionamento no local?',
    answer: 'Sim, há estacionamento gratuito disponível para visitantes, com vagas preferenciais para idosos e pessoas com deficiência.'
  },
  {
    question: 'É permitido fazer piqueniques?',
    answer: 'Piqueniques são permitidos, mas é necessário levar todo o lixo de volta e respeitar as áreas designadas para isso.'
  },
];

export default function FAQScreen() {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Perguntas Frequentes (FAQ)</Text>

      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            <Ionicons
              name={expanded[index] ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#1a237e"
            />
          </TouchableOpacity>
          {expanded[index] && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
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
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Allows text to wrap
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    paddingLeft: 10,
  },
});