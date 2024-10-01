import CryptoJS from "crypto-js";

// Encryption function
export const encryptData = (data, secretKey) => {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

// Decryption function
export const decryptData = (encryptedData, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
