import React, { useState } from 'react';
import '../App.css';

const MUSCLE_DATA = {
    chest: {
        name: 'Chest',
        exercises: ['Barbell bench press', 'Dumbbell press', 'Dumbbell flyes'],
        equipment: ['Barbells', 'Dumbbells', 'Benches'],
    },
    shoulders: {
        name: 'Shoulders',
        exercises: ['Overhead press', 'Lateral raises', 'Front raises'],
        equipment: ['Barbells', 'Dumbbells'],
    },
    biceps: {
        name: 'Biceps',
        exercises: ['Barbell curls', 'Dumbbell curls', 'Hammer curls'],
        equipment: ['Barbells', 'Dumbbells'],
    },
    forearms: {
        name: 'Forearms',
        exercises: ['Wrist curls', 'Farmer carries', 'Reverse curls'],
        equipment: ['Dumbbells', 'Barbells'],
    },
    abs: {
        name: 'Abs / Core',
        exercises: ['Weighted crunches', 'Hanging leg raises', 'Loaded plank'],
        equipment: ['Dumbbells', 'Barbells'],
    },
    quads: {
        name: 'Quadriceps',
        exercises: ['Barbell squats (power rack)', 'Leg press', 'Dumbbell lunges'],
        equipment: ['Barbells', 'Leg Presses', 'Dumbbells'],
    },
    traps: {
        name: 'Trapezius',
        exercises: ['Barbell shrugs', 'Dumbbell shrugs', 'Upright rows'],
        equipment: ['Barbells', 'Dumbbells'],
    },
    lats: {
        name: 'Lats / Back',
        exercises: ['Back machine rows/pulldowns', 'Bent-over barbell rows', 'Dumbbell rows'],
        equipment: ['Back Machines', 'Barbells', 'Dumbbells'],
    },
    triceps: {
        name: 'Triceps',
        exercises: ['Close-grip bench press', 'Overhead dumbbell extension', 'Skull crushers'],
        equipment: ['Barbells', 'Benches', 'Dumbbells'],
    },
    glutes: {
        name: 'Glutes',
        exercises: ['Barbell hip thrusts', 'Leg press (feet high)', 'Bulgarian split squats'],
        equipment: ['Barbells', 'Leg Presses', 'Dumbbells'],
    },
    hamstrings: {
        name: 'Hamstrings',
        exercises: ['Romanian deadlifts', 'Leg press (feet high)', 'Single-leg dumbbell RDL'],
        equipment: ['Barbells', 'Leg Presses', 'Dumbbells'],
    },
    calves: {
        name: 'Calves',
        exercises: ['Standing calf raises', 'Treadmill incline walk'],
        equipment: ['Dumbbells', 'Treadmills'],
    },
    lowerback: {
        name: 'Lower Back',
        exercises: ['Barbell deadlifts', 'Back extensions', 'Good mornings'],
        equipment: ['Barbells', 'Back Machines'],
    },
};

const SKIN = '#e4d6d2';
const SKIN_STROKE = '#b8a49c';

// Non-interactive joint circles drawn underneath, purely to smooth the
// visual seams between torso/limb pieces.
const JOINTS = [
    { cx: 90, cy: 58, r: 9 },   // left shoulder
    { cx: 150, cy: 58, r: 9 },  // right shoulder
    { cx: 85, cy: 123, r: 6 },  // left elbow
    { cx: 155, cy: 123, r: 6 }, // right elbow
    { cx: 111, cy: 165, r: 8 }, // left hip
    { cx: 129, cy: 165, r: 8 }, // right hip
    { cx: 110, cy: 259, r: 8 }, // left knee
    { cx: 130, cy: 259, r: 8 }, // right knee
];

