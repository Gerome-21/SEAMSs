import React, { useEffect, useState } from 'react';
import './Adminpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
    const [adminData, setAdminData] = useState(null); // Holds logged-in admin details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const gotoCourseList = () => {
        navigate('/courselist');
      };


    useEffect(() => {
        // Fetch admin-specific data after login
        axios.get('http://localhost:8081/admin/profile') // Example endpoint for admin profile
            .then((res) => {
                setAdminData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching admin data:", err);
                setError("Failed to load admin details.");
                setLoading(false);
            });
    }, []);

    return (
      <div className="Adminpage-mainbox">
        {/* Sidebar Section */}
        <div className="Adminpage-sidebar">
          <div className="Adminpage-logo">
            <div className="Adminpage-seamslogo"></div>
            <h2 className="Adminpage-seams-txt">SEAMS</h2>
          </div>
  
          <div className='Adminpage-adminbox'>
            <div className='Adminpage-adminimage'></div>
                    <h2 className="Adminpage-adminNameH2">
                        {adminData ? adminData.name : "Admin"}
                    </h2>
                </div>
                <div className="Adminpage-menu">
            <button onClick={gotoCourseList}>COURSE</button>
            <button>EVENT</button>
            <button>SANCTION</button>
            <button>DATABASE</button>
          </div>
          <div className="Adminpage-exit">
            <div className="Adminpage-exitimg"></div>
            <button>EXIT</button>
          </div>
        </div>

            {/* Content Section */}
            <div className="Adminpage-leftcont-box">
                <div className="Adminpage-logoboxlcc">
                    <div className="Adminpage-lccBlogo"></div>
                </div>
                <div className="Adminpage-content">
                    <h2 className="Adminpage-adminnameH2">
                        Welcome, {adminData ? adminData.name : "Admin"}!
                    </h2>
                    {loading && <p>Loading your data...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && (
                        <div className="Adminpage-summary">
                            <h3>Today's Overview</h3>
                            <p>Total Events: {adminData?.eventCount || 0}</p>
                            <p>Total Sanctions Issued: {adminData?.sanctionCount || 0}</p>
                            <p>Active Users: {adminData?.userCount || 0}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Adminpage;
