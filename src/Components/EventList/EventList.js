// import React, { useEffect, useState } from 'react';
// import './EventList.css';
// import axios from 'axios';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/events'); // Replace with your actual endpoint
//         setEvents(response.data); // Ensure data format matches your API response
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Could not fetch events. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);


//  /////////////////////////////////Ma display ang list kung naka connect nasa databse/////////////////////////// 
//   return (
//     <div className='eventList-mainbox'>
//       {/* Sidebar Section */}
//       <div className="eventList-sidebar">
//         <div className="eventList-logo">
//           <div className='eventList-seamslogo'></div>
//           <h2 className='eventList-seams-txt'>SEAMS</h2>
//         </div>
        
//         <div className='eventList-adminbox'>
//           <div className='eventList-adminimage'></div>
//           <h2 className='eventList-adminNameH2'>Jerryl Perez</h2>
//         </div>

//         <div className="eventList-menu">
//           <button>COURSE</button>
//           <button>EVENT</button>
//           <button>SANCTION</button>
//           <button>DATABASE</button>
//         </div>
//         <div className="eventList-exit">
//           <div className='eventList-exitimg'></div>
//           <button>EXIT</button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className='eventList-leftcont-box'>
//         <div className='eventList-logoboxlcc'>
//           <div className='eventList-lccBlogo'></div>
//         </div>

//         <div className="eventList-backevent-btnbox">
//           <div className='eventList-order1'>
//             <div className='eventList-arrowimg'></div>
//             <button className='eventList-backevent-btn'>Add new events</button>
//           </div>
//           <h4 className='eventList-backbtnh4'>
//             Press to seamlessly create and manage engaging activities within the system
//           </h4>
//         </div>

//         <div className='eventList-addeventForm'>
//           <h2 className='eventList-addeventformH2'>All Events</h2>
//           <h4 className='eventList-addeventformH4'>
//             Explore and manage all activities in the system.
//           </h4>

//           {loading ? (
//             <p>Loading events...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : events.length === 0 ? (
//             <p>No events available.</p>
//           ) : (
//             <table className="eventList-event-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Venue</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Year Level</th>
//                   <th>Course</th>
//                   <th># Attendees</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {events.map((event, index) => (
//                   <tr key={event.id || index}>
//                     <td>{event.name}</td>
//                     <td>{event.venue}</td>
//                     <td>{event.date}</td>
//                     <td>{event.time}</td>
//                     <td>{event.yearlevel}</td>
//                     <td>{event.course}</td>
//                     <td>{event.attendees}</td>
//                     <td>
                      
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventList;


/////////////////Display data nga wala ga connect sa database//////////////////////////////////////////////////////////


