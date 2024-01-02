import React, { useEffect } from "react";
import Card from "./shared/Card.jsx";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button.jsx";
import { useState } from "react";

import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext.jsx";

function FeedbackForm() {
  const [rating, setRating] = useState(10);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { addFeedback, feedbackEdit, updatedFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text);
      setBtnDisabled(false);
    }
  }, [feedbackEdit]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updatedFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
    }
    setText("");
  };

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text should be more than 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  return (
    <Card>
      <form onSubmit={handleSumbit}>
        <h4>How will you rating our service</h4>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            value={text}
            onChange={handleTextChange}
          />
          <Button version='secondary' isDisabled={btnDisabled} type='submit'>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
