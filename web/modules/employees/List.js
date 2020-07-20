import React, { Fragment, useState, useEffect } from 'react'
import { Table, Button, Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import TableHeader from '../../components/TableHeader'
import BatchForm from './BatchForm'
import Detail from './Detail'
import Delete from './Delete'

import { useEmployeeFetch } from '../../hooks/resources/employees'

const List = () => {
  const { loading, response, fetch, paging, reset } = useEmployeeFetch()
  const [addModal, setAddModal] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const toggleAddModal = () => setAddModal(!addModal)
  const toggleUpdateId = () => setUpdateId(null)
  const toggleDeleteId = () => setDeleteId(null)

  const onAddFinish = () => {
    reset()
    toggleAddModal()
  }

  const onUpdateFinish = () => {
    reset()
    toggleUpdateId()
  }

  const onDeleteFinish = () => {
    reset()
    toggleDeleteId()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <TableHeader title="Employee List" onAdd={toggleAddModal} />
      <Table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px 0' }}>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </td>
            </tr>
          ) : (
            <Fragment>
              {response.count > 0 ? response.data.map((item) => (
                <tr key={`employee-${item.login}`}>
                  <td>{item.login}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button onClick={() => setUpdateId(item.id)} color="primary">Update</Button>
                    {'  '}
                    <Button onClick={() => setDeleteId(item.id)} color="danger">Delete</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '8px 0' }}>
                    Employee is empty. Please add one.
                  </td>
                </tr>
              )}
            </Fragment>
          )}
        </tbody>
      </Table>
      {response.count > 0 && (
        <Pagination>
          <PaginationItem>
            <PaginationLink previous disabled={response.page === 0} onClick={() => {
              paging(response.page - 1)
            }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next disabled={response.page === (response.totalPage - 1)} onClick={() => {
              paging(response.page + 1)
            }} />
          </PaginationItem>
        </Pagination>
      )}
      <BatchForm visible={addModal} toggle={toggleAddModal} onFinish={onAddFinish} />
      <Detail id={updateId} visible={updateId !== null} toggle={toggleUpdateId} onFinish={onUpdateFinish} />
      <Delete id={deleteId} visible={deleteId !== null} toggle={toggleDeleteId} onFinish={onDeleteFinish} />
    </div>
  )
}

export default List
