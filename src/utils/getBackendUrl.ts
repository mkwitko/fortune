export const getBackendUrl = ({ endpoint }: { endpoint: string }) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return `${process.env.EXPO_PUBLIC_BACKEND_DEV}${endpoint}`
  // } else {
  //   return `${process.env.EXPO_PUBLIC_BACKEND}${endpoint}`
  // }
  return `https://fortune-back.fly.dev/${endpoint}`
}
