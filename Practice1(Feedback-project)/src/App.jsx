import "./App.css";
import { v4 as uuidv4 } from "uuid";
import FeedbackList from "./components/FeedbackList.jsx";
import Header from "./components/Header";
import FeedbackData from "./components/data/FeedbackData.jsx";
import FeedbackStats from "./components/FeedbackStats.jsx";
import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm.jsx";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure that you want to delete")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAddFeedback={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
