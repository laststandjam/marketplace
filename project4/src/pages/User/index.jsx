import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import { Link } from "react-router-dom";
import {useSession} from "../../App"
import {CardDeck, Card,} from 'react-bootstrap'
import ItemsCarousel from 'react-items-carousel';

const User =()=>{

const [activeItemIndex, setActiveItemIndex] = useState(0);
const chevronWidth = 40;
const [tickets, setTickets] = useState([])
const [closedTickets, setClosedTickets]=useState([])
const [inPlayTickets, setinPlayTickets] = useState([])
 const userId= useSession().uid
 const userRef = Firebase.database.collection("users").doc(userId);
 const ticketsRef = Firebase.database.collection("tickets")
console.log(tickets)
 const fetchTickets = async () => {
  try {
    const ticketsArr = []
    const querySnapshot = await ticketsRef.where("playerIds","array-contains", userId).get()
    querySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data())
      ticketsArr.push({...doc.data(), id: doc.id})
    })
    setTickets(ticketsArr)
    let closedArr = tickets.filter(function (t){
      return t.setteled == true && t.disputed == true
    }
    ) 
    setClosedTickets(closedArr)
    console.log(closedTickets)
  } catch (error) {
    console.log(error)
  }
}
 
useEffect(()=>{
  fetchTickets()
},[])
return(
  <div>
    <ItemsCarousel 
     infiniteLoop={true}
     requestToChangeActive={setActiveItemIndex}
     activeItemIndex={activeItemIndex}
     numberOfCards={3}
     gutter={30}
     leftChevron={<button>{'<'}</button>}
     rightChevron={<button>{'>'}</button>}
     outsideChevron
     chevronWidth={chevronWidth}>
      {tickets.map((t,i)=>(
        <div key={i}>
<Link to={`/tickets/${t.id}`}> <Card.Title>{t.title}</Card.Title> <Card.Body>{t.wager}</Card.Body><Card.Footer>{t.author}</Card.Footer></Link>
          </div>))}
           </ItemsCarousel></div> 
)}

export default User;