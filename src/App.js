import React, {
  useState,
  useEffect
}
from "react";
import "./App.css";
import db from "./config/db";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
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

  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

const NoteList = (props) => {
  
  const fullDataBase = props.noteList;
  const years = fullDataBase.years;
  // years 
  // ? years.forEach(year => {
  //   console.log(year.months)
  //   year.months.forEach(month => {
  //     console.log(month.days);
  //     month.days.forEach(day => {
  //       console.log(day.notes)
  //       day.notes.forEach(note => {
  //         console.log("note?",note.noteID,note)
  //       })
  //     })
  //     })
  // }) 
  // : console.log("fail year")
  
  return(
    
    <div id="note-list">
    <h1>All Years </h1>
    <ul>{years ? years.map(year => <li key = {year.yearId}><DomYear year={year}/></li>) : "no Years found"}</ul>
    </div>
    )
}

const DomYear = (props) => {

  const year = props.year;
  const yearId = props.year.yearId; //props.year.yearID
  //for every month in the year, pull a domMonth and append to the months array
  const months = year.months;
  //
  //then append this months array to domYear Element
  return (<div className="note-list-year">
  <h2>Year {yearId} </h2>
  
  <ul>{months ? months.map(month => <li key = {month.monthId}><DomMonth month={month}/></li>) : "no months found"}</ul>
  </div>)
}

const DomMonth = (props) => {

  const monthId = props.month.monthId;
  //for every day in the Month, pull a domDay and append to the days array
  const days = props.month.days;
  //then append this days array to domMonth Element
  return (<div className="note-list-month">
  <h2>Month {monthId} </h2>
  
  <ul>{days ? days.map(day => <li key= {day.dayId}><DomDay day={day}/></li>) : "no days found"}</ul>
  </div>)
}

const DomDay = (props) => {

  const dayId = props.day.dayId;
  //for every note in the Day, pull a domNote and append to the notes array
  const notes = props.day.notes;
  //then append this notes array to domDay Element
  return (<div className="note-list-day">
  <h3>Day {dayId}</h3>
  
  <ul>{notes ? notes.map(note => <li key= {note.noteId}><DomNote note={note}/></li>) : "no notes found"}</ul>
  </div>)
}

const DomNote = (props) => {
  
  const note = props.note;
  return (<div className="note-list-note">
  <p>Note number#{note.noteId}</p>
  <h4>{note.header}</h4>
  {/*<em>{noteDateString.year}-{noteDateString.month}-{noteDateString.day}</em><br/>*/}
  <strong>{note.body}</strong><br/>
  <em>Last Saved At :: {note.addedTime.year}-{note.addedTime.month}-{note.addedTime.day} @{note.addedTime.hour}:{note.addedTime.minutes}{note.addedTime.hour > 12 ? "PM" : "AM"} [{note.addedTime.seconds}{note.addedTime.milliseconds}]</em><br/>
  </div>)
}

//Header+navigation component
const Header = () => {
  
  return(
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
        </header>)
}

const NoteEditor = () => {
  
  const openDate = new Date();
  
  const [noteHeader, setNoteHeader] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteDate, setNoteDate] = useState({
    year: openDate.getFullYear().toString(),
    month: pad(openDate.getMonth() + 1),
    day: pad(openDate.getDate())
  });
  
  const handleSave = () => (e) => {

    //also note date

    setNoteHeader(document.getElementById("note-title").value);
    setNoteContent(document.getElementById("note-content").value);

    let dateChoice = document.getElementById("note-date").value.split("-");

    let dateChoiceObject = {
      year: dateChoice[0],
      month: dateChoice[1],
      day: dateChoice[2],
    }

    setNoteDate(dateChoiceObject)


    const saveTime = new Date() //going to leave this here for later

    const saveYear = saveTime.getFullYear();
    const saveMonth = saveTime.getMonth() + 1;
    const saveDay = saveTime.getDay();
    const saveHour = saveTime.getHours();
    const saveMinutes = saveTime.getMinutes();
    const saveSeconds = saveTime.getSeconds();
    const saveMilliseconds = saveTime.getMilliseconds();

    const saveTimeObject = {
      year: saveYear,
      month: saveMonth,
      day: saveDay,
      hour: saveHour,
      minutes: saveMinutes,
      seconds: saveSeconds,
      milliseconds: saveMilliseconds
    }


    const yearRefNow = db.collection("years").doc(noteDate.year);
    const monthRefNow = yearRefNow.collection("months").doc(noteDate.month);
    const dayRefNow = monthRefNow.collection("days").doc(noteDate.day);

    const notesPromise = dayRefNow.collection("notes").get()

    let size = 0;
    notesPromise.then(snapshot => {

      size = snapshot.size;

      yearRefNow.set({
        dateField: noteDate.year
      })
      monthRefNow.set({
        monthField: noteDate.month
      })
      dayRefNow.set({
        dayField: noteDate.day
      })
      dayRefNow.collection("notes").doc(size.toString()).set({
        header: noteHeader,
        body: noteContent,
        noteDate: noteDate,
        addedTime: saveTimeObject
      });

    });

    e.preventDefault();

  }

  const handleClear = {};

  const handleLeave = {};
  
  return(
          <form onSubmit= {handleSave()}>
          <p>Date for new note</p>
          <input id="note-date" type="date" name="trip-start"
           defaultValue={`${noteDate.year}-${noteDate.month}-${noteDate.day}`}
           min="1990-01-01" max="2050-12-31"/>
           <p>OR- Pull up existing note to edit.</p>
           
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
        )
}

