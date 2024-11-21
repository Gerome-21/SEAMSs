import React, { useEffect, useState } from 'react';
import './AddNewEventform.css';
import axios from 'axios';

const AddNewEventform = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    eventTime: '',
    eventTimeEnd: '',
    yearlevel: '',
    course: ''
  });
  
  const [message, setMessage] = useState(""); // State to manage user feedback

  useEffect(() => {
    axios.get('http://localhost:5000/your-api-endpoint') // Replace with your actual endpoint
      .then((res) => console.log("Data fetched:", res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isConfirmed = window.confirm("Confirm Event Submission?");
    if (!isConfirmed) return;

    try {
      const response = await axios.post('http://localhost:5000/submit-event', formData);
      setMessage("Event submitted successfully!");
      setFormData({
        eventName: '',
        venue: '',
        eventDate: '',
        eventTime: '',
        eventTimeEnd: '',
        yearlevel: '',
        course: ''
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className='ANEform-mainbox'>
      {/* Sidebar Section */}
      <div className="ANEform-sidebar">
        <div className="ANEform-logo">
          <div className='ANEform-seamslogo'></div>
          <h2 className='ANEform-seams-txt'>SEAMS</h2>
        </div>

        <div className='ANEform-adminbox'>
          <div className='ANEform-adminimage'></div>
          <h2 className='ANEform-adminNameH2'>Jerryl Perez</h2>
        </div>

        <div className="ANEform-menu">
          <button>COURSE</button>
          <button>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>

        <div className="ANEform-exit">
          <div className='ANEform-exitimg'></div>
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className='ANEform-leftcont-box'>
        <div className='ANEform-logoboxlcc'>
          <div className='ANEform-lccBlogo'></div>
        </div>

        <div className="ANEform-backevent-btnbox">
          <div className='ANEform-order1'>
            <div className='ANEform-arrowimg'></div>
            <button className='ANEform-backevent-btn'>Back to events</button>
          </div>
          <h4 className='ANEform-backbtnh4'>Press to return to the events page</h4>
        </div>

        {/* Add Event Form */}
        <div className='ANEform-addeventForm'>
          <h2 className='ANEform-addeventformH2'>Event Information</h2>
          <h4 className='ANEform-addeventformH4'>Please enter details to proceed</h4>

          <form onSubmit={handleSubmit}>
            <div className="ANEform-form-grid">
              {/* Event Name Field */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="eventName">Event Name</label>
                <input 
                  type="text" 
                  id="eventName" 
                  name="eventName" 
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Venue Field */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="venue">Venue</label>
                <input 
                  type="text" 
                  id="venue" 
                  name="venue" 
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Event Date Field */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="eventDate">Date</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  className="ANEform-date-input"
                />
              </div>

              {/* Event Time Fields */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="eventTime">Time Start</label>
                <input 
                  type="time" 
                  id="eventTime" 
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="eventTimeEnd">Time End</label>
                <input 
                  type="time" 
                  id="eventTimeEnd" 
                  name="eventTimeEnd"
                  value={formData.eventTimeEnd}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Year Level Field */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="yearlevel">Year Level</label>
                <select
                  id="yearlevel"
                  name="yearlevel"
                  value={formData.yearlevel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Year Level</option>
                  <option value="1st_year">1st Year</option>
                  <option value="2nd_year">2nd Year</option>
                  <option value="3rd_year">3rd Year</option>
                  <option value="4th_year">4th Year</option>
                  <option value="5th_year">5th Year</option>
                </select>
              </div>

              {/* Course Selection */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="course">Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Course</option>
                  <option value="BSIT">Bachelor of Science in Information Technology</option>
                  <option value="BLIS">Bachelor of Library and Information Science</option>
                </select>
              </div>

              <div className="ANEform-form-group">
                <button type="submit" className='ANEform-submit-btnANE'>Submit Event</button>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>} {/* Display feedback message */}
        </div>
      </div>
    </div>
  );
};

export default AddNewEventform;