// Each body part is ONE shape used both as the visible silhouette piece
// and as the hover/click target -- so the highlight can never drift from
// the outline, since it IS the outline.
const FRONT_PARTS = [
    { id: 'chest', d: 'M98,50 L142,50 L138,94 L102,94 Z' },
    { id: 'abs', d: 'M102,96 L138,96 L132,148 L108,148 Z' },
    { id: null, d: 'M108,150 L132,150 L136,166 L104,166 Z' }, // hip base, decorative
    { id: 'biceps', d: 'M78,58 L94,58 L90,122 L80,122 Z' },
    { id: 'biceps', d: 'M146,58 L162,58 L160,122 L150,122 Z' },
    { id: 'forearms', d: 'M80,124 L90,124 L86,168 L78,168 Z' },
    { id: 'forearms', d: 'M150,124 L160,124 L162,168 L154,168 Z' },
    { id: 'quads', d: 'M104,166 L120,166 L118,258 L102,258 Z' },
    { id: 'quads', d: 'M120,166 L136,166 L138,258 L122,258 Z' },
    { id: 'calves', d: 'M102,260 L118,260 L116,326 L104,326 Z' },
    { id: 'calves', d: 'M122,260 L138,260 L136,326 L124,326 Z' },
];

const BACK_PARTS = [
    { id: 'traps', d: 'M98,50 L142,50 L136,64 L104,64 Z' },
    { id: 'lats', d: 'M104,66 L136,66 L132,110 L108,110 Z' },
    { id: 'lowerback', d: 'M108,112 L132,112 L136,148 L104,148 Z' },
    { id: 'triceps', d: 'M78,58 L94,58 L90,122 L80,122 Z' },
    { id: 'triceps', d: 'M146,58 L162,58 L160,122 L150,122 Z' },
    { id: 'forearms', d: 'M80,124 L90,124 L86,168 L78,168 Z' },
    { id: 'forearms', d: 'M150,124 L160,124 L162,168 L154,168 Z' },
    { id: 'glutes', d: 'M104,150 L136,150 L134,184 L106,184 Z' },
    { id: 'hamstrings', d: 'M106,186 L120,186 L118,258 L104,258 Z' },
    { id: 'hamstrings', d: 'M120,186 L134,186 L136,258 L122,258 Z' },
    { id: 'calves', d: 'M102,260 L118,260 L116,326 L104,326 Z' },
    { id: 'calves', d: 'M122,260 L138,260 L136,326 L124,326 Z' },
];

