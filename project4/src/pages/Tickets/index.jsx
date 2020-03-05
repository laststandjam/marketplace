import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';
import { Link } from "react-router-dom";
import {Card, CardDeck} from "react-bootstrap"
import style from "./style.js"

const Tickets =(currentUser)=>{
    const [tickets, setTickets] = useState([])
    const ticketsRef = Firebase.database.collection('tickets')
    console.log(tickets)
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
    <div style={{background:'orange'}}>
      <CardDeck style={{margin:'auto',
    position:'absolute',
    top:'40%' }}>
        {tickets.map((t,i)=>(
          <Card key={i} border="warning" style={{ width: '18rem', color:"green"}}>
<Link style={{color:'green'}}to={`/tickets/${t.id}`} currentUser={currentUser.currentUser}> <Card.Title style={{background:'light green'}}>{t.title}</Card.Title> <Card.Body>{t.wager}</Card.Body><Card.Footer style={{backgroundColor: 'light green'}}>{t.author}</Card.Footer></Link> </Card>))}
          </CardDeck> </div>
  )}

export default Tickets