// import { useState, useEffect } from 'react'
import ActivityLog from './components/ActivityLog.tsx';
import Dashboard from './components/Dashboard.tsx';
// import Goal from './components/Goal.tsx';
import PieChart from './components/PieChart.tsx';

function App() {

  // interface Activity {
  //   name: string; 
  //   category: string; 
  //   carbon: number
  // }
  
  // const initialActivityState = () => {
  //   const savedActivities = window.localStorage.getItem("activities");
  //   return savedActivities ? JSON.parse(savedActivities) : [];
  // }

  // const [activities, setActivities] = useState<Activity[]>(() => initialActivityState())

  // useEffect(() => {
  //   window.localStorage.setItem("activities", JSON.stringify(activities))
  // }, [activities])

  // return (
  //   <div>
  //     <div className='title-container'>
  //       <h1>Carbon Footprint Tracker</h1>
  //     </div>

  //     <div className='container'>
  //       <Dashboard/>
  //       <ActivityLog activities={activities} setActivities={setActivities}/>
  //       <PieChart/>
  //       <Goal activities={activities}/>
  //     </div>
  //   </div>
  // )

  return (
      <div>
        <div className='title-container'>
          <h1>Carbon Footprint Tracker</h1>
        </div>
  
        <div className='container'>
          <Dashboard/>
          <ActivityLog />
          <PieChart/>
          {/* <Goal activities={activities}/> */}
        </div>
      </div>
    )
}

export default App;