import React, { useEffect, useState } from 'react';
import './EventList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {

  useEffect(() => {
    axios
      .get('')//Diri butang ang link sang localhost(API link kung kung diin kwaon ang data(XAMPP/SQL))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const [events, setEvents] = useState([
    { name: 'Design Sprint', venue: 'Room 202', date: '01/12/2024', time: '9:00 AM', yearlevel: '1,2', course: 'BLIS', attendees: '102' },
    { name: 'Workshop on React', venue: 'Hall A', date: '03/10/2024', time: '10:00 AM', yearlevel: '1,2,3,4', course: 'All Courses', attendees: '437' },
    { name: 'Networking Night', venue: 'Main Lobby', date: '04/22/2024', time: '6:00 PM', yearlevel: '3', course: 'BSIT', attendees: '184' },
    { name: 'Departmental Meeting', venue: 'Auditorium', date: '06/30/2024', time: '8:30 AM', yearlevel: '1,2', course: 'All Courses', attendees: '490' },
    { name: 'Designer & Programmers Talk', venue: 'Auditorium', date: '07/14/2024', time: '8:30 AM', yearlevel: '1,2,3,4', course: 'BSIT', attendees: '490' },
    { name: 'Workshop on React', venue: 'Hall A', date: '08/05/2024', time: '10:00 AM', yearlevel: '1,2,3,4', course: 'All Courses', attendees: '437' },
    { name: 'Networking Night', venue: 'Main Lobby', date: '08/27/2024', time: '6:00 PM', yearlevel: '3', course: 'BSIT', attendees: '184' },
    { name: 'Design Sprint', venue: 'Room 202', date: '09/18/2024', time: '9:00 AM', yearlevel: '1,2', course: 'BLIS', attendees: '102' },
    { name: 'Departmental Meeting', venue: 'Auditorium', date: '10/08/2024', time: '8:30 AM', yearlevel: '1,2', course: 'All Courses', attendees: '490' },
    { name: 'Designer & Programmers Talk', venue: 'Auditorium', date: '10/18/2024', time: '8:30 AM', yearlevel: '1,2,3,4', course: 'BSIT', attendees: '490' },
    { name: 'Workshop on React', venue: 'Hall A', date: '10/20/2024', time: '10:00 AM', yearlevel: '1,2,3,4', course: 'All Courses', attendees: '437' },
    { name: 'Networking Night', venue: 'Main Lobby', date: '11/01/2024', time: '6:00 PM', yearlevel: '3', course: 'BSIT', attendees: '184' },
    { name: 'Design Sprint', venue: 'Room 202', date: '12/05/2024', time: '9:00 AM', yearlevel: '1,2', course: 'BLIS', attendees: '102' },
    { name: 'Departmental Meeting', venue: 'Auditorium', date: '12/22/2024', time: '8:30 AM', yearlevel: '1,2', course: 'All Courses', attendees: '490' },
    { name: 'Designer & Programmers Talk', venue: 'Auditorium', date: '12/23/2024', time: '8:30 AM', yearlevel: '1,2,3,4', course: 'BSIT', attendees: '490' },
    { name: 'Workshop on React', venue: 'Hall A', date: '12/24/2024', time: '10:00 AM', yearlevel: '1,2,3,4', course: 'All Courses', attendees: '437' },
    { name: 'Networking Night', venue: 'Main Lobby', date: '12/25/2024', time: '6:00 PM', yearlevel: '3', course: 'BSIT', attendees: '184' },
    { name: 'Design Sprint', venue: 'Room 202', date: '12/26/2024', time: '9:00 AM', yearlevel: '1,2', course: 'BLIS', attendees: '102' },
    { name: 'Departmental Meeting', venue: 'Auditorium', date: '12/28/2024', time: '8:30 AM', yearlevel: '1,2', course: 'All Courses', attendees: '490' },
    { name: 'Designer & Programmers Talk', venue: 'Auditorium', date: '12/30/2024', time: '8:30 AM', yearlevel: '1,2,3,4', course: 'BSIT', attendees: '490' }
  ]);

  return (
    <div className='eventList-mainbox'>
      {/* Sidebar Section */}
      <div className="eventList-sidebar">
        <div className="eventList-logo">
          <div className='eventList-seamslogo'></div>
          <h2 className='eventList-seams-txt'>SEAMS</h2>
        </div>

        <div className='eventList-adminbox'>
          <div className='eventList-adminimage'></div>
          <h2 className='eventList-adminNameH2'>Jerryl Perez</h2>
        </div>

        <div className="eventList-menu">
          <button>COURSE</button>
          <button>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>
        <div className="eventList-exit">
          <div className='eventList-exitimg'></div>
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className='eventList-leftcont-box'>
        <div className='eventList-logoboxlcc'>
          <div className='eventList-lccBlogo'></div>
        </div>
        <div className="eventList-backevent-btnbox">
          <div className='eventList-order1'>
            <div className='eventList-arrowimg'></div>
            <button className='eventList-backevent-btn'>Add new events</button>
          </div>
          <h4 className='eventList-backbtnh4'>
            Press to seamlessly create and manage engaging activities within the system
          </h4>
        </div>

        <div className='eventList-addeventForm'>
          <h2 className='eventList-addeventformH2'>All Events</h2>
          <h4 className='eventList-addeventformH4'>
            Explore and manage all activities in the system.
          </h4>

          <table className="eventList-event-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Year Level</th>
              <th>Course</th>
              <th># Attendees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.venue}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.yearlevel}</td>
                <td>{event.course}</td>
                <td>{event.attendees}</td>
                <td>
                  <Link to=''>View</Link>
                  <Link to=''>Edit</Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </div>
  );
};

export default EventList;
