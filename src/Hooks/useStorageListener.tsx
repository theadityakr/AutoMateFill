import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook that syncs state with localStorage and listens for changes
 * @param key - The localStorage key to listen to
 * @param initialValue - The default value if no value exists in localStorage
 * @returns [value, setValue] - The current value and a function to update it
 */
function useStorageListener<T>(
  key: string, 
  initialValue: T | (() => T)
): [T, (value: T | ((val: T) => T)) => void] {
  // Key ref to track changes to the key parameter
  const keyRef = useRef(key);
  
  // Initialize state with value from localStorage or initialValue
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // If item exists in localStorage, use it, otherwise use initialValue
      return item ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key, value } }));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Listen for changes to localStorage from other components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error during storage event for key "${key}":`, error);
        }
      }
    };

    // Handle custom storage event for same-tab updates
    const handleCustomStorageEvent = (e: CustomEvent<{key: string, value: any}>) => {
      if (e.detail && e.detail.key === key) {
        // Already handled by the state update that triggered this event
        return;
      }
      
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const newValue = JSON.parse(item);
          // Only update if the value has changed
          setValue(prev => {
            const prevString = JSON.stringify(prev);
            const newString = JSON.stringify(newValue);
            return prevString !== newString ? newValue : prev;
          });
        }
      } catch (error) {
        console.error(`Error during custom storage event for key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-update', handleCustomStorageEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleCustomStorageEvent as EventListener);
    };
  }, [key]);

  // Update state if key changes
  useEffect(() => {
    if (keyRef.current !== key) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setValue(JSON.parse(item));
        } else {
          // If the item doesn't exist for the new key, use the initialValue
          setValue(initialValue instanceof Function ? initialValue() : initialValue);
        }
        keyRef.current = key;
      } catch (error) {
        console.error(`Error when key changed from "${keyRef.current}" to "${key}":`, error);
      }
    }
  }, [key, initialValue]);

  return [value, setValue];
}

export default useStorageListener;