import { CHANGE_FEATURE_TITLE, LOGIN, LOGOUT, ME, CREATE_POST, DELETE_POST, EDIT_POST, READ_POST } from './actionTypes'

import axios from 'axios'

export const changeFeatureTitle = e => {
  return {
    type: CHANGE_FEATURE_TITLE,
    featureTitle: e.target.name
  }
}

const instance = axios.create({
  baseURL: 'http://45.55.26.18:3310',
  withCredentials: true
})

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: instance.post(`/login`, {
      username,
      password
    })
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: instance.get(`/logout`)
  }
}

export const checkLogin = () => {
  return {
    type: ME,
    payload: instance.get(`/me`)
  }
}

export const createPost = (title, body, author) => {
  console.log(title, body, author)
  return {
    type: CREATE_POST,
    payload: instance.post(`/posts`, {
      title,
      body,
      author
    })
  }
}

export const readPost = id => {
  return {
    type: READ_POST,
    payload: instance.get(`/posts/${id}`)
  }
}

export const deletePost = id => {
  return {
    type: DELETE_POST,
    payload: instance.delete(`/posts/${id}`)
  }
}

export const editPost = (id, title, body, author) => {
  console.log(id, title, body, author)
  return {
    type: EDIT_POST,
    payload: instance.put(`/posts/${id}`, {
      title,
      author,
      body
    })
  }
}