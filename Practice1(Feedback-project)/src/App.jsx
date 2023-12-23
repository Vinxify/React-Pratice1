import "./App.css";
import FeedbackList from "./components/FeedbackList.jsx";
import Header from "./components/Header";
import FeedbackData from "./components/data/FeedbackData.jsx";
import FeedbackStats from "./components/FeedbackStats.jsx";
import { useState } from "react";
import RatingSelect from "./components/RatingSelect.jsx";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure that you want to delete")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  return (
    <>
      <Header />
      <div className='container'>
        <RatingSelect />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
