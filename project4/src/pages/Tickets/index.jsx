import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';
import { Link } from "react-router-dom";
import {Card, CardDeck, Carousel, Container} from "react-bootstrap"
import "./style.css"

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
  <>
   
<Carousel style={{maxWidth:"50%", display: "block", marginLeft: "auto", marginRight: "auto"}}indicators={false}>
{tickets.map((t,i)=>(<Carousel.Item key={i}>
<Card className='centerContent'><Card.Title style={{opacity:"01"}}>{t.title}</Card.Title><Card.Body>{t.wager}<p>{t.description}</p><p>{t.author}</p></Card.Body><Card.Footer><button><Link to={`/tickets/${t.id}`} >Interested??</Link></button></Card.Footer></Card>
  </Carousel.Item>))}
</Carousel>

</>)}
export default Tickets

//     <div style={{background:'orange'}}>
//       <CardDeck style={{margin:'auto',
//     position:'absolute',
//     top:'40%' }}>
//         {tickets.map((t,i)=>(
//           <Card key={i} border="warning" style={{ width: '18rem', color:"green"}}>
// <Link style={{color:'green'}}to={`/tickets/${t.id}`} currentUser={currentUser.currentUser}> <Card.Title style={{background:'light green'}}>{t.title}</Card.Title> <Card.Body>{t.wager}</Card.Body><Card.Footer style={{backgroundColor: 'light green'}}>{t.author}</Card.Footer></Link> </Card>))}
//           </CardDeck> </div>