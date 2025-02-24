import React from "react";
import { Tabs } from "@shivangi_2408/effective-ui";


type Profile = {
    content: string; 
    label: string; 
};

type ProfilesProps = {
    profileList: Profile[];
    onSelect: (profileId: string) => void;
};

const Profiles: React.FC<ProfilesProps> = ({ profileList, onSelect }) => {
    return (
        <Tabs
            color="primary"
            defaultActiveIndex={0}
            fullWidth
            items={profileList.map(profile => ({
                label: profile.label,
                content: profile.content, 
                onClick: () => onSelect(profile.content) 
            }))}
            radius="full"
            size="md"
            variant="bordered"
        />
    );
};

export default Profiles;
