import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import { useNavigate } from 'react-router-dom'

const Scan = () => {
  const navigate = useNavigate()

  return (
    <div>
      <FaceExpression setMood={(mood) => {
        navigate(`/results?mood=${mood}`)
      }} />
    </div>
  )
}

export default Scan