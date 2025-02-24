import type React from "react"
import { Chip } from "@shivangi_2408/effective-ui"


interface ItemProps {
  label: string
  cmd: string
  value: string
  onClick: () => void
}

const Item: React.FC<ItemProps> = ({ label, cmd, value, onClick }) => {
  return (
    <div className="item flex-row" onClick={onClick}>
      <div className="item-type flex-row">
        <Chip color="default" size="md" variant="flat">
          {label}
        </Chip>
        <Chip color="primary" size="md" variant="faded">
          {cmd}
        </Chip>
      </div>
      <span>{value}</span>
    </div>
  )
}

export default Item

