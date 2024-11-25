import React, { useEffect, useState } from 'react';
import './StudentEventform.css';
import axios from 'axios';

const StudentEventform = () => {
    const [formData, setFormData] = useState({
        studentId: "",
        event: "",
        proof: null, // Store file as null initially
        reason: ""
    });
    const [message, setMessage] = useState(""); // To show feedback to user

    useEffect(() => {
        axios
          .get('') // Replace with your actual endpoint
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "proof") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ask the user to confirm submission
        const isConfirmed = window.confirm("Confirm Submit?");
        if (!isConfirmed) return;

        const data = new FormData(); // Use FormData for file upload
        data.append("studentId", formData.studentId);
        data.append("event", formData.event);
        data.append("proof", formData.proof);
        data.append("reason", formData.reason);

        try {
            const response = await axios.post('', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage("Form submitted successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className='stndteventfrm-box'>
            <div className='stndteventfrm-blue-box'>
                <h2 className='stndteventfrm-welcomeH2'>Welcome Student</h2>
                <h4 className='stndteventfrm-studentLogin-name'>Gerome Sinoy</h4>
                <h4 className='stndteventfrm-helloH4'>
                    School of Business and Information Technology
                </h4>
                <div className='stndteventfrm-optionselect-btn'>
                    {/* <button className='stndteventfrm-profile-btn' type="button" aria-label="Profile Button">Profile</button> */}
                    <button className='stndteventfrm-event-btn' type="button" aria-label="Event Button">Event</button>
                    <button className='stndteventfrm-sanction-btn' type="button" aria-label="Sanction Button">Sanction</button>
                </div>
                <button className='stndteventfrm-exit-btn' type="button" aria-label="Exit Button">Exit</button>
            </div>

            <div className='stndteventfrm-white-box'>
                <div className='stndteventfrm-txtandlogo-box'>
                    <h2 className='stndteventfrm-stdnth2'>Event Form</h2>
                    <div className='stndteventfrm-lccblogoP2'></div>
                </div>
                <form className="stndteventfrm-simple-form" onSubmit={handleSubmit}>
                    <div className="stndteventfrm-form-row">
                        <label htmlFor="event">Event</label>
                        <select
                            id="event"
                            name="event"
                            value={formData.event}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Event
                            </option>
                            <option value="BSIT">Public Economics</option>
                            <option value="BLIS">BSIT TECH TALK</option>
                        </select>
                    </div>

                    {/* <div className="stndteventfrm-form-row">
                        <label htmlFor="studentId">Student I.D</label>
                        <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                        />
                    </div> */}

                    <div className="stndteventfrm-form-row">
                        <label htmlFor="proof">Proof</label>
                        <input
                            type="file"
                            id="proof"
                            name="proof"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="stndteventfrm-proof-input"
                        />
                        <h4 className='stndteventfrm-noteh4'>*Take a clear photo with your school<br/>
                        ID visible during the event.</h4>
                    </div>

                    <div className="stndteventfrm-form-row">
                        <label htmlFor="reason">Reason</label>
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                        />
                        <h4 className='stndteventfrm-noteh4'>**If cannot attend, please state the reason<br/>
                        and attach proof, otherwise write 'n/a'.</h4>
                    </div>

                    <button className='stndteventfrm-submit-btn' type="submit">Submit</button>
                </form>
                
            </div>
        </div>
    );
}

export default StudentEventform;
