import React from 'react'

export default function UserEntityHook() {
  const [data, setData] = React.useState<any>(null)

  return { data, setData }
}
