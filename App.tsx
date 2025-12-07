import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useWorkoutTimer } from './src/hooks/useWorkoutTimer';
import { WorkoutConfigScreen } from './src/screens/WorkoutConfigScreen';
import { WorkoutTimerScreen } from './src/screens/WorkoutTimerScreen';

export default function App() {
  const {
    state,
    config,
    setConfig,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
  } = useWorkoutTimer();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {state.status === 'idle' ? (
          <WorkoutConfigScreen
            config={config}
            onConfigChange={setConfig}
            onStart={startWorkout}
          />
        ) : (
          <WorkoutTimerScreen
            state={state}
            config={config}
            onPause={pauseWorkout}
            onResume={resumeWorkout}
            onReset={resetWorkout}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
  },
});
