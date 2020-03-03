import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import { Link } from "react-router-dom";
import {useSession} from "../../App"
import {CardDeck, Card} from 'react-bootstrap'


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
    <CardDeck>
      {tickets.map((t,i)=>(
        
        <Card key={i} style={{ width: '18rem' }}>
<Link to={`/tickets/${t.id}`}> <Card.Title>{t.title}</Card.Title> <Card.Body>{t.wager}</Card.Body><Card.Footer>{t.author}</Card.Footer></Link>
          </Card>))}
        </CardDeck>   </div>
)}

export default User;