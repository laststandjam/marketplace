import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"

const Home =()=>{
  const [topUsers, setTopUsers] = useState([])
  const [topTickets, setTopTickets]= useState([])
  const ticketsRef = Firebase.database.collection("tickets").orderBy("wager",'desc').limit(5)
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
    <ul style={{ marginTop: 0 }}>
      {topUsers.map((u, i) => (
        <li key={i}>
         {u.userName}
        </li>
      ))}
    </ul>
  </div>
)
}


export default Home;