import ActivityLog from './components/ActivityLog.tsx';
import Dashboard from './components/Dashboard.tsx';
import Goal from './components/Goal.tsx';
import PieChart from './components/PieChart.tsx';
import './App.css';

function App() {

  return (
      <div>
        <div className='title-container'>
          <h1>Carbon Footprint Tracker</h1>
        </div>
  
        <div className='container'>
          <Dashboard/>
          <ActivityLog />
          <PieChart/>
          <Goal />
        </div>
      </div>
    )
}

export default App;