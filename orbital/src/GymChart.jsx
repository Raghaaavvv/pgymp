import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, CartesianGrid } from 'recharts';
/* hard coded for now ig */

  function GymChart() {
  const data = [
      { time: '08:00', capacity: 2 },
      { time: '10:00', capacity: 7 },
      { time: '12:00', capacity: 4 },
      { time: '16:00', capacity: 12 },
      { time: '20:00', capacity: 6 },
      { time: '22:00', capacity: 7 },
    ];

  return (
      <div className="chart-container" style={{ width: '80%', height: 300, margin: '0 auto', marginTop: '40px', color: 'rgb(255, 0, 0)' }}>
        <h3 style={{ textAlign: 'center', color: 'rgb(181, 68, 68)' }}>Today's Gym Capacity</h3>
        
    
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data = {data}>
            <CartesianGrid strokeDasharray = "3 3" /> 
            <XAxis dataKey = "time" />
            <YAxis />
            <Tooltip /> 
            <Line 
              type = "monotone" 
              dataKey = "capacity" 
              stroke="rgb(155, 10, 10)" 
              strokeWidth={3} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );

  }
  export default GymChart;