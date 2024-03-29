import React from "react";
import FeedbackItem from "./FeedbackItem.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext.jsx";
// import Spinner from "./shared/Spinner.jsx";
import Loading from "./shared/Loading.jsx";
import ErrorMessage from "./shared/ErrorMessage.jsx";

function FeedbackList() {
  const { feedback, isLoading, webError } = useContext(FeedbackContext);

  if (!isLoading && !webError && (feedback.length === 0 || !feedback)) {
    return (
      <>
        <br />
        <p>No feedback yet</p>
        <br />
        <p>Please input a feedback</p>
      </>
    );
  }
  if (webError) return <ErrorMessage message={webError} />;

  if (!isLoading && !webError) {
    return isLoading ? (
      <Loading />
    ) : (
      <div className='feedback-list'>
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={item.id} item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
}

export default FeedbackList;
