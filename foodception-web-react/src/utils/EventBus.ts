import { EventMap, EventCallback } from './EventMap';

class EventBus {
  private static listeners: {
    [K in keyof EventMap]?: EventCallback<K>[];
  } = {};

  static subscribe<K extends keyof EventMap>(event: K, callback: EventCallback<K>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    const listeners = this.listeners[event]!;
    listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  static publish<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    const listeners = this.listeners[event];
    if (listeners) {
      [...listeners].forEach(callback => callback(data));
    }
  }
}

export default EventBus;
