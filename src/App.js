
import React, { useState } from "react";
import "./App.css";
import db from "./config/db";
  
function App() {
  // const [customerName, setCustomerName] = useState("");
  // const [customerPassword, setCustomerPassword] = useState("");
  
  // // push and pull data
  // var docRef = db.collection("customersData").doc("1ju4q6RYGonL1PhjHVVP");
  // docRef.get().then((doc) => {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch((error) => {
  //     console.log("Error getting document:", error);
  // });

  // const submit = (e) => {
  //   e.preventDefault();
  //   db.collection("customersData").add({
  //     name: customerName,
  //     password: customerPassword,
  //   });
  
  //   setCustomerName("");
  //   setCustomerPassword("");
  // };
  
  let handleSave= () => (e) => {
    
    console.log("Title:",e.target.firstChild.value);
    console.log("Body:",e.target.childNodes[2].value);
    console.log("Date:","going to work on this...");
  };
  
  let handleClear={};
  
  let handleLeave={};
  
  return (
    //need to have a navigation, a dtails bar, a title, an input, and enter buton to save, a close button.
    <div className="wrap">
      <header>
        <nav style={{textAlign:"center"}}>
          <a href="#">New Note</a>
          <hr/>
          <a href="#">Note List</a>
          <hr/>
          <a href="#">Calendar</a>
          <hr/>
          <a href="#">Preferences</a>
          <hr/>
          <a href="#">Back to website</a>
          <hr/>
        </nav>
        <div className="details">
        </div>
      </header>
      <form onSubmit= {handleSave()}>
        <input defaultValue="note Title"/>
        <hr/>
        <textarea rows="4" cols="50" defaultValue="dummyText"/>
        <br/>
        <input type="submit" value="save" />
       {/*<button onClick={handleClear}>Clear</button>*/}
        {/*<button onClick={handleLeave}>Leave</button>*/}
      </form>

    </div>
    // <div className="App">
    //   <div className="App__form">
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={customerName}
    //       onChange={(e) => setCustomerName(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Password"
    //       value={customerPassword}
    //       onChange={(e) => setCustomerPassword(e.target.value)}
    //     />
    //     <button onClick={submit}>Submit</button>
    //   </div>
    // </div>
  );
}
  
export default App;