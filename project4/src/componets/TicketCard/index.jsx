import React from "react";
import Firebase from "../../resources/FireBase/firebase";

const TicketCard = ({ ticket, ticketId }) => {
  let currentUser = { ...Firebase.getUser() };
  const userId = currentUser.uid;
  const ticketRef = Firebase.database.collection("tickets").doc(ticketId);
  const userRef = Firebase.database.collection("users").doc(userId);
  userRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        currentUser = doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  const buyTicket = async () => {
    try {
      ticketRef.set(
        {
          playerIds: [ticket.authorId, userId],
          playerUsernames: [ticket.author, currentUser.userName],
          accepted: true
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{ticket.title}</h1>

      <h2>{ticket.description}</h2>
      <h3>{ticket.amount}</h3>
      {ticket.accepted ? (
        <h4>
          {ticket.players[0].userName} vs {ticket.players[1].userName}
        </h4>
      ) : (
        <button onClick={buyTicket}>X</button>
      )}
    </div>
  );
};

export default TicketCard;
