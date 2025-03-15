import { useState } from 'react';
import '../App.css'

interface Activity {
  name: string; 
  category: string; 
  carbon: number
}

function ActivityLog({ activities, setActivities }: {
  activities: Activity[],
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>}) {
  
  const [newActivity, setNewActivity] = useState<Activity>({
    name: "",
    category: "",
    carbon: 0
  })

  function handleInputChange(event: { target: { name: string; value: string; }; }) {
    setNewActivity({
      ...newActivity,
      [event.target.name]: event.target.name === "carbon" ? Number(event.target.value) : event.target.value
    })
  }

  function addActivity() {
    if (!newActivity.name || !newActivity.category || !newActivity.carbon) return;

    setActivities(activities => [...activities, newActivity]);
    
    setNewActivity({
      name: "", 
      category: "", 
      carbon: 0
    })
  }

  function deleteActivity(index: number) {
    setActivities(activities => activities.filter((_, i) => i != index))
  }

  return (
    <div className='activity-log'>

      <h2>Activity Log</h2>

      <div className='add-activity-container'>
        {/* Activity Name Input */}
        <input 
          type="text"
          placeholder='Enter activity...'
          name="name"
          value={newActivity.name}
          onChange={handleInputChange}
        />

        {/* Activity Category Dropdown */}
        <select  
          name="category"
          value={newActivity.category}
          required
          onChange={handleInputChange}>
            <option value="" disabled>-- Choose a category --</option>
            <option value="Energy use">Energy Use</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Waste">Waste</option>
        </select>

        {/* CO2 Input & unit */}
        <div className='carbon-input'>
          <input 
            type="number" 
            name="carbon"
            value={newActivity.carbon}
            onChange={handleInputChange}
            min="0"
          />
          &nbsp;&nbsp;
          <span>lb</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        
        {/* Add Button */}
        <button className="button" onClick={addActivity}>Add</button>
      </div> 
      <br></br>

      <ul>
        {activities.map((activity, index) => (
          <li key={index} className='activity-element'>
            <span>
              Name: {activity.name}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span>
              Category: {activity.category}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span>
              CO₂: {activity.carbon}
            </span>
            &nbsp;&nbsp;&nbsp;
            <button 
              className='delete-button'
              onClick={() => deleteActivity(index)}>
              <span style={{ fontWeight: "bold" }}>-</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityLog;