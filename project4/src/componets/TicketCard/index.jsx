import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase";
import firebase from "firebase"


const TicketCard = ({ ticketId }) => {
  const [user, setUser] = useState({})
  const [ticket, setTicket] = useState({})
  const userId = Firebase.getUser().uid;
  const userRef = Firebase.database.collection("users").doc(userId)
  const bookRef = Firebase.database.collection("the books").doc('balance')
  const ticketRef = Firebase.database.collection("tickets").doc(ticketId)
  
  
  const fetchTicket = async ()=>{
    await ticketRef.get().then(function(doc){
      if(doc.exists){
        let ticket = {...doc.data()}
        setTicket({...doc.data()})
        ticketChecker(ticket)
      }else{
        console.log("No such document!");
    }
    
  })
  }
  const fetchUser = async () => {
    await userRef.get().then(function(doc) {
      if (doc.exists) {
        setUser({...doc.data()})
        return 
      } else {
        console.log("No such document!");
      }
    });
  };
  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  const ticketChecker = async (ticket) => {
     console.log('this is', ticket)
    if(isEmpty(ticket)){
      return
    }else
    if(ticket.winner[1] || ticket.loser[1]){
      console.log("ticket disputed")
    }else if (ticket.winner.length===1 && ticket.loser.length===1){
      console.log ("ticket settelted")
    }else 
    console.log("ticket still in play")
  }
  const buyTicket = async () => {
    try {
      await userRef.update({
        balance: firebase.firestore.FieldValue.increment(-ticket.wager)}
      )
      await bookRef.update({
        balance: firebase.firestore.FieldValue.increment(+ticket.wager)
      })

      ticketRef.set(
        {
          open: false,
          playerIds: [ticket.authorId, userId ],
          playerUsernames: [ticket.author, user.userName],
          
        },
        { merge: true },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const claimWin = async ()=>{
    console.log('claim win hit')
    await ticketRef.update({
      winner: firebase.firestore.FieldValue.arrayUnion(user.userName),
      winnerId: firebase.firestore.FieldValue.arrayUnion(userId)
  });
   
  }
  const forfeit = ()=>{
    ticketRef.update({
      loser: firebase.firestore.FieldValue.arrayUnion(user.userName)
    })
  }
  useEffect(() => {
    fetchTicket()
    fetchUser()
   
  }, [])
  return (
    <div>
      <h1>{ticket.title}</h1>

      <h2>{ticket.description}</h2>
      <h3>{ticket.amount}</h3>
      {ticket.open ? (
       <button onClick={buyTicket}>X</button>
      ) : ( <h4>{ticket.playerUsernames && ticket.playerUsernames[0]} vs {ticket.playerUsernames &&ticket.playerUsernames[1]}
          <button onClick={claimWin}>Claim</button> 
          <button onClick={forfeit}>Forfeit</button>
        </h4>
        
      )}
    </div>
  );
};

export default TicketCard;
