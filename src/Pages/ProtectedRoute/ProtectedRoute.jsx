import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {


// if => storage => cart
// if not => login 

if(localStorage.getItem('userToken')){
    // selected comp
  return props.children
}
else{
    // navigate to login 
   return <Navigate to={'/login'}/>
}


}
