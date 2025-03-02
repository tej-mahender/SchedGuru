import React from 'react'
import './Date.css'
function Date() {
  return (
    <div>
       <div className="date-period-container">
          <input type="date" className="date-picker" />
          <select className="period-selector">
            <option value="">Select Period</option>
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Period {i + 1}</option>
            ))}
          </select>
        </div>
      </div>
  )
}
export default Date