import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { get, post, put, destroy } from '../../libraries/baseAxios'

export const useEmployeeFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    code: null,
    message: null,
    data: null,
  })

  const [params, setParams] = useState({
    terms: null,
    limit: 10,
    offset: 0,
    sort: null,
  })

  const [response, setResponse] = useState({
    count: 0,
    page: 0,
    totalPage: 0,
    limit: 0,
    offset: 0,
    data: [],
  })

  const fetch = async () => {
    try {
      setLoading(true)
      const req = await get('/employees', { params })

      if (req) {
        setResponse(req)
      }

    } catch (error) {
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  const paging = (page) => {
    try {
      setParams((prevState) => ({
        ...prevState,
        offset: page * limit,
      }))

      send()
    } catch (error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const search = (terms) => {
    try {
      setParams((prevState) => ({
        ...prevState,
        terms,
      }))

      send()
    } catch (error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setParams({
      terms: null,
      limit: 10,
      offset: 0,
      sort: null,
    })

    fetch()
  }

  return { loading, error, response, fetch, paging, search, reset }
}

export const useEmployeeRetrieve = (id = null) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    code: null,
    message: null,
    data: null,
  })
  const [response, setResponse] = useState({
    id: null,
    login: null,
    name: null,
    createdAt: null,
    updatedAt: null,
  })

  const fetch = async () => {
    try {
      const req = await get(`/employees/${id}`)

      if (req) {
        setResponse(req)
      }

    } catch (error) {
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return { loading, error, response, fetch }
}

export const useEmployeeCreate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    code: null,
    message: null,
    data: null,
  })
  const [response, setResponse] = useState({
    data: null,
  })

  const send = async (data, callback = null) => {
    try {
      setLoading(true)
      setError({
        code: null,
        message: null,
        data: null,
      })
      const req = await post('/employees', data)

      if (req) {
        setResponse(req)

        if(callback) {
          setTimeout(() => {
            callback()
          }, 1500)
        }
      }

    } catch (error) {
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return { loading, error, response, send }
}

export const useEmployeeUpdate = (id = null) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    code: null,
    message: null,
    data: null,
  })
  const [response, setResponse] = useState({
    data: null,
  })

  const send = async (data, callback = null) => {
    try {
      setLoading(true)
      setError({
        code: null,
        message: null,
        data: null,
      })
      const req = await put(`/employees/${id}`, data)

      if (req) {
        setResponse(req)

        if(callback) {
          setTimeout(() => {
            callback()
          }, 1500)
        }
      }

    } catch (error) {
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return { loading, error, response, send }
}

export const useEmployeeDelete = (id = null) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    code: null,
    message: null,
    data: null,
  })
  const [response, setResponse] = useState({
    data: null,
  })

  const send = async (callback = null) => {
    try {
      setLoading(true)
      setError({
        code: null,
        message: null,
        data: null,
      })
      const req = await destroy(`/employees/${id}`)

      if (req) {
        setResponse(req)

        if(callback) {
          setTimeout(() => {
            callback()
          }, 1500)
        }
      }

    } catch (error) {
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return { loading, error, response, send }
}