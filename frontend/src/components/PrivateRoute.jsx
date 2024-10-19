import React from 'react'
import { Router, Navigate, Outlet} from 'react-router-dom'
const PrivateRoute = ({role}) => {
    const token=localStorage.getItem('token');
    return (token?<Outlet/>:<Navigate to={`/${role}/signin`}/>)
  
};

export default PrivateRoute