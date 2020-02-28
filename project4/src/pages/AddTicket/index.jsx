import React, {useState, useEffect}from "react";
import Firebase,{auth} from '../../resources/FireBase/firebase';

const AddTicket =(currentUser)=>{
console.log(currentUser.currentUser.uid )
    const [inputs, setInputs] = useState({});

    const handleSubmit = async event =>{
        event.preventDefault()
        try {
            const docRef = await Firebase.database.collection('tickets').add(inputs)
            console.log('Document written with ID: ', docRef.id)
          } catch (error) {
            console.error('Error adding document: ', error)
          }
          alert('Movie submitted')
        }
    const handleChange = (event) =>{
        event.persist()
        setInputs(inputs=>({...inputs, [event.target.name]:event.target.value,
        acceptated:false,
        players:[currentUser.currentUser.uid],
        winner:null,
        author:currentUser.currentUser.uid,
        closed:false

    }))

    }
    return (
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
          />
          <input onChange={handleChange}
            type="text"
            name="description"
            placeholder="description"
          />
          <input onChange={handleChange}
            type="number"
            name="amount"
            placeholder= "0"
            />
            <input onChange={handleChange}
            type="text"
            name="dateClose"
            />

          <button type="submit">Submit</button>
        </form>
        );
      }


export default AddTicket;