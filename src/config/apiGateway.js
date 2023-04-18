import axios from 'axios'

export const apiGateway = axios.create({
    baseURL: 'http://localhost:8989/api/v1/yr',
    timeout: 60* 1000, // in milliseconds
    headers: {'Authorization': 'Bearer VEUdEii4n7nCvofaBRJEC'}
  });


/*
   npm | axios
   https://www.npmjs.com/package/axios
*/