// Hook to access EventContext without causing Fast Refresh conflicts.
import { useContext } from 'react';
import { EventContext } from './EventContext';

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
