// QR Code generator utility
// Generates QR codes for passwords with optional encryption and expiration

import CryptoJS from 'crypto-js';

// QR Code options
export interface QRCodeOptions {
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H'; // Error correction level
  encrypted?: boolean;
  expiresIn?: number; // Expiration time in minutes
}

// Default options
const defaultOptions: QRCodeOptions = {
  size: 200,
  level: 'M',
  encrypted: false,
  expiresIn: 0 // 0 means no expiration
};

// Generate QR code data
export function generateQRCodeData(
  password: string, 
  options: QRCodeOptions = {}
): {
  data: string;
  encrypted: boolean;
  expiresAt: Date | null;
} {
  const mergedOptions = { ...defaultOptions, ...options };
  let data = password;
  let expiresAt: Date | null = null;
  
  // Add expiration if requested
  if (mergedOptions.expiresIn && mergedOptions.expiresIn > 0) {
    expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + mergedOptions.expiresIn);
    
    // Format the data with expiration
    data = JSON.stringify({
      password,
      expiresAt: expiresAt.toISOString()
    });
  }
  
  // Encrypt the data if requested
  if (mergedOptions.encrypted) {
    // Generate a random encryption key
    const encryptionKey = CryptoJS.lib.WordArray.random(16).toString();
    
    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(data, encryptionKey).toString();
    
    // Format the encrypted data with the key
    data = JSON.stringify({
      encrypted: true,
      data: encrypted,
      key: encryptionKey
    });
  }
  
  return {
    data,
    encrypted: mergedOptions.encrypted || false,
    expiresAt
  };
}

// Decode QR code data
export function decodeQRCodeData(data: string): {
  password: string | null;
  expired: boolean;
  error?: string;
} {
  try {
    // Check if the data is JSON
    if (data.startsWith('{') && data.endsWith('}')) {
      const parsedData = JSON.parse(data);
      
      // Check if it's encrypted
      if (parsedData.encrypted && parsedData.data && parsedData.key) {
        try {
          // Decrypt the data
          const decrypted = CryptoJS.AES.decrypt(parsedData.data, parsedData.key).toString(CryptoJS.enc.Utf8);
          
          // Check if the decrypted data is JSON (might contain expiration)
          if (decrypted.startsWith('{') && decrypted.endsWith('}')) {
            const decryptedObj = JSON.parse(decrypted);
            
            // Check expiration
            if (decryptedObj.expiresAt) {
              const expiresAt = new Date(decryptedObj.expiresAt);
              const now = new Date();
              
              if (now > expiresAt) {
                return {
                  password: null,
                  expired: true,
                  error: 'This QR code has expired'
                };
              }
              
              return {
                password: decryptedObj.password,
                expired: false
              };
            }
            
            return {
              password: decryptedObj.password,
              expired: false
            };
          }
          
          // If not JSON, it's just the password
          return {
            password: decrypted,
            expired: false
          };
        } catch (error) {
          return {
            password: null,
            expired: false,
            error: 'Failed to decrypt the QR code data'
          };
        }
      }
      
      // Check if it has expiration
      if (parsedData.expiresAt && parsedData.password) {
        const expiresAt = new Date(parsedData.expiresAt);
        const now = new Date();
        
        if (now > expiresAt) {
          return {
            password: null,
            expired: true,
            error: 'This QR code has expired'
          };
        }
        
        return {
          password: parsedData.password,
          expired: false
        };
      }
      
      // If it has a password field, return it
      if (parsedData.password) {
        return {
          password: parsedData.password,
          expired: false
        };
      }
    }
    
    // If not JSON, assume it's just the password
    return {
      password: data,
      expired: false
    };
  } catch (error) {
    return {
      password: null,
      expired: false,
      error: 'Invalid QR code data'
    };
  }
}
