import React from 'react'

const Tab = ({ children, label }) => {
  return (
    <div label={label}>
      {children}
    </div>
  )
}

export default Tab
