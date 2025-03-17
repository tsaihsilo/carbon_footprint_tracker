import { SetStateAction } from 'react'
import '../App.css'

interface GoalProp {
  totalCarbon: number, 
  goal: number, 
  setGoal: (newGoal: number)  => void
}

interface PercentageProp {
  carbonSoFar: number;
  goal: number
}

interface MessageProp {
  carbonSoFar: number;
  goal: number
}

function Goal({ totalCarbon, goal, setGoal }: GoalProp) {
  
  function handleInputChange(event: { target: { value: SetStateAction<string>; }; }) {
    setGoal(Number(event.target.value))
  }

  function deleteGoal() {
    setGoal(0)
  }

  function Percentage({ carbonSoFar, goal }: PercentageProp) {
    let percentage = 0
    if (goal === 0) {
      percentage = 0
    }
    else if (carbonSoFar >= goal) {
      percentage = 100
    }
    else {
      percentage = Math.round((carbonSoFar/goal) * 100)
    }
    return <span>{percentage}%</span>
  }

  function Message({ carbonSoFar, goal }: MessageProp) {
    if (goal === 0) {
      return <p>Set a goal to start tracking your carbon footprint reduction!</p>
    }
    else if (carbonSoFar === 0) {
      return <p>Fantastic! You haven’t produced any carbon emissions yet today!</p>
    }
    else if (carbonSoFar < goal) {
      return <p>Great job! You're staying under your goal. Keep it up!</p>
    }
    else {
      return <p>You exceeded your goal. Consider small changes to improve!</p>
    }
  }
  
  return (
    <div className="goal">

      <h2>Goal</h2>

      <div className="goal-container">
        <span>Under:</span>
        &nbsp;&nbsp;
        <input
          type="number"
          name="goal"
          value={goal}
          onChange={handleInputChange}
          min="0"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>lb / day</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <button
          className="button"
          onClick={deleteGoal}>
          <span style={{ fontWeight: "bold" }}>Delete</span>
        </button>
      </div>
      <br></br>
      <br></br>

      <div className="progress-bar">
        {goal > 0 && <progress value={totalCarbon} max={goal} />}
        &nbsp;&nbsp;&nbsp;
        <Percentage carbonSoFar={totalCarbon} goal={goal}/>
      </div>
      <br></br>

      <Message carbonSoFar={totalCarbon} goal={goal}/>
      <br></br>
      <p>** Very low: {'<'} 6,000 lb/year ➡️ {'<'} 16 lb/day</p>
      <p>** Low: 6,000 - 15,999 lb/year ➡️ 16 - 44 lb/day</p>
      <p>** Average: 16,000 - 22,000 lb/year ➡️ 44 - 60 lb/day</p>
      <p>** High: {'>'} 22,000 lb/year ➡️ {'>'} 60 lb/day</p>
    </div>
  )
}

export default Goal;