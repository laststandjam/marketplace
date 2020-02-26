import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';


const AddTicket =()=>{
    const [tickets, setTickets] = useState([])

    const fetchTickets = async () => {
      try {
        const ticketsArr = []
        const ticketsRef = await Firebase.database.collection('tickets')
        const querySnapshot = await ticketsRef.get()
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data())
          ticketsArr.push(doc.data())
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
<div>tickets</div>
)}


export default AddTicket;