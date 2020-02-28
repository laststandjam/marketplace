import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';
import { Route, Switch, Link } from "react-router-dom";


const Tickets =()=>{
    const [tickets, setTickets] = useState([])
    const ticketsRef = Firebase.database.collection('tickets')
    const fetchTickets = async () => {
      try {
        const ticketsArr = []
        const querySnapshot = await ticketsRef.get()
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
<Link to={`/tickets/${t.id}`}> {console.log()} {t.title} {t.description}</Link>
            </li>))}
        </ul>
    </div>
  )}

export default Tickets