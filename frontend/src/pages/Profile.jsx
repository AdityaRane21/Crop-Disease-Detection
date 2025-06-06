import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // This would normally be an API call to fetch user profile
    // For demonstration, we'll use mock data
    const mockProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      role: 'Administrator',
      joinDate: '2022-03-15'
    };
    
    // Simulate API call delay
    setTimeout(() => {
      setProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        phone: mockProfile.phone
      });
      setLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would normally be an API call to update the profile
    setProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>User Profile</h1>
        <div className="nav-links">
          <Link to="/iot-dashboard">Dashboard</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-field">
              <span className="field-label">Name:</span>
              <span className="field-value">{profile.name}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Email:</span>
              <span className="field-value">{profile.email}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Phone:</span>
              <span className="field-value">{profile.phone}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Role:</span>
              <span className="field-value">{profile.role}</span>
            </div>
            
            <div className="profile-field">
              <span className="field-label">Join Date:</span>
              <span className="field-value">{profile.joinDate}</span>
            </div>
            
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-primary edit-btn"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;