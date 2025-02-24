import React, { useEffect, useState } from 'react';
import { Button } from '@shivangi_2408/effective-ui';
import { Search } from 'lucide-react';

import { fieldPatterns } from './UserDataInterface';
import { ProfileItem } from '../Data/Data';
import useLocalStorage from '../../Hooks/useLocalStorage';  


const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile"

const FormAutoFill = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [profileData, setProfileData] = useState<ProfileItem[]>([])
  const selectedProfile  = useLocalStorage(LOCAL_STORAGE_KEY_SELECTED_PROFILE);

  useEffect(() => {
    const parsedProfile = selectedProfile ? JSON.parse(selectedProfile) : null

    if (parsedProfile && typeof parsedProfile.content === "string") {
      const storedData = localStorage.getItem(parsedProfile.content)
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData)
          if (Array.isArray(parsedData)) {
            setProfileData(parsedData)
          } else {
            console.error("Stored data is not an array:", parsedData)
            setProfileData([])
          }
        } catch (error) {
          console.error("Error parsing stored data:", error)
          setProfileData([])
        }
      }
    }
  }, [selectedProfile])

  const findAndFillFields = () => {
    setIsSearching(true);

    // Get all input elements and textareas
    const formElements = document.querySelectorAll('input, textarea');

    formElements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;

      // Get various attributes that might help identify the field
      const id = element.id.toLowerCase();
      const name = element.getAttribute('name')?.toLowerCase() || '';
      const placeholder = element.getAttribute('placeholder')?.toLowerCase() || '';
      const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
      const type = element.getAttribute('type')?.toLowerCase() || '';

      // Get associated label if any
      let labelText = '';
      const labelElement = document.querySelector(`label[for="${element.id}"]`);
      if (labelElement) {
        labelText = labelElement.textContent?.toLowerCase() || '';
      }

      // Check for nearby text that might indicate field purpose
      let nearbyText = '';
      const previousElement = element.previousElementSibling;
      if (previousElement) {
        nearbyText = previousElement.textContent?.toLowerCase() || '';
      }

      // Combine all text sources for matching
      const textToMatch = `${id} ${name} ${placeholder} ${ariaLabel} ${labelText} ${nearbyText} ${type}`;

      // Define field patterns with proper typing

      // Try to match and fill appropriate value
      for (const [fieldName, patternList] of Object.entries(fieldPatterns)) {
        if (patternList.some((pattern: string) => textToMatch.includes(pattern))) {
          // Find matching user data entry
          const dataEntry = profileData.find(entry => entry.label === fieldName);
          
          // Only fill if the field is empty, fillable, and we have matching data
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (!element.value && dataEntry?.value) {
              element.value = dataEntry.value;
              
              // Dispatch input event to trigger any listeners
              element.dispatchEvent(new Event('input', { bubbles: true }));
              element.dispatchEvent(new Event('change', { bubbles: true }));
              
              // Add visual feedback
              element.style.backgroundColor = '#f0fff4';
              setTimeout(() => {
                element.style.backgroundColor = '';
              }, 1000);
            }
          }
        }
      }
    });

    setIsSearching(false);
  };

return (
  <div className='form-autofill flex-row'>
    <Button 
      onClick={findAndFillFields}
      disabled={isSearching}
      icon = {<Search />}
      iconPosition='left'
      radius='full'
      size='sm'
      variant='solid'
      color='primary'
    >
      {isSearching ? 'Filling...' : 'Auto Fill'}
    </Button>
    </div>
);
};

export default FormAutoFill;