import { useState, useEffect } from "react";

const useLocalStorage = (key: string) => {
    const [value, setValue] = useState<string | null>(localStorage.getItem(key));

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setValue(event.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    return value;
};

export default useLocalStorage