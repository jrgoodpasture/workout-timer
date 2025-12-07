import { useState, useEffect, useRef, useCallback } from 'react';
import { WorkoutConfig, WorkoutPhase, WorkoutState, WorkoutStatus } from '../types/workout';
import { useWorkoutFeedback } from './useWorkoutFeedback';

const DEFAULT_CONFIG: WorkoutConfig = {
  sets: 8,
  workInterval: 45,
  restInterval: 15,
  warmupInterval: 10,
  cooldownInterval: 60,
};

export const useWorkoutTimer = () => {
  const { announcePhase, playCountdown, announceComplete } = useWorkoutFeedback();
  const [config, setConfig] = useState<WorkoutConfig>(DEFAULT_CONFIG);
  const [state, setState] = useState<WorkoutState>({
    status: 'idle',
    phase: 'warmup',
    currentSet: 1,
    timeRemaining: DEFAULT_CONFIG.warmupInterval,
    totalDuration: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const getNextPhase = (currentPhase: WorkoutPhase, currentSet: number, totalSets: number): { phase: WorkoutPhase; set: number; duration: number } | null => {
    switch (currentPhase) {
      case 'warmup':
        return { phase: 'work', set: 1, duration: config.workInterval };
      case 'work':
        if (currentSet < totalSets) {
          return { phase: 'rest', set: currentSet, duration: config.restInterval };
        } else {
          return { phase: 'cooldown', set: currentSet, duration: config.cooldownInterval };
        }
      case 'rest':
        return { phase: 'work', set: currentSet + 1, duration: config.workInterval };
      case 'cooldown':
        return null; // Completed
    }
  };

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const tickRef = useCallback(() => {
    if (!endTimeRef.current) return;

    const now = Date.now();
    const diff = endTimeRef.current - now;
    const remainingSeconds = Math.ceil(diff / 1000);
    
    const currentState = stateRef.current;

    if (remainingSeconds <= 0) {
      const next = getNextPhase(currentState.phase, currentState.currentSet, config.sets);

      if (next) {
        announcePhase(next.phase);
        setState({
          ...currentState,
          phase: next.phase,
          currentSet: next.set,
          timeRemaining: next.duration,
          status: 'running'
        });
        endTimeRef.current = Date.now() + next.duration * 1000;
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        announceComplete();
        setState(prev => ({ ...prev, status: 'completed', timeRemaining: 0 }));
      }
    } else {
      if (currentState.timeRemaining !== remainingSeconds) {
        if (remainingSeconds <= 3) {
          playCountdown(remainingSeconds);
        }
        setState(prev => ({ ...prev, timeRemaining: remainingSeconds }));
      }
    }
  }, [config, announcePhase, playCountdown, announceComplete]);

  const startWorkout = useCallback(() => {
    const duration = config.warmupInterval > 0 ? config.warmupInterval : config.workInterval;
    const startPhase = config.warmupInterval > 0 ? 'warmup' : 'work';
    
    announcePhase(startPhase);

    setState({
      status: 'running',
      phase: startPhase,
      currentSet: 1,
      timeRemaining: duration,
      totalDuration: 0,
    });
    
    endTimeRef.current = Date.now() + duration * 1000;
  }, [config]);

  const pauseWorkout = useCallback(() => {
    if (state.status !== 'running') return;
    
    if (endTimeRef.current) {
      pausedTimeRef.current = endTimeRef.current - Date.now();
    }
    setState(prev => ({ ...prev, status: 'paused' }));
  }, [state.status]);

  const resumeWorkout = useCallback(() => {
    if (state.status !== 'paused' || !pausedTimeRef.current) return;

    endTimeRef.current = Date.now() + pausedTimeRef.current;
    pausedTimeRef.current = null;
    
    setState(prev => ({ ...prev, status: 'running' }));
  }, [state.status]);

  const resetWorkout = useCallback(() => {
    endTimeRef.current = null;
    pausedTimeRef.current = null;
    setState({
      status: 'idle',
      phase: 'warmup',
      currentSet: 1,
      timeRemaining: config.warmupInterval,
      totalDuration: 0,
    });
  }, [config]);

  // Effect to manage the interval
  useEffect(() => {
    if (state.status === 'running') {
      timerRef.current = setInterval(tickRef, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.status, tickRef]);

  // Actually, the previous `useEffect` logic for interval management was a bit shaky with the `tick` dependency.
  // Let's simplify:
  // The interval just runs `tickRef`. `tickRef` checks `endTimeRef`.
  // `stateRef` is kept up to date.

  return {
    state,
    config,
    setConfig,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
  };
};
