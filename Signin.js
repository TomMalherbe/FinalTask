import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
 
function Signin(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const name = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleSignin = () => {
    setError(null);
    setLoading(true);
    // Send the username, the name and the password to the server
    axios.post('http://localhost:4000/users/signin', { username: username.value,name: name.value, password: password.value }).then(response => { 
    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    setLoading(false);

  }
 
  return (
    <div id="Form">
      Signin<br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      
      <div>
        Name<br />
        <input type="text" {...name} autoComplete="new-password" />
      </div>
      <div >
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input id="NiceButton" type="button" value={loading ? 'Update...' : 'Add'} onClick={handleSignin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Signin;