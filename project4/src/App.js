import React, { useState, useEffect, useContext } from 'react'
import firebase from 'firebase'
import Routes from './componets/Routes'
import Navbar from './componets/Navbar'
import './App.css'

const userContext = React.createContext({
  user: null,
})

export const useSession = () => {
  const { user } = useContext(userContext)
  return user
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
    }
  })

  function onChange(user) {
    console.log('authstatechanged', user)
    setState({ initializing: false, user })
  }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const { initializing, user } = useAuth()

  const doSetCurrentUser = currentUser => {
    console.log(currentUser)
    setCurrentUser(currentUser)
    let isLoggedIn = currentUser !== {} ? true : false
    setisLoggedIn(isLoggedIn)
  }

  if (initializing) {
    return <div>Loading</div>
  }
  return (
    <div>
      <userContext.Provider value={{ user }}>
        <Navbar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          doSetCurrentUser={doSetCurrentUser}
        />
        <div className='App'>
          <Routes doSetCurrentUser={doSetCurrentUser} />
        </div>
      </userContext.Provider>
    </div>
  )
}

export default App

// import React, { Component, useState } from "react";

// import NavBar from "./componets/Navbar";
// import Routes from "./componets/Routes";

// import Firebase from "./resources/FireBase/firebase";

// import "./App.css";

// class App extends Component {
//   state = {
//     currentUser: {},
//     isLoggedIn: false
//   };

//   async componentDidMount() {
//     await Firebase.auth.onAuthStateChanged(async authUser => {
//       if (authUser) {
//         const userId = Firebase.getUser().uid 
//         const userRef = Firebase.database.collection("user").doc(userId) 
//       this.setState({
        
//         currentUser: userRef,
//         isLoggedIn: true
//       })

//       }
//     });
//   }

//   doSetCurrentUser = currentUser => {
//     this.setState({
//       currentUser,
//       isLoggedIn: currentUser ? true : false
//     });
//   };

//   render() {
//     const { isLoggedIn, currentUser } = this.state;
//     return (
//       <div>
//         <NavBar
//           isLoggedIn={isLoggedIn}
//           currentUser={currentUser.uid}
//           doSetCurrentUser={this.doSetCurrentUser}
//         />
//         <Routes  doSetCurrentUser={this.doSetCurrentUser} />
//       </div>
//     );
//   }
// }

// export default App;
