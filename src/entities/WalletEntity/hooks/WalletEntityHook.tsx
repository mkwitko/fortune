import React from 'react'

export default function WalletEntityHook() {
  const [data, setData] = React.useState<any>({})

  return { data, setData }
}
