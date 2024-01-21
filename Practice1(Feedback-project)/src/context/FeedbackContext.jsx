import { createContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import FeedbackData from "../components/data/FeedbackData.jsx";
import API_URL from "../components/config/API_URL.js";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(FeedbackData);
  const [webError, setWebError] = useState("");

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // use to handle

  useEffect(() => {
    fetchFeedback();
    setWebError("");
  }, []);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}?_sort=id&_order=desc`);
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      console.log(data);
      setFeedback(data);
    } catch (err) {
      console.error(`${err.message}`);
      setWebError(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      console.log(response);
      if (!response || !response.ok) throw new Error("something went wrong");
      const data = await response.json();

      setFeedback([data, ...feedback]);
    } catch (err) {
      setWebError(`${err.message}`);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      if (window.confirm("Are you sure that you want to delete")) {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        console.log(response);
        if (!response && !response.ok) throw new Error("Error from deleting");

        setFeedback(feedback.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(`${err.message}`);
      setWebError(`${err.message}`);
    }
  };

  // updated feedback

  const updatedFeedback = async (id, updatedItem) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response || !response.ok) throw new Error("something went wrong");

      const data = await response.json();

      setFeedback(
        feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (err) {
      console.error(`${err}`);
      setWebError(`${err}`);
    }
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
        webError,
        setWebError,
        setFeedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
