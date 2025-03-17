import { useState, useEffect } from 'react'
import ActivityLog from './components/ActivityLog.tsx';
import Dashboard from './components/Dashboard.tsx';
import Goal from './components/Goal.tsx';
import PieChartFeature from './components/PieChartFeature.tsx';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

interface Activity {
  name: string; 
  category: string; 
  carbon: number
}

interface DateDictionary {
  [date: string]: Activity[]
}

interface DateGoal {
  [date: string]: number
}

function loadFromLocalStorage(key: string, fallback: any) {
  return JSON.parse(localStorage.getItem(key) || fallback)
}

function App() {
  const [date, setDate] = useState<Date>(new Date())
  const todayDate = date.toISOString().split("T")[0]

  const [dateDictionary, setDateDictionary] = useState<DateDictionary>(
    () => loadFromLocalStorage("dateDictionary", {})
  )

  function getActivities(dateDictionary: DateDictionary, dateInput: string) {
    return dateDictionary[dateInput] || []
  }

  function addActivity(newActivity: Activity) {
    setDateDictionary(prev => {
      const updatedTodayActivity = prev[todayDate] ? [...prev[todayDate], newActivity] : [newActivity]
      return {...prev, [todayDate]: updatedTodayActivity}
    })
  }

  function deleteActivity(index: number) {
    setDateDictionary(prev => {
      const updatedTodayActivity = prev[todayDate].filter((_, i) => i != index)
      return {...prev, [todayDate]: updatedTodayActivity}
    })
  }

  function getTotalCarbon(dateDictionary: DateDictionary, dateInput: string) {
    return (dateDictionary[dateInput] ?? []).reduce((acc, curr) => acc + curr.carbon, 0)
  }

  function getAllCarbonData(dateDictionary: DateDictionary) {
    return Object.keys(dateDictionary)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date: string) => ({
        date: date, 
        totalCarbon: getTotalCarbon(dateDictionary, date)
    }))
  }

  function initialGoalState() {
    const saveGoalDictionary = window.localStorage.getItem("goalDictionary")
    return saveGoalDictionary ? JSON.parse(saveGoalDictionary) : {}
  }

  const [goalsDictionary, setGoalsDictionary] = useState<DateGoal>(() => initialGoalState())

  const goal = goalsDictionary[todayDate] || 0

  function setGoal(newGoal: number) {
    setGoalsDictionary(prev => {
      return {...prev, [todayDate]: newGoal}
    })
  }

  useEffect(() => {
    window.localStorage.setItem("dateDictionary", JSON.stringify(dateDictionary))
  }, [dateDictionary])
  
  useEffect(() => {
    window.localStorage.setItem("goalDictionary", JSON.stringify(goalsDictionary))
  }, [goalsDictionary])

  return (
    <div>
      <div className='title-container'>
        <h1>Carbon Footprint Tracker</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p style={{ margin: 0 }}>Select a date:</p>
        <DatePicker 
          selected={date} 
          onChange={(date: Date | null) => date && setDate(date)} />
      </div>

      <div className='container'>
        <Dashboard
          allCarbonData={getAllCarbonData(dateDictionary)}/>
        <ActivityLog 
          activities={getActivities(dateDictionary, todayDate)} 
          addActivity={addActivity}
          deleteActivity={deleteActivity}/>
        <PieChartFeature 
          activities={getActivities(dateDictionary, todayDate)}
          totalCarbon={getTotalCarbon(dateDictionary, todayDate)}/>
        <Goal 
          totalCarbon={getTotalCarbon(dateDictionary, todayDate)}
          goal={goal}
          setGoal={setGoal}/>
      </div>
    </div>
  )
}

export default App;