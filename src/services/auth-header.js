export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user?.tokens?.accessToken) {
      // for Node.js Express back-end
      return { Authorization: 'Bearer ' + user.tokens.accessToken };
    } else {
      return {};
    }
  }