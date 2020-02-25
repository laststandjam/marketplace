import React, {useState}from "react";
import {Link} from "react-router-dom"

const Tickets =()=>{
  const [tickets, setTickets] = useState([])

  // async function fetchData(){
  //   const ticketResults = await getTickets()
  //   setTickets(ticketResults.results)
  // }
  return(
  <div>
    <ul style="">
      {tickets.map((t,i)=>(
        <li key={i}>
          <Link to={`/tickets/${t.id}`}> {t.title}</Link>
          </li>))}
      </ul>
  </div>
)}


export default Tickets;