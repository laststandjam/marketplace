import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import ReactScrollableList from 'react-scrollable-list'

const Home =()=>{
  const [topUsers, setTopUsers] = useState([])
  const [topTickets, setTopTickets]= useState([])
  const ticketsRef = Firebase.database.collection("tickets").orderBy("wager",'desc')
  const userRef = Firebase.database.collection("users").orderBy("balance", 'desc').limit(5)
  const ticketsArr=[]
  const userArr=[]
  
  const sort = (arr,ref,func)=>{
    ref.get().then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        console.log(doc.id, ' => ', doc.data())
          arr.push({...doc.data()})
      })
      func(arr)
    })
  }
  useEffect(() => {
    sort(userArr, userRef, setTopUsers)
    sort(ticketsArr, ticketsRef, setTopTickets)
    return () => {
      
    };
  }, [])
  return(
    <div>
    <ReactScrollableList border="2px solid black"
    listItems={topUsers}
    heighOfItem={10}
   />
  </div>
)
}


export default Home;