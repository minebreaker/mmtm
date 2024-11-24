import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { Clock } from "./clock"
import { BirthDayInput } from "./input"

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById("app")!!)
  root.render(<App />)
})

function App() {

  const [birthYear, setBirthYear] = useState<number | undefined>()

  return (
    <div>
      <Clock birthYear={birthYear} />
      <BirthDayInput onChange={setBirthYear} />
    </div>
  )
}
