import type React from "react"
import { useState, type ChangeEvent } from "react"
import { Button , Input } from "@shivangi_2408/effective-ui"

import Modal from "../UI/Modal"
import FileInput from "../UI/FileInput"


interface AddProfileProps {
  onAdd: (profileName: string, resumeFile: File) => void
}

const AddProfile: React.FC<AddProfileProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileName, setProfileName] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = () => {
    if (profileName && resumeFile) {
      onAdd(profileName, resumeFile)
      setIsOpen(false)
      setProfileName("")
      setResumeFile(null)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeFile(e.target.files?.[0] || null)
  }

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)} radius="full" size="md" variant="bordered">
        Add Profile
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <h2>Add New Profile</h2>
        </Modal.Header>
        <Modal.Body>
        <Input
            color="primary"
            defaultValue=""
            label="Email"
            labelPlacement="inside"
            placeholder="Enter profile name"
            radius="md"
            size="md"
            variant="flat"
            isRequired
            fullWidth
            onChange={(value: string) => setProfileName(value)}
            />
                <input className="hide"
                    placeholder="Enter profile name"
                    value={profileName}
                />
            <FileInput label="Upload Resume (PDF)" accept=".pdf" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" radius="full" color="success" variant="faded"  onClick={handleSubmit} disabled={!profileName || !resumeFile}>
            Add Profile
          </Button>
          <Button size="sm" radius="full" color="danger" variant="faded"  onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProfile

