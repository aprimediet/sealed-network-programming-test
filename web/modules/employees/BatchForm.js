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
import { useEmployeeCreate } from '../../hooks/resources/employees'

const BatchForm = ({ visible = false, toggle, onFinish }) => {
  const [data, setData] = useState([
    {
      login: undefined,
      name: undefined,
    },
  ])
  const { loading, error, send } = useEmployeeCreate()

  const addData = () => {
    setData((prevState) => ([
      ...prevState,
      {
        login: undefined,
        name: undefined,
      },
    ]))
  }

  const removeData = (index) => {
    setData((prevState) => {
      const newState = prevState.slice()
      newState.splice(index, 1)

      return newState
    })
  }

  const onChangeText = (index, key) => (event) => {
    const value = event.target.value

    const currentData = {
      ...data[index]
    }

    currentData[key] = value

    setData((prevState) => {
      const newState = prevState.slice()

      newState.splice(index, 1, currentData)

      return newState
    })
  }

  useEffect(() => {
    if (!visible) {
      setData([
        {
          login: undefined,
          name: undefined,
        },
      ])
    }

    return () => {}
  }, [visible])

  return (
    <Modal isOpen={visible} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Add Employee
      </ModalHeader>
      <ModalBody>
        <Form>
          {error.code && (
            <Row>
              <Col md={12}>
                <UncontrolledAlert color="danger">{error.message}</UncontrolledAlert>
              </Col>
            </Row>
          )}
          {data.map((item, index) => (
            <Row form key={`form-row-${index}`} style={{ marginBottom: '8px' }}>
              <Col md={5}>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="Login"
                  value={data[index]['login']}
                  onChange={onChangeText(index, 'login')} />
              </Col>
              <Col md={6}>
              <Input
                  disabled={loading}
                  type="text"
                  placeholder="Name"
                  value={data[index]['name']}
                  onChange={onChangeText(index, 'name')} />
              </Col>
              <Col md={1} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                {index > 0 && <Button disabled={loading} color="danger" onClick={() => { removeData(index) }}>-</Button>}
              </Col>
            </Row>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={addData} disabled={loading}>Add</Button>
        <Button onClick={() => {
          send(data, onFinish)
        }} color="primary" disabled={loading}>{loading ? 'Sending Data' : 'Submit'}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default BatchForm
