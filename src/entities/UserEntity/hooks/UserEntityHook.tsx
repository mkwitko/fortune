import React from 'react'

export default function UserEntityHook() {
  const [data, setData] = React.useState(null)

  return { data, setData }
}
