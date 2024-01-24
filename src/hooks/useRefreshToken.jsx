import React from 'react'
import axios from 'axios'
const useRefreshToken = () => {
    
  const refresh = async () => {
    const response = await axios.get('/refresh',
    {
        withCredentials: true,
    });
    sessionStorage.setItem('access_token', response.data.token);
    return response.data.token;
  }

  return refresh();
}

export default useRefreshToken