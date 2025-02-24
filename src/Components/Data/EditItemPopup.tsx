import type React from "react"
import { useState } from "react"
import { Button, Chip } from "@shivangi_2408/effective-ui"
import type { ProfileItem } from "./Data"

interface EditItemPopupProps {
  item: ProfileItem
  onUpdate: (updatedItem: ProfileItem) => void
  onClose: () => void
}

const EditItemPopup: React.FC<EditItemPopupProps> = ({ item, onUpdate, onClose }) => {
  const [editedItem, setEditedItem] = useState<ProfileItem>(item)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedItem)
  }

  return (
    <div className="overlay flex-row">
      <div className="popup flex-column">
        <h2>Edit Item</h2>
        <form className="flex-column"onSubmit={handleSubmit}>
          <div className="item-type-edit flex-row">
            <Chip color="default" size="md" variant="flat">Label</Chip>
            <input id="label" name="label" value={editedItem.label} onChange={handleInputChange} required />
          </div>
          <div className="item-type-edit flex-row">
            <Chip color="default" size="md" variant="flat">Command</Chip>
            <input id="cmd" name="cmd" value={editedItem.cmd} onChange={handleInputChange} required />
          </div>
          <div className="item-type-edit flex-row">
            <Chip color="default" size="md" variant="flat">Value</Chip>
            <input id="value" name="value" value={editedItem.value} onChange={handleInputChange} required />
          </div>
          <div className="item-type-option flex-row">
            <Button size="sm" radius="full" color="success" variant="faded" type="submit">Update</Button>
            <Button size="sm" radius="full" color="danger" variant="faded" onClick={onClose} >Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditItemPopup

