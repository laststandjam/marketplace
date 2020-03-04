import React, { useState, useEffect } from "react";
import Firebase from "../../resources/FireBase/firebase";
import firebase from "firebase";
import { render } from "@testing-library/react";

const TicketCard = ({ ticketId }) => {
  const [user, setUser] = useState({});
  const [ticket, setTicket] = useState({});
  const userId = Firebase.getUser().uid;
  const userRef = Firebase.database.collection("users").doc(userId);
  const bookRef = Firebase.database.collection("the book").doc("balance");
  const ticketRef = Firebase.database.collection("tickets").doc(ticketId);
  const fetchTicket = async () => {
    await ticketRef.get().then(function(doc) {
      if (doc.exists) {
        let ticket = { ...doc.data() };
        setTicket({ ...doc.data() });
        ticketChecker(ticket);
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    if (isEmpty(ticket)) return;
    if (ticket.winnerId[0]) {
      const winnerRef = Firebase.database
        .collection("tickets")
        .doc(ticket.winnerId[0]);
    }
  }, []);

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
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const ticketChecker = async ticket => {
    if (isEmpty(ticket)) {
      return;
    }
    if (
      (ticket.winner && ticket.winner.lenghth === 2) ||
      (ticket.loser && ticket.loser.length === 2)
    ) {
    } else if (
      ticket.winner &&
      ticket.winner.length === 1 &&
      ticket.loser &&
      ticket.loser.length === 1
    ) {
      await Firebase.database
        .collection("users")
        .doc(ticket.winnerId[0])
        .update({
          balance: firebase.firestore.FieldValue.increment(
            +ticket.wager * 2 * 0.99
          )
        });
      await bookRef.update({
        amount: firebase.firestore.FieldValue.increment(
          -ticket.wager * 2 * 0.99
        )
      });
      await ticketRef.set(
        {
          setteled: true
        },
        {
          merge: true
        }
      );
    } else {
      console.log("ticket still in play");
    }
  };
  const buyTicket = async () => {
    try {
      await userRef.update({
        balance: firebase.firestore.FieldValue.increment(-ticket.wager)
      });
      await bookRef.update({
        amount: firebase.firestore.FieldValue.increment(+ticket.wager)
      });

      ticketRef.set(
        {
          open: false,
          playerIds: [ticket.authorId, userId],
          playerUsernames: [ticket.author, user.userName]
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const claimWin = async () => {
    console.log("claim win hit");
    await ticketRef.update({
      winner: firebase.firestore.FieldValue.arrayUnion(user.userName),
      winnerId: firebase.firestore.FieldValue.arrayUnion(userId)
    });
    ticketChecker(ticket);
  };
  const forfeit = () => {
    ticketRef.update({
      loser: firebase.firestore.FieldValue.arrayUnion(user.userName),
      loserId: firebase.firestore.FieldValue.arrayUnion(userId)
    });
    ticketChecker(ticket);
  };
  useEffect(() => {
    fetchTicket();
    fetchUser();
  }, []);
  if (ticket.setteled){
    return(<div>
         <h1>{ticket.title}</h1>
<h2>Congrats {ticket.winner[0]}!!! {(+ticket.wager*2)*.99} Zed have been deposisted in your account</h2>
        </div>
    )
  }else if(ticket.open){
    return(
      <div>
         <h1>{ticket.title}</h1>
         <h2>{ticket.description}</h2>
        <h3>Buy ticket for {ticket.wager} Zed</h3>
        <p>Written by {ticket.author}</p>
        <button onClick={buyTicket}>Buy Ticket</button>
      </div>
    )}
    if(!ticket.open){ console.log("ticket not open condition", ticket)
      return(<div>
          <h1>{ticket.title}</h1>
        <h2>{ticket.description}</h2>
        <h3>Playing this ticket are</h3>
        <h4>{ticket.playerUsernames&&ticket.playerUsernames[1]} Challenging {ticket.author}</h4>
      <p>If you have met the conditions or your openent has failed too claim your Zed<button onClick={claimWin}>Claim Win</button></p>
      <p>Vice-versa???<button onClick={forfeit}> Forfeit Ticket </button></p>
        </div>
      )
    }else{
      fetchTicket() 
      console.log(ticket)
      return(
        
      <div><p>loading</p></div>)
    }
  }
  
export default TicketCard;
// {/* {ticket.open ? (
      //   <button onClick={buyTicket}>X</button>
      // ) : (
      //   <h4>
      //     {ticket.playerUsernames && ticket.playerUsernames[0]} vs{" "}
      //     {ticket.playerUsernames && ticket.playerUsernames[1]}
      //     <button onClick={claimWin}>Claim</button>
      //     <button onClick={forfeit}>Forfeit</button>
      //   </h4>
      // )} */}