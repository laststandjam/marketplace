import React, { useState } from 'react';
import Firebase from '../../resources/FireBase/firebase'


const Signup = ({ doSetCurrentUser, doAuth }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
 

  const isInvalid =
      password1 !== password2 ||
      password1 === '' ||
      email === '' ||
      firstName === '' ||
      lastName === ''

  const handleForm = async e => {
    e.preventDefault();
    if(isInvalid){ return } else {
    try {
      const { user } = await Firebase.doCreateUserWithEmailAndPassword(email, password1);
      await Firebase.database.collection('users').add({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: user.uid,
      })
      doSetCurrentUser({
        email,
      });
      Firebase.doAuth();
    } catch (err) {
      console.log(err)
    }
  }};

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <input type="text" placeholder="First Name" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)}  />
          <input type="text" placeholder="Last Name" name='lastName' value={lastName} onChange={e => setLastName(e.target.value)}  />
          <input type="text" placeholder="user name" name='userName' value={userName} onChange={e => setUserName(e.target.value)}  />
          <input type="email" placeholder="Email" name='email' value={email} onChange={e => setEmail(e.target.value)}  />
          <input type="password" placeholder="Password" name='password1' value={password1} onChange={e => setPassword1(e.target.value)}  />
          <input type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={e => setPassword2(e.target.value)}  />
        </div>  
      <button type='submit' disabled={isInvalid}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup;
