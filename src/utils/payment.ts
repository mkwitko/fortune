import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { getBackendUrl } from './getBackendUrl'

export default function Payment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async (data: any) => {
    const response = await fetch(
      getBackendUrl({ endpoint: 'payments/payment_intents' }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    ).then((res) => res.json())

    const { paymentIntent, ephemeralKey, customer } = await response

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  const initializePaymentSheet = async (data: any) => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(data)

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Pocket Apps',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    }
  }

  return {
    initializePaymentSheet,
    openPaymentSheet,
    loading,
  }
}
