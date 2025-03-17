/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

import '../App.css'

interface Activity {
  name: string;
  category: string;
  carbon: number;
}

interface messageProp {
  totalCarbon: number
}

function PieChartFeature({ activities, totalCarbon }: { activities: Activity[], totalCarbon: number }) {

  function Message({ totalCarbon }: messageProp) {
    if (totalCarbon === 0) {
      return <p>Add activities to visualize the pie chart!</p>
    }
    return
  }

  function categoryCarbon(categoryName: string) {
    const sum = activities.reduce((acc, curr) => (
      curr.category === categoryName ? acc + curr.carbon : acc
    ), 0)
    return sum
  }

  const data = ["Energy use", "Food", "Transportation", "Waste"].map(category => ({
    name: category, 
    value: categoryCarbon(category)
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div style={{ fontSize: "16px", color: "#000" }}>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Colored Circle */}
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: entry.color
              }}
            ></span>

            {/* Category Name in Black */}
            <p style={{ margin: 0, color: "#000", fontSize: "14px" }}>{entry.value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pie-chart">
      <h2>PieChart</h2>
      <div className="pie-chart-container">
        <Message totalCarbon={totalCarbon} />
        <ResponsiveContainer width="100%" height={500}>  
          <PieChart width={500} height={500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}

              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend content={renderCustomLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartFeature;