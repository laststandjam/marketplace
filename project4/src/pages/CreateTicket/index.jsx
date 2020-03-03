import React, { useState, useEffect } from "react";
import Firebase from "../../resources/FireBase/firebase";
import { useSession } from "../../App";
import firebase from "firebase";

const CreateTicket = () => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [wager, setWager] = useState(0);
  const [description, setDescription] = useState("");
  const userId = useSession().uid;
  const userRef = Firebase.database.collection("users").doc(userId);
  const bookRef = Firebase.database.collection("the book").doc('balance')
  console.log(bookRef)
  const fetchUser = async () => {
    await userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("bookRef hit", bookRef)
        setUser({...doc.data()})
        return 
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await Firebase.database
        .collection("tickets")
        .doc()
        .set({
          title: title,
          wager: wager,
          description: description,
          winner: [],
          loser: [],
          open: true,
          author: user.userName,
          authorId: userId
        });
      userRef.update({
        balance: firebase.firestore.FieldValue.increment(-wager)
      });
      bookRef.update({
        amount: firebase.firestore.FieldValue.increment(+wager)
      })
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    alert("ticket submitted");
  };
  const setter = set => e => {
    const { target } = e;
    const { value } = target;
    set(value);
  };
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={setter(setTitle)}
        type="text"
        name="title"
        placeholder="Title"
      />
      <input
        onChange={setter(setDescription)}
        type="text"
        name="description"
        placeholder="description"
      />
      <input
        onChange={setter(setWager)}
        type="number"
        name="amount"
        placeholder="0"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTicket;
