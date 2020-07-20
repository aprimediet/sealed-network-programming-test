import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledAlert
} from 'reactstrap'
import { useEmployeeRetrieve, useEmployeeUpdate } from '../../hooks/resources/employees'

const Detail = ({ id = null, visible = false, toggle, onFinish }) => {
  const { loading: retrieveLoading, error: retrieveError, response, fetch } = useEmployeeRetrieve(id)
  const { loading: updateLoading, error: updateError, response: updateResponse, send } = useEmployeeUpdate(id)

  const [data, setData] = useState({
    login: null,
    name: null,
  })

  const onChangeText = (key) => (event) => {
    const value = event.target.value

    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  useEffect(() => {
    if (id) {
      fetch()
    }
  }, [id])

  useEffect(() => {
    setData(response)
  }, [response])

  return (
    <Modal isOpen={visible} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Update Employee
      </ModalHeader>
      <ModalBody>
        <Form>
          {retrieveError.code && (
            <Row>
              <Col md={12}>
                <UncontrolledAlert color="danger">{retrieveError.message}</UncontrolledAlert>
              </Col>
            </Row>
          )}
          {updateError.code && (
            <Row>
              <Col md={12}>
                <UncontrolledAlert color="danger">{updateError.message}</UncontrolledAlert>
              </Col>
            </Row>
          )}
          <Row form style={{ marginBottom: '8px' }}>
            <Col md={5}>
              <Input
                disabled={retrieveLoading || updateLoading}
                type="text"
                placeholder="Login"
                value={data.login}
                onChange={onChangeText('login')} />
            </Col>
            <Col md={6}>
            <Input
                disabled={retrieveLoading || updateLoading}
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={onChangeText('name')} />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => {
          const { login, name } = data
          send({ login, name }, onFinish)
        }} color="primary" disabled={retrieveLoading || updateLoading}>{updateLoading ? 'Sending Data' : 'Submit'}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default Detail
