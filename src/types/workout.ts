export type WorkoutStatus = 'idle' | 'running' | 'paused' | 'completed';

export type WorkoutPhase = 'warmup' | 'work' | 'rest' | 'cooldown';

export interface WorkoutConfig {
  sets: number;
  workInterval: number; // in seconds
  restInterval: number; // in seconds
  warmupInterval: number; // in seconds
  cooldownInterval: number; // in seconds
}

export interface WorkoutState {
  status: WorkoutStatus;
  phase: WorkoutPhase;
  currentSet: number;
  timeRemaining: number;
  totalDuration: number; // Total time elapsed or total workout time? Maybe not needed for core logic yet.
}
