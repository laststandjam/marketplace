import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import { Link } from "react-router-dom";
import {useSession} from "../../App"



const User =()=>{
  const [tickets, setTickets] = useState([])
 const userId= useSession().uid
 const userRef = Firebase.database.collection("users").doc(userId);
 const ticketsRef = Firebase.database.collection("tickets")

 const fetchTickets = async () => {
  try {
    const ticketsArr = []
    const querySnapshot = await ticketsRef.where("playerIds","array-contains", userId).get()
    console.log(querySnapshot)
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
  fetchTickets()
},[])
return(
  <div>
    <ul>
      {tickets.map((t,i)=>(
        <li key={i}>
<Link to={`/tickets/${t.id}`}> {t.title} {t.description}</Link>  <button>Claim win</button><button> Forfeit</button>
          </li>))}
      </ul>
  </div>
)}

export default User;