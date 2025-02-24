import React from "react";
import { Button } from "@shivangi_2408/effective-ui";

interface AddProfileProps {
    onAdd: () => void;
}

const AddProfile: React.FC<AddProfileProps> = ({ onAdd }) => {
    return (
        <Button
            color="primary"
            onClick={onAdd}
            radius="full"
            size="lg"
            variant="bordered"
        >
            Add Profile
        </Button>
    );
};

export default AddProfile;
