import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Profiles from "./Profiles";
import AddProfile from "./AddProfile";
import { extractDataFromPDF } from "../../Utils/PdfUtils";
import { ProfileItem } from "../Data/Data";


const LOCAL_STORAGE_KEY_PROFILES = "profiles";
const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    localStorage.setItem(LOCAL_STORAGE_KEY_PROFILES, JSON.stringify(profileList));
    localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_PROFILE,JSON.stringify(selectedProfile));
  }, [profileList,selectedProfile]);

  const addProfile = async (profileName: string, resumeFile: File) => {
    setIsLoading(true);
    try {
      const newProfile = { content: uuidv4(), label: profileName };
      const extractedData = await extractDataFromPDF(resumeFile);
      const newProfileData = [
        // ...ProfileSampleData,
        ...extractedData,
      ]

      setProfileList((prev: any) => {
        const updatedProfiles = prev.filter((p: any) => p.label !== "Sample")
        return [...updatedProfiles, newProfile]
      })

      
      localStorage.setItem(newProfile?.content, JSON.stringify(newProfileData));

      setSelectedProfile(newProfile);
      window.location.reload();
      
    } catch (error) {
      console.error("Error extracting data from PDF:", error)
      alert("Failed to extract data from the resume. Please try again.")
    } finally {
      setIsLoading(false);
    }
  }

  const handleProfileChange = (profile: ProfileItem) => {
    setSelectedProfile(profile);
    window.location.reload();
  } 
  return (
    <div className="header flex-row">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing resume, please wait...</p>
        </div>
      )}
      <Profiles selectedProfile = {selectedProfile} profileList={profileList} onSelect={handleProfileChange} />
      <AddProfile onAdd={addProfile} />
    </div>
  )
}

export default Header;
