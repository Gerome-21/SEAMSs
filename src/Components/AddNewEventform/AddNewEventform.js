import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './AddNewEventform.css';
import axios from 'axios';

const AddNewEventform = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    eventTime: '',
    eventTimeEnd: '',
    yearlevel: [],
    course: [],
    sanction: ''
  });

  const [message, setMessage] = useState("");

  const yearLevelOptions = [
    { value: '1st_year', label: '1st Year' },
    { value: '2nd_year', label: '2nd Year' },
    { value: '3rd_year', label: '3rd Year' },
    { value: '4th_year', label: '4th Year' },
    { value: '5th_year', label: '5th Year' },
  ];

  const courseOptions = [
    { value: 'BSIT', label: 'Bachelor of Science in Information Technology' },
    { value: 'BLIS', label: 'Bachelor of Library and Information Science' },
    { value: 'BSBA', label: 'Bachelor of Science in Business Administration' }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/your-api-endpoint') // Replace with your actual endpoint
      .then((res) => console.log("Data fetched:", res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOptions.map(option => option.value),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        yearlevel: [],
        course: [],
        sanction:''
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

              {/* Year Level Multi-select */}
              <div className="ANEform-form-group">
                <label className="ANEform-addeventformlabel" htmlFor="yearlevel">Year Level</label>
                <Select
                  isMulti
                  required
                  options={yearLevelOptions}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "yearlevel")}
                  value={yearLevelOptions.filter(option => formData.yearlevel.includes(option.value))}
                  className="ANEform-custom-multi-select"
                />
              </div>

              {/* Course Multi-select */}
              <div className="ANEform-form-group">
                <label className="ANEform-addeventformlabel" htmlFor="course">Course</label>
                <Select
                  isMulti
                  required
                  options={courseOptions}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "course")}
                  value={courseOptions.filter(option => formData.course.includes(option.value))}
                  className="ANEform-custom-multi-select"
                />
              </div>

              {/* Sacntion Time Added Field */}
              <div className="ANEform-form-group">
                <label className='ANEform-addeventformlabel' htmlFor="sanction">Sanction Value</label>
                <input 
                  type="number" 
                  id="sanction" 
                  name="sanction" 
                  value={formData.sanction}
                  onChange={handleInputChange}
                  required
                />
              </div>
              

              <div className="ANEform-form-group">
                <button type="submit" className='ANEform-submit-btnANE'>Submit Event</button>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddNewEventform;
