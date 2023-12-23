import React from "react";
import FeedbackItem from "./FeedbackItem.jsx";

function FeedbackList({ feedback, handleDelete }) {
  if (feedback.length === 0 || !feedback) {
    return <p>No feedback yet</p>;
  }
  return (
    <div className='feedback-list'>
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default FeedbackList;
