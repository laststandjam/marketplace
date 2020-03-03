import React, { useState } from "react";
import Firebase from "../../resources/FireBase/firebase";
import {useSession} from '../../App'

const CreateTicket = () => {
  const [inputs, setInputs] = useState({});
  const userId = useSession().uid
  const userRef = Firebase.database.collection("users").doc(userId);
  let user = {};
  const fetchUser = () => {
    userRef.get().then(function(doc) {
      if (doc.exists) {
        user = { ...doc.data() };
        console.log(user);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const docRef = await Firebase.database.collection("tickets").add(inputs);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    alert("ticket submitted");
  };
  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
      winner: [],
      loser: [],
      open: true,
      author: user.userName,
      authorId: userId
    }));
  };
  
  fetchUser();
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="Title"
      />
      <input
        onChange={handleChange}
        type="text"
        name="description"
        placeholder="description"
      />
      <input
        onChange={handleChange}
        type="number"
        name="amount"
        placeholder="0"
      />
      <input onChange={handleChange} type="text" name="dateClose" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTicket;
