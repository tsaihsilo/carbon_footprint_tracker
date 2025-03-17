import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface DashboardProp {
  allCarbonData: { date: string, totalCarbon: number }[]
}

function Dashboard({ allCarbonData }: DashboardProp) {

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ResponsiveContainer width="86%" height={450}>
        <LineChart
          data={allCarbonData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalCarbon" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;