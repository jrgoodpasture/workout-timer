import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { WorkoutPhase } from '../types/workout';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

export const useWorkoutFeedback = () => {
  
  useEffect(() => {
    // Configure audio session for ducking
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (e) {
        console.warn('Failed to set audio mode', e);
      }
    };
    setupAudio();
  }, []);

  const announcePhase = (phase: WorkoutPhase) => {
    // Haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Voice announcement
    const text = phase === 'work' ? 'Go!' : phase === 'rest' ? 'Rest' : phase.toUpperCase();
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 1.0,
    });
  };

  const playCountdown = (seconds: number) => {
    if (seconds > 3 || seconds <= 0) return;

    // Light haptic for countdown
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Speech.speak(seconds.toString(), {
      language: 'en',
      pitch: 1.2,
      rate: 1.2,
    });
  };

  const announceComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Speech.speak('Workout Complete!', {
      language: 'en',
    });
  };

  return {
    announcePhase,
    playCountdown,
    announceComplete,
  };
};
