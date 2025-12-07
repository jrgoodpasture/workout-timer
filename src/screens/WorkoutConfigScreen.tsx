import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { WorkoutConfig } from '../types/workout';

interface Props {
  config: WorkoutConfig;
  onConfigChange: (config: WorkoutConfig) => void;
  onStart: () => void;
}

export const WorkoutConfigScreen: React.FC<Props> = ({ config, onConfigChange, onStart }) => {
  const updateConfig = (key: keyof WorkoutConfig, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    onConfigChange({ ...config, [key]: numValue });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout Setup</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rounds</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={config.sets.toString()}
          onChangeText={(text) => updateConfig('sets', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Work (sec)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={config.workInterval.toString()}
          onChangeText={(text) => updateConfig('workInterval', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rest (sec)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={config.restInterval.toString()}
          onChangeText={(text) => updateConfig('restInterval', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Warmup (sec)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={config.warmupInterval.toString()}
          onChangeText={(text) => updateConfig('warmupInterval', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cooldown (sec)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={config.cooldownInterval.toString()}
          onChangeText={(text) => updateConfig('cooldownInterval', text)}
        />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startButtonText}>START WORKOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark mode bg
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#aaaaaa',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    fontSize: 24,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  startButton: {
    backgroundColor: '#32CD32',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
