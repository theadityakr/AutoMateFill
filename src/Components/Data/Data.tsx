import type React from "react"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import { Button } from "@shivangi_2408/effective-ui"

import Item from "./Item"
import EditItemPopup from "./EditItemPopup"


const LOCAL_STORAGE_KEY_PROFILES = "profiles";
const LOCAL_STORAGE_KEY_SELECTED_PROFILE = "selected_profile";

export type ProfileItem = {
  label: string
  cmd: string
  value: string
}

const Data: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ProfileItem | null>(null)
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
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

  const handleItemClick = (item: ProfileItem) => {
    setSelectedItem(item)
    setIsAddingNew(false)
    setIsEditPopupOpen(true)
  }

  const handleNewItem = () => {
    setSelectedItem({ label: "", cmd: "", value: "" }) // Blank new item
    setIsAddingNew(true)
    setIsEditPopupOpen(true)
  }

  const handleItemUpdate = (updatedItem: ProfileItem) => {
    let updatedProfileData

    if (isAddingNew) {
      // Add new item
      updatedProfileData = [...profileData, updatedItem]
    } else {
      // Update existing item
      updatedProfileData = profileData.map((item) => (item.label === updatedItem.label ? updatedItem : item))
    }

    setProfileData(updatedProfileData)

    // Update local storage
    const parsedProfile = selectedProfile ? JSON.parse(selectedProfile) : null
    if (parsedProfile && typeof parsedProfile.content === "string") {
      localStorage.setItem(parsedProfile.content, JSON.stringify(updatedProfileData))
    }

    setIsEditPopupOpen(false)
  }

  return (
    <>
    <div className="data-modifications flex-row">
    <Button size="sm" radius="full" color="success" variant="bordered" onClick={handleNewItem}> Add Item</Button>
    <Button size="sm" radius="full" color="warning" variant="bordered" onClick={handleNewItem}> Update Item</Button>
    <Button size="sm" radius="full" color="danger" variant="bordered" onClick={handleNewItem}> Delete Item</Button>
    </div>
      <div className="data flex-column">  
          {profileData.map((item) => (
            <Item
              key={item.label}
              label={item.label}
              cmd={item.cmd}
              value={item.value}
              onClick={() => handleItemClick(item)}
            />
          ))}
          {isEditPopupOpen && selectedItem && (
            <EditItemPopup item={selectedItem} onUpdate={handleItemUpdate} onClose={() => setIsEditPopupOpen(false)} />
          )}
      </div>
  </>
   
  )
}

export default Data