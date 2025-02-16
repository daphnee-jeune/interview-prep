import React, { useState, createContext } from 'react'

const UserContext1 = createContext(null)
const UserProvider1 = ({ children }) => {
 const [user, setUser] = useState({ name: 'John', age: 30})
  return (
    <UserContext1.Provider value={{ user, setUser }}>
      {children}
    </UserContext1.Provider>
  )
}

interface User {
 name: string;
 age: number;
}

interface UserContextValue {
 user: User;
 setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserContext2 = createContext<UserContextValue | null>(null)
const UserProvider2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<User>({ name: 'John', age: 30 })
 
 return (
  <UserContext2.Provider value={{ user, setUser }}>
   {children}
  </UserContext2.Provider>
 )
}

// Using React.FC for the provider component ensures children is typed correctly
// Always type your context values and provider components to avoid issues when consuming the context

export default{ UserProvider1, UserProvider2 }