function InfographicPage() {
    const [view, setView] = useState('front');
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);

    const parts = view === 'front' ? FRONT_PARTS : BACK_PARTS;
    const selectedData = selected ? MUSCLE_DATA[selected] : null;

    const partProps = (id) => {
        if (!id) {
            return { fill: SKIN, stroke: SKIN_STROKE, strokeWidth: 1 };
        }
        const isHovered = hovered === id;
        return {
            fill: isHovered ? 'rgb(181, 68, 68)' : SKIN,
            stroke: isHovered ? 'rgb(181, 68, 68)' : SKIN_STROKE,
            strokeWidth: 1,
            style: { cursor: 'pointer', transition: 'fill 0.18s ease, stroke 0.18s ease' },
            onMouseEnter: () => setHovered(id),
            onMouseLeave: () => setHovered(null),
            onClick: () => setSelected(id),
        };
    };

    return (
        <div className="widgetContainer infographic-fade-in" style={{ padding: '20px 16px 60px' }}>
            <h1 className="titleHeader">Muscle Map</h1>
            <p style={{
                textAlign: 'center',
                color: '#777',
                maxWidth: '480px',
                margin: '0 auto 20px',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                Hover to highlight a muscle group, click for exercises and equipment available at PGymP.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                <button
                    onClick={() => setView('front')}
                    className={`view-toggle-btn ${view === 'front' ? 'active' : ''}`}
                >
                    Front
                </button>
                <button
                    onClick={() => setView('back')}
                    className={`view-toggle-btn ${view === 'back' ? 'active' : ''}`}
                >
                    Back
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="body-svg-wrapper">
                    <svg viewBox="0 0 240 350" width="220" height="440">
                        {/* head + neck (decorative, same both views) */}
                        <circle cx="120" cy="24" r="17" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />
                        <path d="M112,40 L128,40 L126,50 L114,50 Z" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />

                        {/* joint fillers, drawn first so part edges sit cleanly on top */}
                        {JOINTS.map((j, i) => (
                            <circle key={i} cx={j.cx} cy={j.cy} r={j.r} fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />
                        ))}

                        {/* hands + feet (decorative) */}
                        <ellipse cx="80" cy="176" rx="8" ry="10" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />
                        <ellipse cx="160" cy="176" rx="8" ry="10" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />
                        <ellipse cx="110" cy="334" rx="11" ry="7" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />
                        <ellipse cx="130" cy="334" rx="11" ry="7" fill={SKIN} stroke={SKIN_STROKE} strokeWidth="1" />

                        {parts.map((part, i) => (
                            <path key={`${view}-${i}`} d={part.d} {...partProps(part.id)} />
                        ))}
                    </svg>
                </div>
            </div>

            {hovered && !selected && (
                <p style={{
                    textAlign: 'center',
                    marginTop: '14px',
                    color: 'rgb(181, 68, 68)',
                    fontWeight: 700,
                    fontSize: '15px',
                    animation: 'hoverLabelIn 0.2s ease both',
                }}>
                    {MUSCLE_DATA[hovered]?.name}
                </p>
            )}

            {selectedData && (
                <div className="muscle-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="muscle-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="muscle-modal-close" onClick={() => setSelected(null)}>✕</button>
                        <h2 className="muscle-modal-title">{selectedData.name}</h2>

                        <h4 className="muscle-modal-subhead">Effective Exercises</h4>
                        <ul className="muscle-modal-list">
                            {selectedData.exercises.map((ex) => (
                                <li key={ex}>{ex}</li>
                            ))}
                        </ul>

                        <h4 className="muscle-modal-subhead">Equipment at PGymP</h4>
                        <div className="muscle-modal-tags">
                            {selectedData.equipment.map((eq) => (
                                <span key={eq} className="muscle-modal-tag">{eq}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .infographic-fade-in {
                    animation: infographicFade 0.35s ease both;
                }
                @keyframes infographicFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes hoverLabelIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .view-toggle-btn {
                    padding: 10px 24px;
                    border-radius: 25px;
                    border: 2px solid rgb(60, 153, 128);
                    background: #fff;
                    color: rgb(60, 153, 128);
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
                }
                .view-toggle-btn:hover {
                    transform: translateY(-2px);
                }
                .view-toggle-btn.active {
                    background: rgb(60, 153, 128);
                    color: #fff;
                }
                .body-svg-wrapper {
                    background: #ffffff;
                    border: 1px solid #f0f0f0;
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.05);
                    animation: svgCardIn 0.4s ease both;
                }
                @keyframes svgCardIn {
                    from { opacity: 0; transform: scale(0.97); }
                    to { opacity: 1; transform: scale(1); }
                }
                .muscle-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.45);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: overlayFadeIn 0.2s ease both;
                    padding: 20px;
                }
                @keyframes overlayFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .muscle-modal-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 28px;
                    width: 100%;
                    max-width: 360px;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
                    position: relative;
                    animation: modalPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    text-align: left;
                }
                @keyframes modalPopIn {
                    from { opacity: 0; transform: scale(0.92) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .muscle-modal-close {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    background: #f2f2f2;
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    cursor: pointer;
                    color: #666;
                    font-size: 13px;
                    transition: background-color 0.2s ease;
                }
                .muscle-modal-close:hover {
                    background: #e5e5e5;
                }
                .muscle-modal-title {
                    color: rgb(181, 68, 68);
                    font-size: 22px;
                    font-weight: 700;
                    margin: 0 0 16px;
                }
                .muscle-modal-subhead {
                    color: rgb(60, 153, 128);
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    margin: 16px 0 8px;
                }
                .muscle-modal-subhead:first-of-type {
                    margin-top: 0;
                }
                .muscle-modal-list {
                    margin: 0;
                    padding-left: 18px;
                    color: #444;
                    font-size: 14px;
                    line-height: 1.7;
                }
                .muscle-modal-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .muscle-modal-tag {
                    background: rgba(60, 153, 128, 0.1);
                    color: rgb(60, 153, 128);
                    font-size: 12.5px;
                    font-weight: 600;
                    padding: 5px 12px;
                    border-radius: 999px;
                }
            `}</style>
        </div>
    );
}

export default InfographicPage;