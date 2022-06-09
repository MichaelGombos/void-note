
import React, { useState,useEffect } from "react";
import "./App.css";
import db from "./config/db";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
  
  
function App() {
  
  const openDate = new Date();
  const [noteHeader, setNoteHeader] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteDate, setNoteDate] = useState([openDate.getFullYear().toString(),pad(openDate.getMonth()+1),pad(openDate.getDate())]);
  const [noteList, setNoteList] = useState([])
  let notesReference = [];
  
  
  
  const fetchNotes = (year,month,day) => {
    const yearRef = db.collection("Years").doc(year);     
    const monthRef = yearRef.collection("months").doc(month);
    const dayRef = monthRef.collection("days").doc(day);
    
    let notes = [];
    dayRef.collection("notes").get().then((querySnapshot) => 
    {
      for(let doc_item of querySnapshot.docs){
        // console.log(doc_item.data())
      }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
  
  const fetchDays = () => {
    
  }
  
  const fetchMonths = () => {
    
  }
  
  const fetchYears = () => {
    
  }
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  const handleSave= () => (e) => {
    

    //also note date
    console.log("title",document.getElementById("note-title"))
    console.log("content",document.getElementById("note-content"))
    console.log("date",document.getElementById("note-date"))
    console.log("date.value",document.getElementById("note-date").value)
    console.log("date.value split",document.getElementById("note-date").value.split('-'))
    
    setNoteHeader(document.getElementById("note-title").value);
    setNoteContent(document.getElementById("note-content").value);
    setNoteDate(document.getElementById("note-date").value.split("-"))


    const saveTime = new Date() //going to leave this here for later
    
    const year = noteDate[0];
    const month = noteDate[1];
    const day = noteDate[2];
    
    const yearRefNow = db.collection("Years").doc(year);     
    const monthRefNow = yearRefNow.collection("months").doc(month);
    const dayRefNow = monthRefNow.collection("days").doc(day);
    
    
    console.log("Date:","going to work on this...");
    console.log("Year",year)
    console.log("Month",month)
    console.log("Day", day)
    
    const notesPromise = dayRefNow.collection("notes").get()
    
    let size = 0;
    notesPromise.then( snapshot => {      
    
    size = snapshot.size;
    console.log("size",size);
    
    dayRefNow.collection("notes").doc(size.toString()).set({
        header: noteHeader,
        body: noteContent,
        date: noteDate
      });
    });

    e.preventDefault();

  }
  
  const handleClear={};
  
  const handleLeave={};
  
  
  return (
    //need to have a navigation, a dtails bar, a title, an input, and enter buton to save, a close button.
    <ErrorBoundary>
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
          <input id="note-date" type="date" name="trip-start"
           defaultValue={`${noteDate[0]}-${noteDate[1]}-${noteDate[2]}`}
           min="1990-01-01" max="2050-12-31"/>
           <hr/>
          <input id="note-title" defaultValue="note Title"/>
          <hr/>
          <textarea id="note-content" rows="4" cols="50" defaultValue="Write it out"/>
          <br/>
          <input type="submit" value="save" />
         {/*<button onClick={handleClear}>Clear</button>*/}
          {/*<button onClick={handleLeave}>Save and New</button>*/}
        </form>
        <div id="notes-list">
          <ul>
            {/*grab database notes and map to list*/}
            <li>{ 1234 }</li>
            <li>{}</li>
            <li>{console.log()}</li>
            <li>{}</li>
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;