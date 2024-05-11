import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = 'https://wahy-social-app-api.onrender.com';

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async (page = 1) => {
    try {
      const response = await fetch(`${apiUrl}/api/posts?page=${page}`, {
        headers: {
          Authorization: "",
        },
      });
      const data = await response.json();
      // Append new posts to existing ones
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await fetch(`${apiUrl}/users/me/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error if needed
    }
  };

  const signupUser = async (userData) => {
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setUser(data.user);
     
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error if needed
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      setUser(data.user);
      
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error if needed
    }
  };

  const logoutUser = () => {
    
    setUser(null);
  };

  const value = {
    user,
    posts,
    comments,
    likes,
    language,
    updateUser,
    signupUser,
    loginUser,
    logoutUser,
    getAllPosts,
    setLanguage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