const NoteViewer = (props) => {
  
}

const NoteCalendar = (props) => {
  
}

const Preferences = (props) => {
  
}

function App() {



  const [noteList, setNoteList] = useState([])
  let notesReference = [];

  //grab notes in one day
  const fetchNotes = (year, month, day) => {
    const yearRef = db.collection("years").doc(year);
    const monthRef = yearRef.collection("months").doc(month);
    const dayRef = monthRef.collection("days").doc(day);

    let notes = [];
    dayRef.collection("notes").get().then((querySnapshot) => {
      for (let doc_item of querySnapshot.docs) {
        // console.log(doc_item.data())
      }
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  //grab a snapShot of the current note database
  const fetchAllNotes = () => {

    //array of all notes
    let tempNoteList = [];

    //object containing snapShot of database structure and data
    let notesData = { years: [] };

    //check if noteList state is empty, only want to pull this once on refresh
    if (noteList.length == 0) {

      db
        .collection("years")
        .get()
        .then((querySnapshotYears) => {
          for (let yearIndex = 0; yearIndex < querySnapshotYears.docs.length; yearIndex++) {
            const years = querySnapshotYears.docs;
            const yearRef = db.collection("years").doc(years[yearIndex].id);
            //add new year object
            notesData.years[yearIndex] = {
              yearId: years[yearIndex].id,
              months: []
            };

            yearRef
              .collection("months")
              .get()
              .then((querySnapshotMonths) => {
                for (let monthIndex = 0; monthIndex < querySnapshotMonths.docs.length; monthIndex++) {
                  const months = querySnapshotMonths.docs;
                  const monthRef = yearRef.collection("months").doc(months[monthIndex].id)
                  notesData.years[yearIndex].months[monthIndex] = {
                    monthId: months[monthIndex].id,
                    days: []

                  };

                  monthRef
                    .collection("days")
                    .get()
                    .then((querySnapshotDays) => {
                      for (let dayIndex = 0; dayIndex < querySnapshotDays.docs.length; dayIndex++) {
                        const days = querySnapshotDays.docs;
                        const dayRef = monthRef.collection("days").doc(days[dayIndex].id);
                        notesData.years[yearIndex].months[monthIndex].days[dayIndex] = {
                          dayId: days[dayIndex].id,
                          notes: []

                        };

                        dayRef
                          .collection("notes")
                          .get()
                          .then((querySnapshotNotes) => {
                            for (let noteIndex = 0; noteIndex < querySnapshotNotes.docs.length; noteIndex++) {
                              const notes = querySnapshotNotes.docs;
                              if (querySnapshotNotes.empty) {
                                console.log("empty")
                                continue;
                              }
                              // console.log("before set", noteList.length)
                              // console.log("year-month-day-note", year.id, '-', month.id, '-', day.id, '-', note.id)
                              notesData.years[yearIndex].months[monthIndex].days[dayIndex].notes[noteIndex] = {...notes[noteIndex].data(),noteId:notes[noteIndex].id};

                              tempNoteList[tempNoteList.length] = notes[noteIndex].data()
                              setNoteList(notesData)

                            }
                          })
                      }

                    })

                }
              })
          }

        })
    }
  }
  // if(i<1 && )
  fetchAllNotes();





  return (
    //need to have a navigation, a dtails bar, a title, an input, and enter buton to save, a close button.
    <ErrorBoundary>
      <div className="wrap">
        <Header/>
        <NoteEditor/>
        <NoteList noteList={noteList}/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
