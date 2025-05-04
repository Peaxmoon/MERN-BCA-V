import React, { useContext } from 'react'
import UserContext from './UserContext'

function InsideHeader() {
    const user = useContext(UserContext);
  return (
    <div>InsideHeader username : {user}</div>
  )
}

export default InsideHeader