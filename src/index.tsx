import React, { ChangeEvent, useCallback, useState } from "react"
import { createRoot } from "react-dom/client"

// FIXME: parameterized canvas width and height
const AGE_SCALE = 80
const RADIUS = 200

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById("app")!!)
  root.render(<App />)
})

function App() {

  const [error, setError] = useState<string>()
  const [remaining, setRemaining] = useState<string>()
  const [inputBirthYear, setInputBirthYear] = useState<string>()

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputBirthYear = e.target.value
    setInputBirthYear(inputBirthYear)
    setError(undefined)
    setRemaining(undefined)
    setX(0)
    setY(0)

    const currentYear = new Date().getFullYear()
    const birthYear = Number.parseInt(inputBirthYear ?? "")
    if (Number.isNaN(birthYear)) {
      setError("invalid value")
      return
    }
    let diff = Math.max((birthYear + AGE_SCALE) - currentYear, 0)
    if (diff > AGE_SCALE) {
      setError("you are not born yet.")
      return
    }
    setRemaining(diff.toString())

    // FIXME: use radian
    // diff : scale = r : 360
    console.log(`s=${AGE_SCALE - diff}`)
    console.log(`ratio=${(360 * (AGE_SCALE - diff) / AGE_SCALE)}`)
    // Minus 450 to fix to clock-angle
    let r = 450 - (360 * (AGE_SCALE - diff) / AGE_SCALE)
    console.log(`ab_ratio=${r > 360 ? r - 360 : r}`)

    const x = Math.cos(r * Math.PI / 180) * RADIUS
    const y = Math.sin(r * Math.PI / 180) * RADIUS
    console.log(`x=${x}`)
    console.log(`y=${y}`)

    setX(x)
    setY(y)
  }, [])

  return (
    <div>

      <svg viewBox="0 0 800 600">
        <circle cx="400" cy="300" r={RADIUS} fill="none" stroke="black" strokeWidth="20" />
        {!error && x && y && (
          <line x1="400" y1="300" x2={x + 400} y2={(300 - y)} stroke="black" strokeWidth="20" />
        )}
      </svg>

      {remaining && <p>You have {remaining} years left.</p>}

      <label htmlFor="birth-year">Your birth year: </label>
      <input id="birth-year" type="text" value={inputBirthYear} onChange={handleChange} />
      {error && <p>{error}</p>}
    </div>
  )
}
