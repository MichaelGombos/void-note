
import React, { useState,useEffect } from "react";
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
  const [noteHeader, setNoteHeader] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteList, setNoteList] = useState([])
  let notesReference = [];
  
    
    
    //call a call .collection on the doc or do I need to call it on the reference?

  //get one note.
  
  // room to go deeper to each note 
  
  let fetchNotes = (year,month,day) => {
    var yearRef = db.collection("Years").doc(year);     
    var monthRef = yearRef.collection("months").doc(month);
    var dayRef = monthRef.collection("days").doc(day);
    
    let notes = [];
    dayRef.collection("notes").get().then((querySnapshot) => 
    {
      for(let doc_item of querySnapshot.docs){
        console.log(doc_item.data())
        
      }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
  
  let fetchDays = () => {
    
  }
  
  let fetchMonths = () => {
    
  }
  
  let fetchYears = () => {
    
  }
  
  //get notes for one day 

    fetchNotes("2022","01-2022",`${pad(1)}`)
  
  //pad the date fields
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  let handleSave= () => (e) => {
    
    let thisDate = new Date()

    var yearRefNow = db.collection("Years").doc(thisDate.getFullYear().toString());     
    var monthRefNow = yearRefNow.collection("months").doc((thisDate.getMonth()+1).toString());
    var dayRefNow = monthRefNow.collection("days").doc(thisDate.getDate().toString());
  
      
    
    setNoteHeader(e.target.firstChild.value);
    setNoteContent(e.target.childNodes[2].value);
    
    console.log("Date:","going to work on this...");
    console.log("Year",thisDate.getFullYear())
    console.log("Month",(thisDate.getMonth()+1))
    console.log("Day",thisDate.getDate())
    
    const notesPromise = dayRefNow.collection("notes").get()
    
    let size = 0;
    notesPromise.then( snapshot => {      
    
    size = snapshot.size;
    console.log("size",size);
    
    dayRefNow.collection("notes").doc(size.toString()).set({
        header: noteHeader,
        body: noteContent,
        date: "still Working on this"
      });
    });

    e.preventDefault();

  }
  
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
        {/*<button onClick={handleLeave}>Save and New</button>*/}
      </form>
      <div id="notes-list">
        <ul>
          {/*grab database notes and map to list*/}
          <li>{ 123 }</li>
          <li>{}</li>
          <li>{console.log()}</li>
          <li>{}</li>
        </ul>
      </div>
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