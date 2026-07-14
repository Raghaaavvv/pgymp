import React from 'react';
import '../App.css';

function AboutPage({ setCurrentPage }) {
    const facts = [
        {
            label: 'Location',
            value: "Prince George's Park Residences (PGPR), near the minimart.",
        },
        {
            label: 'Operating Hours',
            value: 'Daily, 7:00 AM to 11:00 PM.',
        },
        {
            label: 'Equipment',
            value: 'Basic free weights (dumbbells up to 27.5kg), one power rack, two barbells, a leg press, and a limited selection of cardio machines.',
        },
    ];

    return (
        <div className="widgetContainer about-fade-in" style={{ padding: '20px 16px 50px' }}>
            <h1 className="titleHeader">About PGymP</h1>
            <p style={{
                textAlign: 'center',
                color: '#777',
                maxWidth: '520px',
                margin: '0 auto 30px',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                PGymP is the residential gym for Prince George's Park Residences, built to help
                residents track live capacity and equipment availability before they head down.
            </p>

            <div className="about-grid">
                {facts.map((fact, index) => (
                    <div
                        key={fact.label}
                        className="about-card"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <h3 className="about-card-label">{fact.label}</h3>
                        <p className="about-card-value">{fact.value}</p>
                    </div>
                ))}
            </div>

            <style>{`
                .about-fade-in {
                    animation: aboutFade 0.35s ease both;
                }
                @keyframes aboutFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .about-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .about-card {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 14px;
                    padding: 24px;
                    width: 260px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    animation: aboutCardIn 0.4s ease both;
                }
                .about-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07);
                }
                @keyframes aboutCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .about-card-label {
                    color: rgb(181, 68, 68);
                    font-size: 15px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    margin: 0 0 10px;
                }
                .about-card-value {
                    color: #444;
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 0;
                }
            `}</style>
        </div>
    );
}

export default AboutPage;