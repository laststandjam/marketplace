import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import {Link} from 'react-router-dom'
import {useSession} from "../../App"
import {CardDeck, Card,} from 'react-bootstrap'
import ItemsCarousel from 'react-items-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const User =()=>{
const [activeItemIndex, setActiveItemIndex] = useState(0);
const chevronWidth = 40;
const [tickets, setTickets] = useState([])
const [closedTickets, setClosedTickets]=useState([])
const [inPlayTickets, setinPlayTickets] = useState([])
const [user, setUser] = useState([])
 const userId= useSession().uid
 const userRef = Firebase.database.collection("users").doc(userId);
 const ticketsRef = Firebase.database.collection("tickets")
console.log(inPlayTickets)
console.log(closedTickets)
useEffect(() => {
  fetchTickets()
  fetchUser()
}, [])
const fetchUser = async () => {
  await userRef.get().then(function(doc) {
    if (doc.exists) {
      setUser({ ...doc.data() });
      return;
    } else {
      console.log("No such document!");
    }
  });
};

const fetchTickets = async () => {
  try {
    const ticketsArr = []
    const querySnapshot = await ticketsRef.where("playerIds","array-contains", userId).get()
    querySnapshot.forEach(doc => {
    ticketsArr.push({...doc.data(), id: doc.id})
    })
    setTickets(ticketsArr)
} catch (error) {
    console.log(error)
  }
}
  
const sortTickets=()=>{
  console.log("sort ticktes hit")
    let setteledTickets=[]
    let openTickets= []
    for(let i = 0; i<tickets.length; i++){
      console.log(tickets[i]) 
      console.log(tickets[i].setteled)
    if(tickets[i].setteled || tickets.disputed){
      setteledTickets.push(tickets[i])
    }else{
      openTickets.push(tickets[i])
    }
    console.log("open tickets", openTickets)
    console.log("closed tickets", setteledTickets)
    setClosedTickets([...closedTickets, ...setteledTickets ])
    setinPlayTickets([...inPlayTickets, ...openTickets])
    console.log("after open", inPlayTickets)
    console.log("after closed", closedTickets )
    }}
useEffect(() => {
  sortTickets()
}, [tickets])
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
           </ItemsCarousel>
           <div style={{"padding":"0 60px","maxWidth":1000,"margin":"0 auto"}}><ul>
      {closedTickets.map((c,d)=>(
        <li key={d}>
<Link to={`/tickets/${d.id}`}>{c.title}</Link>
          </li>))}
           </ul>
           </div> 
           </div>   
)}

export default User;