import React from 'react';
import '../App.css';

function ContactPage({ setCurrentPage }) {
    const contacts = [
        {
            title: "PGPR Residential Life Office (RLO)",
            subtitle: "For Residential Programs, Residential Leaders, and Residents' Well-being",
            address: ["29 Prince George's Park", "Block 11, Level #01-15", "Singapore 118426"],
            hours: "Mon to Fri: 8.30am to 5.30pm",
            email: "pgpresidence@nus.edu.sg",
            emailHref: "mailto:pgpresidence@nus.edu.sg",
            hotline: "+65 6516 1610",
        },
        {
            title: "PGP Housing Services (HS)",
            subtitle: "For Housing (Check-in/out etc.), Infrastructure Maintenance, Cleanliness & Facilities",
            address: ["27 Prince George's Park", "Block 6, Level 2 Foyer", "Singapore 118425"],
            hours: "Mon to Fri: 8.30am to 5.30pm",
            email: "housing.pgp@nus.edu.sg",
            emailHref: "mailto:housing.pgp@nus.edu.sg",
            hotline: "+65 6601 7878",
        },
    ];

    return (
        <div className="widgetContainer contact-fade-in" style={{ padding: '20px 16px 50px' }}>
            <h1 className="titleHeader">Contact Us</h1>
            <p style={{
                textAlign: 'center',
                color: '#777',
                maxWidth: '520px',
                margin: '0 auto 30px',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                Reach out to the right office below for gym, housing, or residential matters.
            </p>

            <div className="contact-grid">
                {contacts.map((c, index) => (
                    <div
                        key={c.title}
                        className="contact-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <h3 className="contact-card-title">{c.title}</h3>
                        <p className="contact-card-subtitle">{c.subtitle}</p>

                        <div className="contact-row">
                            <span className="contact-label">Address</span>
                            <span className="contact-value">
                                {c.address.map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < c.address.length - 1 && <br />}
                                    </span>
                                ))}
                            </span>
                        </div>

                        <div className="contact-row">
                            <span className="contact-label">Hours</span>
                            <span className="contact-value">{c.hours}</span>
                        </div>

                        <div className="contact-row">
                            <span className="contact-label">Email</span>
                            <a href={c.emailHref} className="contact-link">{c.email}</a>
                        </div>

                        <div className="contact-row">
                            <span className="contact-label">Hotline</span>
                            <a href={`tel:${c.hotline.replace(/\s/g, '')}`} className="contact-link">{c.hotline}</a>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .contact-fade-in {
                    animation: contactFade 0.35s ease both;
                }
                @keyframes contactFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .contact-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .contact-card {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 14px;
                    padding: 26px;
                    width: 340px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    animation: contactCardIn 0.4s ease both;
                    text-align: left;
                }
                .contact-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07);
                }
                @keyframes contactCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .contact-card-title {
                    color: rgb(181, 68, 68);
                    font-size: 17px;
                    font-weight: 700;
                    margin: 0 0 6px;
                }
                .contact-card-subtitle {
                    color: #999;
                    font-size: 12.5px;
                    line-height: 1.5;
                    margin: 0 0 18px;
                }
                .contact-row {
                    display: flex;
                    gap: 14px;
                    margin-bottom: 12px;
                    font-size: 14px;
                }
                .contact-row:last-child {
                    margin-bottom: 0;
                }
                .contact-label {
                    flex: 0 0 65px;
                    color: rgb(60, 153, 128);
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    padding-top: 1px;
                }
                .contact-value {
                    color: #444;
                    line-height: 1.5;
                }
                .contact-link {
                    color: #444;
                    text-decoration: none;
                    border-bottom: 1px solid transparent;
                    transition: color 0.2s ease, border-color 0.2s ease;
                }
                .contact-link:hover {
                    color: rgb(60, 153, 128);
                    border-color: rgb(60, 153, 128);
                }
            `}</style>
        </div>
    );
}

export default ContactPage;