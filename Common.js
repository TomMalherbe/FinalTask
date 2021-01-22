// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  // Permit to acces to PrivateRoute or PublicRoute
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  // Permit to logout from the Website
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');                   // Remove token
    sessionStorage.removeItem('user');                    // Remove user
  }
   
  // set the token and user from the session storage
  // Create the user session
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);                 // Set token
    sessionStorage.setItem('user', JSON.stringify(user));   // Set user
  }