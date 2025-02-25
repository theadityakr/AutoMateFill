import React, { useEffect, useState } from 'react';
import { Button } from '@shivangi_2408/effective-ui';
import { Search } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";

import { fieldPatterns } from './ProfileDataInterface';
import { ProfileItem } from '../Data/Data';

const LOCAL_STORAGE_KEY_PROFILES = "profiles";
const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile";

const FormAutoFill = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [profileData, setProfileData] = useState<ProfileItem[]>([]);
  const [profileList, setProfileList] = useState(() => {
    const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILES);
      return storedProfiles
          ? JSON.parse(storedProfiles)
          : [{ content: uuidv4(), label: "Sample" }];
    });
  
  const [selectedProfile, setSelectedProfile] = useState(() =>{
      const storedSelectedProfile = localStorage.getItem(LOCAL_STORAGE_KEY_SELECTED_PROFILE);
      return storedSelectedProfile ? JSON.parse(storedSelectedProfile) : profileList[0]
  });


  useEffect(() => {
    const parsedProfile = selectedProfile;
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