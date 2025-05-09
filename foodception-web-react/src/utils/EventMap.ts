import { EventTypes } from './EventTypes';
import { ValidationError } from '../types/validation';

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
    time: string;
  };
  [EventTypes.LOGIN_SUCCESS]: {
    type: typeof EventTypes.LOGIN_SUCCESS;
    time: string;
  };
  [EventTypes.SIGNUP_ERROR]: {
    type: typeof EventTypes.SIGNUP_ERROR;
    error: {
      message: string;
      details: {
        validationError: ValidationError;
        applicationError?: {
          code: string;
        };
      };
    };
    time: string;
  };
  [EventTypes.SIGNUP_SUCCESS]: {
    type: typeof EventTypes.SIGNUP_SUCCESS;
    status: string;
    member: {
      _id: string;
      contactId: string;
      loginEmail: string;
      profile: {
        slug: string;
      };
      contactDetails: {
        contactId: string;
        phones: any[];
        emails: any[];
        addresses: any[];
        customFields: Record<string, any>;
      };
      activityStatus: string;
      privacyStatus: string;
      status: string;
      lastLoginDate: string;
      _createdDate: string;
      _updatedDate: string;
      revision: string;
    };
    time: string;
  };
  [EventTypes.FORGOT_PASSWORD_SUCCESS]: {
    type: typeof EventTypes.FORGOT_PASSWORD_SUCCESS;
    time: string;
  };
  [EventTypes.FORGOT_PASSWORD_ERROR]: {
    type: typeof EventTypes.FORGOT_PASSWORD_ERROR;
    error: {
      message: string;
      details: {
        validationError: ValidationError;
        applicationError?: {
          code: string;
        };
      };
    };
    time: string;
  };
  [EventTypes.AUTH_STATE_CHANGE]: {
    isAuthenticated: boolean;
  };
  // Add more event types as needed, for example:
}

// Define callback type for event handlers
export type EventCallback<K extends keyof EventMap> = (data: EventMap[K]) => void;
