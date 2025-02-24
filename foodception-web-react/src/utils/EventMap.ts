import { EventTypes } from './EventTypes';

// Define all possible event types and their data structures
export interface EventMap {
  [EventTypes.LOGIN_ERROR]: {
    type: typeof EventTypes.LOGIN_ERROR;
    error: {
      message: string;
      details?: {
        applicationError?: {
          code: string;
        };
      };
    };
  };
  [EventTypes.AUTH_STATE_CHANGE]: {
    isAuthenticated: boolean;
  };
  // Add more event types as needed, for example:
}

// Define callback type for event handlers
export type EventCallback<K extends keyof EventMap> = (data: EventMap[K]) => void;
