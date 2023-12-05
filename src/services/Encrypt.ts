import CryptoJS from 'crypto-js'

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(
    data,
    process.env.REACT_APP_SECRET_KEY || '',
  ).toString()
}

export const decrypt = (data: string): string => {
  return CryptoJS.AES.decrypt(
    data,
    process.env.REACT_APP_SECRET_KEY || '',
  ).toString(CryptoJS.enc.Utf8)
}
