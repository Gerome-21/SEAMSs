import React, { useEffect, useState } from 'react';
import './EventList.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const gotoAddNewEvent = () => {
    navigate('/addeventform');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/events');
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Could not fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Group events by month and year, then sort by latest
  const groupAndSortEventsByMonth = (events) => {
    const grouped = events.reduce((groups, event) => {
      const eventDate = new Date(event.eventDate);
      const eventMonth = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[eventMonth]) {
        groups[eventMonth] = [];
      }
      groups[eventMonth].push(event);
      return groups;
    }, {});

    // Convert to array, sort by date descending, and return as an object
    return Object.entries(grouped)
      .sort(([monthA], [monthB]) => {
        const [monthYearA, monthYearB] = [new Date(monthA), new Date(monthB)];
        return monthYearB - monthYearA; // Descending order
      })
      .reduce((sortedGroups, [key, value]) => {
        sortedGroups[key] = value;
        return sortedGroups;
      }, {});
  };

  const groupedAndSortedEvents = groupAndSortEventsByMonth(events);

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
            <button className='eventList-backevent-btn' onClick={gotoAddNewEvent}>Add new events</button>
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

          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p>{error}</p>
          ) : events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            Object.entries(groupedAndSortedEvents).map(([month, monthEvents]) => (
              <div key={month} className="eventList-month-card">
                <h3 className="eventList-month-title">{month}</h3>
                <table className="eventList-event-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>End</th>
                      <th>Year Level</th>
                      <th>Course</th>
                      <th>Sanction</th>
                      <th>Attendee</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthEvents.map((event) => (
                      <tr key={event.id}>
                        <td>{event.eventName}</td>
                        <td>{event.venue}</td>
                        <td>{event.eventDate}</td>
                        <td>{event.eventTime}</td>
                        <td>{event.eventTimeEnd}</td>
                        <td>{event.yearlevel}</td>
                        <td>{event.course}</td>
                        <td>{event.sanction}</td>
                        <td>{event.attendees}</td>
                        <td className="eventList-actions">
                          <Link to="" className="eventList-viewevent">View</Link>
                          <Link to="" className="eventList-updatebtn">Update</Link>
                          <button className="eventList-deletebtn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
