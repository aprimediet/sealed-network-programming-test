import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

const Loading = ({ visible = false, message = null }) => (
  <Modal isOpen={visible}>
    <ModalBody>
      <h3>Loading</h3>
    </ModalBody>
  </Modal>
)

export default Loading
