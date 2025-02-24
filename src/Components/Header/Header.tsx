import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Profiles from "./Profiles";
import AddProfile from "./AddProfile";
import { ProfileSampleData } from "../Data/SampleData";

const LOCAL_STORAGE_KEY_PROFILES = "profiles";
const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile";

const Header = () => {
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

    const [profileData, setProfileData] = useState(() => {
        const storedData = localStorage.getItem(selectedProfile?.content);
        return storedData ? JSON.parse(storedData) : {};
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_PROFILES, JSON.stringify(profileList));
        localStorage.setItem(selectedProfile?.content, JSON.stringify(profileData));
        localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_PROFILE,JSON.stringify(selectedProfile));
    }, [profileList, profileData, selectedProfile]);

    // Function to add a new profile and remove "Sample" if it's the only profile
    const addProfile = () => {
        const profileName = prompt("Enter profile name:");
        if (profileName) {
            const newProfile = { content: uuidv4(), label: profileName };

            setProfileList((prev: any[]) => {
                const updatedProfiles = prev.filter((p) => p.label !== "Sample");
                return [...updatedProfiles, newProfile];
            });

            setProfileData(ProfileSampleData);

            setSelectedProfile(newProfile);
        }
    };

    return (
        <div className="header flex-row">
            <Profiles profileList={profileList} onSelect={setSelectedProfile} />
            <AddProfile onAdd={addProfile} />
        </div>
    );
};

export default Header;
