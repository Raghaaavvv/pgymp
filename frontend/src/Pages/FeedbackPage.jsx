import React from 'react'
import { useState } from 'react'
import '../App.css';

const CATEGORIES = [
    { id: 'equipment', label: 'Equipment', icon: '🏋️' },
    { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { id: 'crowding', label: 'Crowding / Capacity', icon: '👥' },
    { id: 'facilities', label: 'Facilities (AC, lighting, etc.)', icon: '💡' },
    { id: 'staff', label: 'Staff / Security', icon: '🛡️' },
    { id: 'app', label: 'App / Scanner Issue', icon: '📱' },
    { id: 'suggestion', label: 'Suggestion', icon: '💡' },
    { id: 'other', label: 'Other', icon: '📝' },
];

const RATING_LABELS = {
    1: 'Very poor',
    2: 'Poor',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent',
};

function FeedbackPage({ setCurrentPage }) {
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const canSubmit = category && rating > 0 && feedback.trim().length > 0;

    function handleSubmitFeedback() {
        if (!canSubmit) return;
        setSubmitted(true);
    }

    function resetForm() {
        setSubmitted(false);
        setCategory(null);
        setRating(0);
        setFeedback("");
    }

    const displayRating = hoverRating || rating;

    return (
        <div className="widgetContainer feedback-fade-in" style={{ padding: '20px 16px 50px' }}>
            <h1 className="titleHeader">Feedback</h1>
            <p style={{
                textAlign: 'center',
                color: '#777',
                maxWidth: '480px',
                margin: '0 auto 30px',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                Spotted something broken, or have an idea to improve PGymP? Let us know below.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {submitted ? (
                    <div className="feedback-card success-pop">
                        <div className="success-check">✓</div>
                        <h2 className="feedback-card-title" style={{ textAlign: 'center', marginTop: '14px' }}>Submitted!</h2>
                        <p className="feedback-card-subtitle" style={{ textAlign: 'center' }}>
                            Thanks for helping us improve the gym experience.
                        </p>
                        <button
                            className="submit-button submit-button-outline"
                            onClick={resetForm}
                        >
                            Submit another report
                        </button>
                        <button
                            className="submit-button"
                            onClick={() => setCurrentPage("home")}
                        >
                            Return to home page
                        </button>
                    </div>
                ) : (
                    <div className="feedback-card">
                        <h3 className="feedback-card-title">1. What's this about?</h3>
                        <div className="category-grid">
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    className={`category-chip ${category === c.id ? 'category-chip-active' : ''}`}
                                    onClick={() => setCategory(c.id)}
                                >
                                    <span className="category-chip-icon">{c.icon}</span>
                                    {c.label}
                                </button>
                            ))}
                        </div>

                        <h3 className="feedback-card-title" style={{ marginTop: '26px' }}>2. Rate your experience</h3>
                        <div className="star-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="star-btn"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                >
                                    <span className={displayRating >= star ? 'star-filled' : 'star-empty'}>★</span>
                                </button>
                            ))}
                            <span className="star-label">
                                {displayRating > 0 ? RATING_LABELS[displayRating] : ''}
                            </span>
                        </div>

                        <h3 className="feedback-card-title" style={{ marginTop: '26px' }}>3. Tell us more</h3>
                        <textarea
                            className="feedback-textarea"
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={5}
                        />

                        <button
                            className="submit-button"
                            onClick={handleSubmitFeedback}
                            disabled={!canSubmit}
                            style={{
                                opacity: canSubmit ? 1 : 0.5,
                                cursor: canSubmit ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Submit Feedback
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .feedback-fade-in {
                    animation: feedbackFade 0.35s ease both;
                }
                @keyframes feedbackFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .feedback-card {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 14px;
                    padding: 28px;
                    width: 100%;
                    max-width: 440px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    animation: feedbackCardIn 0.4s ease both;
                    text-align: left;
                }
                @keyframes feedbackCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .feedback-card-title {
                    color: rgb(181, 68, 68);
                    font-size: 15px;
                    font-weight: 700;
                    margin: 0 0 12px;
                }
                .feedback-card-subtitle {
                    color: #999;
                    font-size: 13px;
                    line-height: 1.5;
                    margin: 0 0 20px;
                }

                .category-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .category-chip {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 9px 14px;
                    border-radius: 999px;
                    border: 2px solid #e5e5e5;
                    background: #fff;
                    color: #555;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
                }
                .category-chip:hover {
                    transform: translateY(-1px);
                    border-color: rgb(60, 153, 128);
                }
                .category-chip-active {
                    border-color: rgb(60, 153, 128);
                    background: rgba(60, 153, 128, 0.1);
                    color: rgb(60, 153, 128);
                }
                .category-chip-icon {
                    font-size: 14px;
                    line-height: 1;
                }

                .star-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .star-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    line-height: 1;
                }
                .star-filled, .star-empty {
                    font-size: 30px;
                    transition: color 0.15s ease, transform 0.15s ease;
                    display: inline-block;
                }
                .star-filled {
                    color: rgb(181, 68, 68);
                }
                .star-empty {
                    color: #e0e0e0;
                }
                .star-btn:hover .star-filled,
                .star-btn:hover .star-empty {
                    transform: scale(1.12);
                }
                .star-label {
                    margin-left: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #999;
                    min-width: 70px;
                }

                .feedback-textarea {
                    width: 100%;
                    box-sizing: border-box;
                    border: 2px solid #e5e5e5;
                    border-radius: 10px;
                    padding: 12px;
                    font-size: 14px;
                    font-family: inherit;
                    resize: vertical;
                    min-height: 110px;
                    margin: 0 0 18px;
                    outline: none;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .feedback-textarea:focus {
                    border-color: rgb(60, 153, 128);
                    box-shadow: 0 0 0 3px rgba(60, 153, 128, 0.15);
                }
                .submit-button {
                    width: 100%;
                    padding: 12px;
                    background: rgb(181, 68, 68);
                    color: #ffffff;
                    border: none;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: filter 0.2s ease, transform 0.15s ease;
                    margin-top: 10px;
                }
                .submit-button:first-of-type {
                    margin-top: 0;
                }
                .submit-button:hover:not(:disabled) {
                    filter: brightness(0.92);
                }
                .submit-button-outline {
                    background: transparent;
                    border: 2px solid rgb(60, 153, 128);
                    color: rgb(60, 153, 128);
                }
                .submit-button-outline:hover {
                    background: rgba(60, 153, 128, 0.08);
                    filter: none;
                }
                .success-pop {
                    animation: successPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    text-align: center;
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