import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WorkoutState, WorkoutConfig } from '../types/workout';
import { CircularProgress } from '../components/CircularProgress';

interface Props {
  state: WorkoutState;
  config: WorkoutConfig;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const { width } = Dimensions.get('window');
const TIMER_SIZE = width * 0.8;

export const WorkoutTimerScreen: React.FC<Props> = ({ state, config, onPause, onResume, onReset }) => {
  const isPaused = state.status === 'paused';

  const getBackgroundColor = () => {
    if (state.status === 'completed') return '#121212';
    switch (state.phase) {
      case 'work': return '#32CD32'; // Lime Green
      case 'rest': return '#FF4500'; // Orange Red
      case 'warmup': return '#FFD700'; // Gold
      case 'cooldown': return '#9370DB'; // Medium Purple
      default: return '#121212';
    }
  };

  const getPhaseLabel = () => {
    if (state.status === 'completed') return 'COMPLETED';
    return state.phase.toUpperCase();
  };

  const handlePress = () => {
    if (state.status === 'running') {
      onPause();
    } else if (state.status === 'paused') {
      onResume();
    }
  };

  // Format time as MM:SS if > 60s, else just SS
  const formatTime = (seconds: number) => {
    if (seconds < 60) return seconds.toString();
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    switch (state.phase) {
      case 'work': return config.workInterval;
      case 'rest': return config.restInterval;
      case 'warmup': return config.warmupInterval;
      case 'cooldown': return config.cooldownInterval;
      default: return 1;
    }
  };

  const progress = state.timeRemaining / getTotalDuration();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: getBackgroundColor() }]} 
      activeOpacity={0.9} 
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={styles.phaseLabel}>{getPhaseLabel()}</Text>
        
        <CircularProgress
          size={TIMER_SIZE}
          strokeWidth={15}
          progress={progress}
          color="#000000"
        >
          <Text style={styles.timerText}>
            {formatTime(state.timeRemaining)}
          </Text>
        </CircularProgress>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            SET {state.currentSet} / {config.sets}
          </Text>
        </View>

        {isPaused && (
          <View style={styles.pausedOverlay}>
            <Text style={styles.pausedText}>PAUSED</Text>
            <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Text style={styles.resetButtonText}>EXIT WORKOUT</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {state.status === 'completed' && (
           <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Text style={styles.resetButtonText}>DONE</Text>
            </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  phaseLabel: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000000', // Black text usually contrasts well with bright phase colors
    marginBottom: 20,
    letterSpacing: 2,
  },
  timerText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#000000',
    fontVariant: ['tabular-nums'], // Attempt to use monospaced numbers if font supports it
    // Note: For true monospace, we might need a specific font family like 'Courier' or 'Menlo'
    fontFamily: 'Courier', 
  },
  statsContainer: {
    marginTop: 40,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  statsText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  pausedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausedText: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  resetButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  resetButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
