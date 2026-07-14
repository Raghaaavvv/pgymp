import React from 'react'
import { useState } from 'react'


function FeedbackPage({ setCurrentPage }) {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmitFeedback() {
        setSubmitted(true);
    }

    return (
        <div className="widgetContainer feedback-fade-in">
            {submitted ? (
                <div className="feedback-card success-pop">
                    <div className="success-check">✓</div>
                    <h1 style={{ margin: '10px 0 20px' }}>Submitted!</h1>
                    <button className="submit-button submit-button-red" onClick={() => { setSubmitted(false); setFeedback(""); }}>
                        Submit another report
                    </button>
                    <button className="submit-button" onClick={() => setCurrentPage("home")}>
                        Return to home page
                    </button>
                </div>
            ) : (
                <div className="feedback-card">
                    <h2>Submit Your Feedback!</h2>
                    <textarea
                        className="feedback-textarea"
                        placeholder="Write your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button
                        className="submit-button"
                        onClick={handleSubmitFeedback}
                        disabled={!feedback.trim()}
                        style={{ opacity: feedback.trim() ? 1 : 0.5, cursor: feedback.trim() ? 'pointer' : 'not-allowed' }}
                    >
                        Submit
                    </button>
                </div>
            )}

            <style>{`
                .feedback-fade-in {
                    animation: feedbackFade 0.35s ease both;
                }
                @keyframes feedbackFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .success-pop {
                    animation: successPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }
                @keyframes successPop {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .success-check {
                    width: 56px;
                    height: 56px;
                    margin: 0 auto;
                    border-radius: 50%;
                    background: rgb(60, 153, 128);
                    color: white;
                    font-size: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    animation-delay: 0.1s;
                }
                @keyframes checkPop {
                    from { opacity: 0; transform: scale(0); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

export default FeedbackPage;