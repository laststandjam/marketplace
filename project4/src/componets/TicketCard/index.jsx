import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase";
import firebase from "firebase"
import { Card }from "react-bootstrap";

const TicketCard = ({ ticket, ticketId }) => {
  const [user, setUser] = useState({})
  const userId = Firebase.getUser().uid;
  const userRef = Firebase.database.collection("users").doc(userId)
  const ticketRef = Firebase.database.collection("tickets").doc(ticketId);
  

  
  const fetchUser = async () => {
    await userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("hit")
        setUser({...doc.data()})
        return 
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };

  const buyTicket = async () => {
    try {
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
      winner: firebase.firestore.FieldValue.arrayUnion(user.userName)
  });
  }
  const forfeit = ()=>{
    ticketRef.update({
      loser: firebase.firestore.FieldValue.arrayUnion(user.userName)
    })
  }
  useEffect(() => {
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
