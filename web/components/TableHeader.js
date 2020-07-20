import React from 'react'
import { Button } from 'reactstrap'

import './TableHeader.styles.scss'

const TableHeader = ({ title = null, onAdd = false }) => (
  <div className="table-header">
    <h3 className="title">{title}</h3>
    {onAdd && <Button className="add-button" onClick={onAdd}>Add</Button> }
  </div>
)

export default TableHeader
