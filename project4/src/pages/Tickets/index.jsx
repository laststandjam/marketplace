import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';
import { Link } from "react-router-dom";
import {Card, CardDeck} from "react-bootstrap"

const Tickets =(currentUser)=>{
    const [tickets, setTickets] = useState([])
    const ticketsRef = Firebase.database.collection('tickets')
    const fetchTickets = async () => {
      try {
        const ticketsArr = []
        const querySnapshot = await ticketsRef.where("open", "==", true ).get()
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
<Link to={`/tickets/${t.id}`} currentUser={currentUser.currentUser}> <Card.Title>{t.title}</Card.Title> <Card.Body>{t.wager}</Card.Body><Card.Footer>{t.author}</Card.Footer></Link>
            </Card>))}
          </CardDeck>   </div>
  )}

export default Tickets