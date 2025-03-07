// Simple implementation to check if a password has been breached using the k-anonymity model
// This uses the haveibeenpwned API without sending the full password
import CryptoJS from 'crypto-js';

// Function to hash a string using SHA-1
function sha1(string: string): string {
  return CryptoJS.SHA1(string).toString().toUpperCase();
}

export async function checkPasswordBreach(password: string): Promise<{
  breached: boolean;
  count: number;
  message: string;
}> {
  try {
    // Hash the password with SHA-1
    const sha1Password = sha1(password);
    const prefix = sha1Password.substring(0, 5);
    const suffix = sha1Password.substring(5);

    // Call the haveibeenpwned API with the prefix only (k-anonymity)
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    
    if (!response.ok) {
      throw new Error('Failed to check password breach');
    }

    const text = await response.text();
    const breachData = text.split('\n');
    
    // Check if our suffix is in the returned list
    const foundBreach = breachData.find(line => line.split(':')[0].toLowerCase() === suffix.toLowerCase());
    
    if (foundBreach) {
      const count = parseInt(foundBreach.split(':')[1], 10);
      return {
        breached: true,
        count,
        message: `This password has been found in ${count.toLocaleString()} data breaches. It's highly recommended to choose a different password.`
      };
    }

    return {
      breached: false,
      count: 0,
      message: 'Good news! This password hasn\'t been found in any known data breaches.'
    };
  } catch (error) {
    console.error('Error checking password breach:', error);
    return {
      breached: false,
      count: 0,
      message: 'Unable to check if this password has been breached. Please try again later.'
    };
  }
}
