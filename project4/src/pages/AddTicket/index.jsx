import React from "react"
const AddTicket =async ()=>{
return(
  <div>hellow</div>
)}
   
//     const handleSubmit = async event =>{
//         event.preventDefault()
//         try {
//           const userId = await Firebase.getUser().uid 
//             const docRef = await Firebase.database.collection('tickets').add(inputs)
//             console.log('Document written with ID: ', docRef.id)
//           } catch (error) {
//             console.error('Error adding document: ', error)
//           }
//           alert('ticket submitted')
//         }
//     const handleChange = (event) =>{
//         event.persist()
//         setInputs(inputs=>({...inputs, [event.target.name]:event.target.value,
//         winner:null,
    
//         closed:false
//     }))

//     }
//     return (
//         <form onSubmit={handleSubmit}>
//           <input onChange={handleChange}
//             type="text"
//             name="title"
//             placeholder="Title"
//           />
//           <input onChange={handleChange}
//             type="text"
//             name="description"
//             placeholder="description"
//           />
//           <input onChange={handleChange}
//             type="number"
//             name="amount"
//             placeholder= "0"
//             />
//             <input onChange={handleChange}
//             type="text"
//             name="dateClose"
//             />

//           <button type="submit">Submit</button>
//         </form>
//         );
//       }


export default AddTicket;