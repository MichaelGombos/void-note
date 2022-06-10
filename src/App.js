
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
  
  let i = 0;
function App() {
  
  const openDate = new Date();
  const [noteHeader, setNoteHeader] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteDate, setNoteDate] = useState({
    year:openDate.getFullYear().toString(),
    month:pad(openDate.getMonth()+1),
    day:pad(openDate.getDate())
  });
  const [noteList, setNoteList] = useState([])
  let notesReference = [];
  

  
  //grab all notes in one day
  const fetchNotes = (year,month,day) => {
    const yearRef = db.collection("years").doc(year);     
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

// let allNotes = [];

  const fetchAllNotes = () => {
    
    let tempNoteList = [];
    //add resolve to handle caching l8er
    
    //check if noteList state is empty
    if(noteList.length == 0){
      db
      .collection("years")
      .get()
      .then((querySnapshotYears) => {
      for (let year of querySnapshotYears.docs) {
  
          const yearRef = db.collection("years").doc(year.id);
          
          yearRef
          .collection("months")
          .get()
          .then((querySnapshotMonths) => {
              for (let month of querySnapshotMonths.docs) {
  
                  const monthRef = yearRef.collection("months").doc(month.id);
  
                  monthRef
                  .collection("days")
                  .get()
                  .then((querySnapshotDays) => {
                      for (let day of querySnapshotDays.docs) {
                          const dayRef = monthRef.collection("days").doc(day.id);
                          dayRef
                          .collection("notes")
                          .get()
                          .then((querySnapshotNotes) => {
                              for (let note of querySnapshotNotes.docs) {
                                  if (querySnapshotNotes.empty) {
                                      console.log("empty")
                                      continue;
                                  }
                                  console.log("before set",noteList.length)
                                  console.log("year-month-day-note",year.id,'-',month.id,'-',day.id,'-',note.id)
                                  tempNoteList[tempNoteList.length] = note.data()
                                  setNoteList(tempNoteList)
                                  
                              }
                          })
                      }
  
                  })
  
              }
          })
      }
  })
    }
    console.log("noteListAtEndOfFunction",noteList)
  }
  // if(i<1 && )
  fetchAllNotes();
  console.log("after everything?",noteList)
  //need a function to transfrom allNotes array into objects.. nvm they are literally already objects 
  
  // const fetchDays = () => {
    
  // }
  
  // const fetchMonths = () => {
    
  // }
  
  // const fetchYears = () => {
    
  // }
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  const handleSave= () => (e) => {
    

    //also note date

    setNoteHeader(document.getElementById("note-title").value);
    setNoteContent(document.getElementById("note-content").value);
    
    let dateChoice =  document.getElementById("note-date").value.split("-");
    
    let dateChoiceObject = {
      year:dateChoice[0],
      month:dateChoice[1],
      day:dateChoice[2],
    }
    
    setNoteDate(dateChoiceObject)


    const saveTime = new Date() //going to leave this here for later
    
    const saveYear = saveTime.getFullYear();
    const saveMonth = saveTime.getMonth()+1;
    const saveDay = saveTime.getDay();
    const saveHour = saveTime.getHours();
    const saveMinutes = saveTime.getMinutes();
    const saveSeconds = saveTime.getSeconds();
    const saveMilliseconds = saveTime.getMilliseconds();
    
    const saveTimeObject = {
      year:saveYear,
      month:saveMonth,
      day:saveDay,
      hour:saveHour,
      minutes:saveMinutes,
      seconds:saveSeconds,
      milliseconds:saveMilliseconds
    }
    
    
    const yearRefNow = db.collection("years").doc(noteDate.year);     
    const monthRefNow = yearRefNow.collection("months").doc(noteDate.month);
    const dayRefNow = monthRefNow.collection("days").doc(noteDate.day);
    
    const notesPromise = dayRefNow.collection("notes").get()
    
    let size = 0;
    notesPromise.then( snapshot => {      
    
    size = snapshot.size;
    
    yearRefNow.set({dateField : noteDate.year})
    monthRefNow.set({monthField: noteDate.month})
    dayRefNow.set({dayField: noteDate.day})
    dayRefNow.collection("notes").doc(size.toString()).set({
        header: noteHeader,
        body: noteContent,
        noteDate: noteDate,
        addedTime: saveTimeObject
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
           defaultValue={`${noteDate.year}-${noteDate.month}-${noteDate.day}`}
           min="1990-01-01" max="2050-12-31"/>
           <hr/>
          <input id="note-title" defaultValue="note Title" />
          <hr/>
          <textarea id="note-content" rows="4" cols="50" defaultValue="Write it out"/>
          <br/>
          <input type="submit" value="save"  />
         {/*<button onClick={handleClear}>Clear</button>*/}
          {/*<button onClick={handleLeave}>Save and New</button>*/}
        </form>
        <div id="notes-list">
          <ul>
            {/*grab database notes and map to list*/}

            <ul>{noteList.map(note =>
            <div className="note">
              <h1>{note.header}</h1>
              <p>{note.body}</p>
              <div className="note-date">
              <h3>Note Date</h3>
                <p>{note.noteDate.year}</p>
                <p>{note.noteDate.month}</p>
                <p>{note.noteDate.day}</p>
              </div>
              <div className="save-date">
                <h3>Added on</h3>
                <em>{note.addedTime.year}-{note.addedTime.month}-{note.addedTime.day} at {note.addedTime.hour}:{note.addedTime.minutes}{note.addedTime.hour>12 ? "PM" : "AM"} [sec,mili]-[{note.addedTime.seconds}:{note.addedTime.milliseconds}]</em>
              </div>
            </div>
            )}</ul>
            <li>{console.log("noteListInDom",noteList[0])}</li>
            <li>{}</li>
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;