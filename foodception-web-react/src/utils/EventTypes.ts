// Define event type constants
export const EventTypes = {
  LOGIN_ERROR: 'LOGIN_ERROR' as const,
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' as const,
  FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' as const,
  AUTH_STATE_CHANGE: 'AUTH_STATE_CHANGE' as const
} as const;

// Export type for the event names
export type EventType = keyof typeof EventTypes;
