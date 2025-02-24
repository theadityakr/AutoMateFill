import React, { useEffect, useState } from 'react';
import { Button } from '@shivangi_2408/effective-ui';
import { Search } from 'lucide-react';

import { fieldPatterns } from './ProfileDataInterface';
import { ProfileItem } from '../Data/Data';
import useLocalStorage from '../../Hooks/useLocalStorage';


const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile";

const FormAutoFill = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [profileData, setProfileData] = useState<ProfileItem[]>([]);
  const selectedProfile = useLocalStorage(LOCAL_STORAGE_KEY_SELECTED_PROFILE);

  useEffect(() => {
    const parsedProfile = selectedProfile ? JSON.parse(selectedProfile) : null;

    if (parsedProfile && typeof parsedProfile.content === "string") {
      const storedData = localStorage.getItem(parsedProfile.content);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            setProfileData(parsedData);
          } else {
            console.error("Stored data is not an array:", parsedData);
            setProfileData([]);
          }
        } catch (error) {
          console.error("Error parsing stored data:", error);
          setProfileData([]);
        }
      }
    }
  }, [selectedProfile]);

  const findAndFillFields = async () => {
    setIsSearching(true);

    try {
      // Get the current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.id) {
        // Send message to content script with profile data and patterns
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: 'fillFields',
          profileData,
          fieldPatterns
        });

        if (response.success) {
          console.log('Fields filled successfully');
        }
      }
    } catch (error) {
      console.error('Error filling fields:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className='form-autofill flex-row'>
      <Button 
        onClick={findAndFillFields}
        disabled={isSearching}
        icon={<Search />}
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