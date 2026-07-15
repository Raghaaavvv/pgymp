import React, { useState } from 'react';
import '../App.css';

const OPEN_HOUR = 7;
const CLOSE_HOUR = 23;
const MAX_CAPACITY = 30;

// Hardcoded data for now - format matches what backend will eventually return.
// Hours represent the start of a 2-hour block, covering 7am to 11pm.
const heatmapData = [
    { day: "Mon", hour: 7,  count: 2  }, { day: "Mon", hour: 9,  count: 5  }, { day: "Mon", hour: 11, count: 3  }, { day: "Mon", hour: 13, count: 8  }, { day: "Mon", hour: 15, count: 6  }, { day: "Mon", hour: 17, count: 12 }, { day: "Mon", hour: 19, count: 22 }, { day: "Mon", hour: 21, count: 15 },
    { day: "Tue", hour: 7,  count: 1  }, { day: "Tue", hour: 9,  count: 4  }, { day: "Tue", hour: 11, count: 2  }, { day: "Tue", hour: 13, count: 7  }, { day: "Tue", hour: 15, count: 5  }, { day: "Tue", hour: 17, count: 10 }, { day: "Tue", hour: 19, count: 19 }, { day: "Tue", hour: 21, count: 14 },
    { day: "Wed", hour: 7,  count: 3  }, { day: "Wed", hour: 9,  count: 6  }, { day: "Wed", hour: 11, count: 4  }, { day: "Wed", hour: 13, count: 9  }, { day: "Wed", hour: 15, count: 7  }, { day: "Wed", hour: 17, count: 13 }, { day: "Wed", hour: 19, count: 25 }, { day: "Wed", hour: 21, count: 17 },
    { day: "Thu", hour: 7,  count: 2  }, { day: "Thu", hour: 9,  count: 5  }, { day: "Thu", hour: 11, count: 3  }, { day: "Thu", hour: 13, count: 8  }, { day: "Thu", hour: 15, count: 6  }, { day: "Thu", hour: 17, count: 14 }, { day: "Thu", hour: 19, count: 24 }, { day: "Thu", hour: 21, count: 16 },
    { day: "Fri", hour: 7,  count: 4  }, { day: "Fri", hour: 9,  count: 7  }, { day: "Fri", hour: 11, count: 5  }, { day: "Fri", hour: 13, count: 10 }, { day: "Fri", hour: 15, count: 8  }, { day: "Fri", hour: 17, count: 11 }, { day: "Fri", hour: 19, count: 18 }, { day: "Fri", hour: 21, count: 20 },
    { day: "Sat", hour: 7,  count: 1  }, { day: "Sat", hour: 9,  count: 3  }, { day: "Sat", hour: 11, count: 9  }, { day: "Sat", hour: 13, count: 15 }, { day: "Sat", hour: 15, count: 13 }, { day: "Sat", hour: 17, count: 10 }, { day: "Sat", hour: 19, count: 12 }, { day: "Sat", hour: 21, count: 8  },
    { day: "Sun", hour: 7,  count: 1  }, { day: "Sun", hour: 9,  count: 2  }, { day: "Sun", hour: 11, count: 7  }, { day: "Sun", hour: 13, count: 12 }, { day: "Sun", hour: 15, count: 11 }, { day: "Sun", hour: 17, count: 9  }, { day: "Sun", hour: 19, count: 10 }, { day: "Sun", hour: 21, count: 6  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = [];
for (let h = OPEN_HOUR; h < CLOSE_HOUR; h += 2) hours.push(h);

function formatHour(hour) {
    const suffix = hour >= 12 ? 'pm' : 'am';
    let display = hour % 12;
    if (display === 0) display = 12;
    return `${display}${suffix}`;
}

function formatRange(hour) {
    const end = Math.min(hour + 2, CLOSE_HOUR);
    return `${formatHour(hour)} to ${formatHour(end)}`;
}

function getPercentFull(count) {
    return Math.min(100, Math.round((count / MAX_CAPACITY) * 100));
}

function getColor(percent) {
    if (percent < 20) return '#FDECEA';
    if (percent < 40) return '#F5B7B1';
    if (percent < 60) return '#EC7063';
    if (percent < 80) return '#E74C3C';
    return '#C0392B';
}

function getBusiestSlot() {
    return heatmapData.reduce((max, cell) => cell.count > max.count ? cell : max, heatmapData[0]);
}

function getQuietestSlot() {
    return heatmapData.reduce((min, cell) => cell.count < min.count ? cell : min, heatmapData[0]);
}

function HeatmapPage({ setCurrentPage }) {
    const busiest = getBusiestSlot();
    const quietest = getQuietestSlot();
    const [selectedCell, setSelectedCell] = useState({
        day: busiest.day,
        hour: busiest.hour,
        count: busiest.count,
    });

    const getCell = (day, hour) => {
        return heatmapData.find(d => d.day === day && d.hour === hour) || { count: 0 };
    };

    return (
        <div className="widgetContainer heatmap-fade-in" style={{ padding: '20px 12px 50px' }}>
            <h1 className="titleHeader">Peak Hours Heatmap</h1>
            <p style={{
                textAlign: 'center',
                color: '#777',
                maxWidth: '520px',
                margin: '0 auto 30px',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                See how full the gym typically gets by day and time, based on historical check-ins.
            </p>

            <div className="heatmap-summary-grid">
                <div className="heatmap-summary-card" style={{ animationDelay: '0s' }}>
                    <span className="heatmap-summary-label">Busiest</span>
                    <span className="heatmap-summary-value">{busiest.day} {formatRange(busiest.hour)}</span>
                    <span className="heatmap-summary-sub">{getPercentFull(busiest.count)}% full on average</span>
                </div>
                <div className="heatmap-summary-card" style={{ animationDelay: '0.1s' }}>
                    <span className="heatmap-summary-label">Quietest</span>
                    <span className="heatmap-summary-value">{quietest.day} {formatRange(quietest.hour)}</span>
                    <span className="heatmap-summary-sub">{getPercentFull(quietest.count)}% full on average</span>
                </div>
            </div>

            <div className="heatmap-card">
                <div className="heatmap-detail-bar">
                    <span className="heatmap-detail-day">{selectedCell.day} &middot; {formatRange(selectedCell.hour)}</span>
                    <span className="heatmap-detail-percent">{getPercentFull(selectedCell.count)}% full</span>
                </div>

                <div className="heatmap-scroll">
                    <div
                        className="heatmap-grid"
                        style={{ gridTemplateColumns: `52px repeat(${hours.length}, 1fr)` }}
                    >
                        <div></div>
                        {hours.map(hour => (
                            <div key={hour} className="heatmap-hour-label">{formatHour(hour)}</div>
                        ))}

                        {days.map(day => (
                            <React.Fragment key={day}>
                                <div className="heatmap-day-label">{day}</div>
                                {hours.map(hour => {
                                    const cell = getCell(day, hour);
                                    const percent = getPercentFull(cell.count);
                                    const isSelected = selectedCell.day === day && selectedCell.hour === hour;
                                    return (
                                        <button
                                            key={`${day}-${hour}`}
                                            type="button"
                                            className={`heatmap-cell${isSelected ? ' heatmap-cell-selected' : ''}`}
                                            style={{ backgroundColor: getColor(percent) }}
                                            onMouseEnter={() => setSelectedCell({ day, hour, count: cell.count })}
                                            onFocus={() => setSelectedCell({ day, hour, count: cell.count })}
                                            aria-label={`${day} ${formatRange(hour)}: ${percent}% full`}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="heatmap-legend">
                    <span>Quiet</span>
                    <span className="heatmap-legend-swatch" style={{ background: '#FDECEA' }}></span>
                    <span className="heatmap-legend-swatch" style={{ background: '#F5B7B1' }}></span>
                    <span className="heatmap-legend-swatch" style={{ background: '#EC7063' }}></span>
                    <span className="heatmap-legend-swatch" style={{ background: '#E74C3C' }}></span>
                    <span className="heatmap-legend-swatch" style={{ background: '#C0392B' }}></span>
                    <span>Busy</span>
                </div>
            </div>

            <style>{`
                .heatmap-fade-in {
                    animation: heatmapFade 0.35s ease both;
                }
                @keyframes heatmapFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .heatmap-summary-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                    max-width: 900px;
                    margin: 0 auto 24px;
                }
                .heatmap-summary-card {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 14px;
                    padding: 20px 26px;
                    width: 220px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    animation: heatmapCardIn 0.4s ease both;
                    text-align: center;
                }
                .heatmap-summary-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07);
                }
                @keyframes heatmapCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .heatmap-summary-label {
                    display: block;
                    color: rgb(60, 153, 128);
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    margin-bottom: 8px;
                }
                .heatmap-summary-value {
                    display: block;
                    color: rgb(181, 68, 68);
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .heatmap-summary-sub {
                    display: block;
                    color: #999;
                    font-size: 12.5px;
                }
                .heatmap-card {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 14px;
                    padding: 26px;
                    max-width: 720px;
                    margin: 0 auto;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    animation: heatmapCardIn 0.4s ease both;
                    animation-delay: 0.15s;
                }
                .heatmap-detail-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #FAFAFA;
                    border: 1px solid #f0f0f0;
                    border-radius: 10px;
                    padding: 12px 18px;
                    margin-bottom: 20px;
                }
                .heatmap-detail-day {
                    font-size: 14px;
                    font-weight: 700;
                    color: #333;
                }
                .heatmap-detail-percent {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(181, 68, 68);
                }
                .heatmap-scroll {
                    overflow-x: auto;
                    margin: 0 -8px;
                    padding: 0 8px;
                    -webkit-overflow-scrolling: touch;
                }
                .heatmap-grid {
                    display: grid;
                    gap: 4px;
                    min-width: 420px;
                }
                .heatmap-hour-label {
                    font-size: 10.5px;
                    color: #999;
                    text-align: center;
                    padding-bottom: 6px;
                    font-weight: 600;
                }
                .heatmap-day-label {
                    font-size: 12px;
                    color: #444;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                }
                .heatmap-cell {
                    aspect-ratio: 1;
                    border-radius: 6px;
                    cursor: pointer;
                    border: 2px solid transparent;
                    padding: 0;
                    display: block;
                    width: 100%;
                    transition: border-color 0.15s ease, filter 0.15s ease;
                }
                .heatmap-cell:hover,
                .heatmap-cell:focus-visible {
                    filter: brightness(0.94);
                    outline: none;
                }
                .heatmap-cell-selected {
                    border-color: rgb(60, 153, 128);
                }
                .heatmap-legend {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999;
                }
                .heatmap-legend-swatch {
                    width: 16px;
                    height: 16px;
                    border-radius: 3px;
                    flex-shrink: 0;
                }
                @media (max-width: 600px) {
                    .heatmap-card {
                        padding: 16px 10px;
                        border-radius: 12px;
                    }
                    .heatmap-summary-card {
                        width: 100%;
                        max-width: 260px;
                        padding: 16px 20px;
                    }
                    .heatmap-detail-bar {
                        padding: 10px 14px;
                        margin-bottom: 14px;
                    }
                    .heatmap-detail-day,
                    .heatmap-detail-percent {
                        font-size: 12.5px;
                    }
                    .heatmap-grid {
                        min-width: 380px;
                        gap: 3px;
                    }
                    .heatmap-hour-label {
                        font-size: 9.5px;
                    }
                    .heatmap-day-label {
                        font-size: 11px;
                    }
                }
            `}</style>
        </div>
    );
}

export default HeatmapPage;