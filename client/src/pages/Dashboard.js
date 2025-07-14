import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div >
      <div className="dashboard">
        <h1>Dashboard Overview</h1>
        <p>Overview of document translation activities and statistics</p>
        <hr />
        <div className="cards-container">
          <div className="cardd">
            <div>Total Documents<br /><strong>125</strong></div>
            <img src="/icons/files.png" alt="Total Documents" />
            
          </div>
          <div className="cardd">
            
            <div>Approved<br /><strong>80</strong></div>
            <img src="/icons/approved.png" alt="Approved" />
          </div>
          <div className="cardd">
            
            <div>In Review<br /><strong>30</strong></div>
            <img src="/icons/review.png" alt="In Review" />
          </div>
          <div className="cardd">
            
            <div>Published<br /><strong>15</strong></div>
            <img src="/icons/published.png" alt="Published" />
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-box">[Status Chart]</div>
          <div className="chart-box">[Category Chart]</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
