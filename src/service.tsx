import axios from 'axios'

const BACKEND_URL = 'https://natural-cycle.herokuapp.com'
const requestConfig = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  'Accept-Language': 'application/json',
  'Content-Type': 'application/json',
}

const saveUser = async (phoneNumber: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users`, {
      phone: phoneNumber,
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const getUserData = async () => {
  const response = await axios.get(`${BACKEND_URL}/users`, {
    headers: requestConfig,
  })
  return response.data
}

const updateUser = async (data: any) => {
  const response = await axios.put(`${BACKEND_URL}/users`, data, {
    headers: requestConfig,
  })
  return response.data
}
export { saveUser, getUserData, updateUser }
