import '../App.css'

interface Activity {
  name: string;
  category: string;
  carbon: number;
}

function PieChart({ activities }: { activities: Activity[]}) {
  // function 
  return (
    <div className="pie-chart">
      <h2>PieChart</h2>

    </div>
  );
}

export default PieChart;