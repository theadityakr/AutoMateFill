import React from "react";
import { Tabs } from "@shivangi_2408/effective-ui";

import { ProfileItem } from "../Data/Data";


type ProfilesProps = {
    selectedProfile: ProfileItem;
    profileList: ProfileItem[];
    onSelect: (profile: ProfileItem) => void;
};

const Profiles: React.FC<ProfilesProps> = ({ selectedProfile, profileList, onSelect }) => {
    const selectedIndex = profileList.findIndex(profile => profile.label === selectedProfile.label);

    return (
        <Tabs
            color="primary"
            defaultActiveIndex={selectedIndex !== -1 ? selectedIndex : 0} 
            fullWidth
            items={profileList.map(profile => ({
                label: profile.label,
                content: profile.value,
            }))}
            radius="full"
            size="md"
            variant="bordered"
            onTabChange={(index) => onSelect(profileList[index])} 
        />
    );
};

export default Profiles;
