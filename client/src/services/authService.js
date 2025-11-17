const API_URL = 'http://94.136.189.105:7000';

class AuthService {
  async httpRequest(method, data) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
      
      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Network Error:', error);
      throw error;
    }
  }

  async login(username, password) {
    const data = `*$|1|${username}|${password}`;
    const result = await this.httpRequest('POST', data);
    
    if (result === 'P|DB|NACK') {
      throw new Error('User does not exist or incorrect credentials');
    } else if (result === '0|ACK' || result === '2|ACK') {
      throw new Error('No license. Purchase License!');
    } else if (result === 'P|DB|ACK') {
      localStorage.setItem('username', username);
      await this.httpRequest('POST', '*$|2|index.html');
      return { success: true, username };
    }
    
    throw new Error('Unknown error occurred');
  }

  async checkLicense(username) {
    const data = `*$|999|${username}`;
    const result = await this.httpRequest('POST', data);
    
    if (result === '0|ACK') {
      throw new Error('No license to run this software');
    }
    
    await this.httpRequest('POST', '*$|2|game.html');
    return { success: true };
  }

  logout() {
    localStorage.removeItem('username');
  }

  getCurrentUser() {
    return localStorage.getItem('username');
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
