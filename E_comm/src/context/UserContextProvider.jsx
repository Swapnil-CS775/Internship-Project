import React from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [SearchValue, setSearch] = React.useState({ })
    
  return (
    <UserContext.Provider value={{setSearch, SearchValue}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
