import React from 'react'
import { useState } from 'react'


function FeedbackPage( {setCurrentPage} ) {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const styles = {
        widgetContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        titleHeader: {
            textAlign: 'center',
            color: 'rgb(181, 68, 68)',
            fontSize: '50px',
            padding: '10px',
            marginBottom: '10px'
            },
        feedbackCard: {
            width: '800px',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            },
        submitButton: {
            width: '70px',
            color: 'white',
            backgroundColor: 'rgb(60, 153, 128)',
            borderRadius: '10px'

            }

    }


    function handleSubmitFeedback() {
        console.log("Feedback submitted:", feedback);
        setSubmitted(true);
        }
    if (submitted) {
        return (
            <div style={styles.widgetContainer}>
                <h1> Submitted! </h1>
                <button
                    onClick={() => setSubmitted(false)}
                    style={{ height: '30px', borderRadius: '12px', backgroundColor: 'rgb(181, 68, 68)' }}
                    >
                    Submit another report
                </button>
                <button
                    onClick={() => setCurrentPage("home")}
                    style={{ height: '30px', borderRadius: '12px', backgroundColor: 'rgb(60, 153, 128)' }}
                    >
                    Return to home page
                </button>
            </div>
        );
    }
    if (!submitted) {
        return (
            <div style={styles.widgetContainer}>
                <h2>Submit Your Feedback!</h2>
                    <div style={styles.feedbackCard}>
                        <textarea
                            style= {{ width: '100%', height: '200px'}}
                            value={feedback} onChange={(e) => setFeedback(e.target.value)}>
                        </textarea>
                        <button onClick={handleSubmitFeedback} style={styles.submitButton}>
                            Submit
                        </button>
                    </div>
            </div>

        );
    }


}

export default FeedbackPage;