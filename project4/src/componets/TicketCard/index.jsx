import React, {useState} from "react";
import Firebase from "../../resources/FireBase/firebase";



const TicketCard = ({ ticket, ticketId }) => {
  const [user, setUser] = useState({})
  const userId = Firebase.getUser().uid;
  const userRef = Firebase.database.collection("users").doc(userId)
  const ticketRef = Firebase.database.collection("tickets").doc(ticketId);
  
  
  const fetchUser = () => {
    userRef.get().then(function(doc) {
      if (doc.exists) {
       return setUser({...doc.data()})
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };

  const buyTicket = async () => {
    try {
      console.log("hit")
      ticketRef.set(
        {
          
          playerUsernames: [ticket.authour, user.userName],
          accepted: true
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }

  };
fetchUser()
  return (
    <div>
      <h1>{ticket.title}</h1>

      <h2>{ticket.description}</h2>
      <h3>{ticket.amount}</h3>
      {ticket.accepted ? (
        <h4>
          {ticket.playerUsernames[0]} vs {ticket.playerUsernames[1]}
        </h4>
      ) : (
        <button onClick={buyTicket}>X</button>
      )}
    </div>
  );
};

export default TicketCard;
