import React, { useState, useEffect } from 'react';
import { userLoginContext } from './userLoginContext';

function UserLoginStore({ children }) {
  // State to manage login and user information
  const [isLogin, setIsLogin] = useState(() => {
    const savedLoginState = localStorage.getItem('isLogin');
    return savedLoginState === 'true'; // Convert string to boolean
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null; // Parse stored user data if it exists
  });

  const [err, setErr] = useState('');
  const [username, setUsername] = useState(() => (currentUser ? currentUser.username : ''));
  const [userId, setUserId] = useState(() => (currentUser ? currentUser._id : ''));
  
  // State to manage saved files
  const [savedFiles, setSavedFiles] = useState([]);
  const [likedFiles, setLikedFiles] = useState([]);

  // Update localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem('isLogin', isLogin);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [isLogin, currentUser]);

  // Fetch saved files when user logs in
  useEffect(() => {
    if (currentUser && currentUser.username) {
      fetchSavedFiles(currentUser.username);
      fetchLikedFiles(currentUser.username);
    }
  }, [currentUser]);

  // Function to handle user login
  async function loginUser(userCred) {
    try {
      let res = await fetch('http://localhost:4000/user-api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userCred),
      });
      let data = await res.json();
      if (data.message === 'login success') {
        setCurrentUser(data.user);
        setIsLogin(true);
        setErr('');
        setUsername(data.user.username);
        setUserId(data.user._id);
        sessionStorage.setItem('token', data.token); // Store token in session storage
      } else {
        setErr(data.message);
        setCurrentUser(null);
        setUsername('');
        setUserId('');
        setIsLogin(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  // Function to handle user logout
  function logoutUser() {
    setCurrentUser(null);
    setUsername('');
    setUserId('');
    setIsLogin(false);
    setSavedFiles([]); // Clear saved files on logout
    setLikedFiles([]);
    sessionStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentUser');
  }

  // Function to fetch saved files for the logged-in user
  const fetchSavedFiles = async (username) => {
    try {
      const res = await fetch(`http://localhost:4000/user-api/user-saved/${username}`);
      const data = await res.json();
      if (res.ok) {
        setSavedFiles(data.payload.saved);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error fetching saved files:', err);
    }
  };

  // Function to add a file to saved
  const addToSaved = async (file) => {
    try {
      const res = await fetch(`http://localhost:4000/user-api/add-to-saved/${currentUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
      });
      const result = await res.json();
      if (result.payload.modifiedCount === 1) {
        setSavedFiles((prev) => [...prev, file]);
      }
    } catch (error) {
      console.error('Error adding to saved:', error);
    }
  };

  // Function to remove a file from saved
  const removeFromSaved = async (file) => {
    try {
      const res = await fetch(`http://localhost:4000/user-api/remove-from-saved/${currentUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
      });
      const result = await res.json();
      if (result.payload.modifiedCount === 1) {
        setSavedFiles((prev) => prev.filter((savedFile) => savedFile.driveLink !== file.driveLink));
      }
    } catch (error) {
      console.error('Error removing from saved:', error);
    }
  };

    // Function to fetch liked files for the logged-in user
    const fetchLikedFiles = async (username) => {
      try {
        const res = await fetch(`http://localhost:4000/user-api/user-liked/${username}`);
        const data = await res.json();
        if (res.ok) {
          setLikedFiles(data.payload.liked);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching saved files:', err);
      }
    };
  
    // Function to add a file to liked
    const addToLiked = async (file) => {
      try {
        const res = await fetch(`http://localhost:4000/user-api/add-to-liked/${currentUser.username}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(file),
        });
        const result = await res.json();
        if (result.payload.modifiedCount === 1) {
          setLikedFiles((prev) => [...prev, file]);
        }
      } catch (error) {
        console.error('Error adding to Liked:', error);
      }
    };
  
    // Function to remove a file from liked
    const removeFromLiked = async (file) => {
      try {
        const res = await fetch(`http://localhost:4000/user-api/remove-from-liked/${currentUser.username}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(file),
        });
        const result = await res.json();
        if (result.payload.modifiedCount === 1) {
          setSavedFiles((prev) => prev.filter((likedFile) => likedFile.driveLink !== file.driveLink));
        }
      } catch (error) {
        console.error('Error removing from liked:', error);
      }
    };
  return (
    <userLoginContext.Provider
      value={{
        isLogin,
        loginUser,
        logoutUser,
        currentUser,
        username,
        userId,
        setCurrentUser,
        savedFiles,
        addToSaved,
        removeFromSaved,
        likedFiles,
        addToLiked,
        removeFromLiked
      }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
