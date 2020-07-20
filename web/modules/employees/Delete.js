import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap'
import { useEmployeeDelete } from '../../hooks/resources/employees'

const Delete = ({ id = null, visible = false, toggle, onFinish }) => {
  const { loading, error, response, send } = useEmployeeDelete(id)

  return (
    <Modal isOpen={visible} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Delete Employee
      </ModalHeader>
      <ModalBody>
        {error.code && (
          <Row>
            <Col md={12}>
              <UncontrolledAlert color="danger">{error.message}</UncontrolledAlert>
            </Col>
          </Row>
        )}
        <h3>Are you sure you want to delete this data?</h3>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => {
          send(onFinish)
        }} color="danger" disabled={loading}>{loading ? 'Deleting Data' : 'Delete'}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default Delete
