import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import { Link } from "react-router-dom";


const User =()=>{
  const [tickets, setTickets] = useState([])
  const currentUser = { ...Firebase.getUser() };
  const userId = currentUser.uid
  const ticketsArr = []
  const ticketsRef = Firebase.database.collection('tickets')
  const fetchUserTickets = async () => {
    try {
      const querySnapshot = await ticketsRef.where("players", "array-contains",   ).get()
      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data())
        ticketsArr.push({...doc.data(), id: doc.id})
      })
      setTickets(ticketsArr)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      fetchUserTickets()
  },[])
 
  return(
    <div>
      <ul>
        {tickets.map((t,i)=>(
          <li key={i}>
<Link to={`/tickets/${t.id}`} currentUser={currentUser.currentUser}> {console.log()} {t.title} {t.description}</Link>
            </li>))}
        </ul>
    </div>
  )}

export default User;