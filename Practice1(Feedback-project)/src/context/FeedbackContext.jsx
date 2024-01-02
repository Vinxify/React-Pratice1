import { createContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import FeedbackData from "../components/data/FeedbackData.jsx";
import API_URL from "../components/config/API_URL.js";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(FeedbackData);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // use to handle

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`${API_URL}?_sort=id&_order=desc`);
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false);
    } catch (err) {}
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      const data = await response.json();

      setFeedback([data, ...feedback]);
    } catch (error) {}
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure that you want to delete")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // updated feedback

  const updatedFeedback = async (id, updatedItem) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updatedFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
