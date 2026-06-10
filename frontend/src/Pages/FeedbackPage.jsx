import React from 'react'
import { useState } from 'react'


function FeedbackPage({ setCurrentPage }) {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmitFeedback() {
        setSubmitted(true);
    }

    return (
        <div className="widgetContainer">
            {submitted ? (
                <>
                    <h1>Submitted!</h1>
                    <button className="submit-button submit-button-red" onClick={() => setSubmitted(false)}>
                        Submit another report
                    </button>
                    <button className="submit-button" onClick={() => setCurrentPage("home")}>
                        Return to home page
                    </button>
                </>
            ) : (
                <div className="feedback-card">
                    <h2>Submit Your Feedback!</h2>
                    <textarea
                        className="feedback-textarea"
                        placeholder="Write your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button className="submit-button" onClick={handleSubmitFeedback}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default FeedbackPage;