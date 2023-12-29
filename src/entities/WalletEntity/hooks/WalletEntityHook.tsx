import React from 'react'

export default function WalletEntityHook() {
  const [data, setData] = React.useState<any>(0)

  return { data, setData }
}
