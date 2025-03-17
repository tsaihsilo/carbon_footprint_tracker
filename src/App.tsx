import { useState, useEffect } from 'react'
import ActivityLog from './components/ActivityLog.tsx';
import Dashboard from './components/Dashboard.tsx';
import Goal from './components/Goal.tsx';
import PieChartFeature from './components/PieChartFeature.tsx';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './App.css'

type Activity = {
  name: string; 
  category: string; 
  carbon: number
}

type ActivitiesDictionary = {
  [date: string]: Activity[]
}

type GoalsDictionary = {
  [date: string]: number
}

function loadFromLocalStorage(key: string, fallback: object) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
}

function saveToLocalStorage(key: string, data: ActivitiesDictionary | GoalsDictionary) {
  return localStorage.setItem(key, JSON.stringify(data))
}

function getTotalCarbon(activitiesDictionary: ActivitiesDictionary, dateInput: string) {
  return (activitiesDictionary[dateInput] ?? []).reduce((acc, curr) => acc + curr.carbon, 0)
}

function getAllCarbonData(activitiesDictionary: ActivitiesDictionary) {
  return Object.keys(activitiesDictionary)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date: string) => ({
      date: date, 
      totalCarbon: getTotalCarbon(activitiesDictionary, date)
  }))
}

function App() {
  const [date, setDate] = useState<Date>(new Date())
  const todayDate = date.toISOString().split("T")[0]

  const [activitiesDictionary, setActivitiesDictionary] = useState<ActivitiesDictionary>(
    () => loadFromLocalStorage("activitiesDictionary", {})
  )

  const [goalsDictionary, setGoalsDictionary] = useState<GoalsDictionary>(
    () => loadFromLocalStorage("goalsDictionary", {})
  )

  useEffect(() => {
    saveToLocalStorage("activitiesDictionary", activitiesDictionary)
  }, [activitiesDictionary])

  useEffect(() => {
    saveToLocalStorage("goalsDictionary", goalsDictionary)
  }, [goalsDictionary])

  function addActivity(newActivity: Activity) {
    setActivitiesDictionary(prev => {
      const updatedTodayActivity = prev[todayDate] ? [...prev[todayDate], newActivity] : [newActivity]
      return {...prev, [todayDate]: updatedTodayActivity}
    })
  }

  function deleteActivity(index: number) {
    setActivitiesDictionary(prev => {
      const updatedTodayActivity = prev[todayDate].filter((_, i) => i != index)
      return {...prev, [todayDate]: updatedTodayActivity}
    })
  }

  function setGoal(newGoal: number) {
    setGoalsDictionary(prev => {
      const updatedGoalsDictionary = {...prev, [todayDate]: newGoal}
      saveToLocalStorage("goalsDictionary", updatedGoalsDictionary)
      return updatedGoalsDictionary
    })
  }

  return (
    <div>
      <div className='title-container'>
        <h1>Carbon Footprint Tracker</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p>Select a date:</p>
        <DatePicker selected={date} onChange={date => date && setDate(date)} />
      </div>
      <div className='container'>
        <Dashboard allCarbonData={getAllCarbonData(activitiesDictionary)}/>
        <ActivityLog 
          activities={activitiesDictionary[todayDate] || []} 
          addActivity={addActivity}
          deleteActivity={deleteActivity}
        />
        <PieChartFeature 
          activities={activitiesDictionary[todayDate] || []}
          totalCarbon={getTotalCarbon(activitiesDictionary, todayDate)}
        />
        <Goal 
          totalCarbon={getTotalCarbon(activitiesDictionary, todayDate)}
          goal={goalsDictionary[todayDate] || 0}
          setGoal={setGoal}
        />
      </div>
    </div>
  )
}

export default App;