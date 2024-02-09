import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

const AGE_SCALE = 80
const VB_HEIGHT = 600
const VB_WIDTH = 800
const RADIUS = 200
const BOLDNESS = 20

const LOCAL_STORAGE_KEY = "birthYear"

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

  const calcChange = useCallback((inputBirthYear: string) => {
    setInputBirthYear(inputBirthYear)
    setError(undefined)
    setRemaining(undefined)
    setX(0)
    setY(0)

    const currentYear = new Date().getFullYear()
    const birthYear = Number.parseInt(inputBirthYear ?? "")

    // It's very unlikely to be born before 1800 or after 2100. In these cases error message is tedious, just ignore the input.
    if (birthYear > 2100 || birthYear < 1800) {
      return
    }

    if (Number.isNaN(birthYear)) {
      setError("invalid value")
      return
    }
    let diff = Math.max((birthYear + AGE_SCALE) - currentYear, 0)
    if (diff > AGE_SCALE) {
      setError("you are not born yet.")
      return
    }

    // looks like the input is valid birthday...

    setRemaining(diff.toString())

    // save for later accesses
    localStorage.setItem(LOCAL_STORAGE_KEY, birthYear.toString())

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

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    calcChange(e.target.value)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      console.log("read from localstorage")
      calcChange(saved)
    }
  }, [])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`} style={{ maxWidth: "min(90vw, 90vh)" }}>
          <circle cx={VB_WIDTH / 2} cy={VB_HEIGHT / 2} r={RADIUS} fill="none" stroke="black" strokeWidth={BOLDNESS} />
          {!error && x && y && (
            <line x1={VB_WIDTH / 2} y1={VB_HEIGHT / 2} x2={x + (VB_WIDTH / 2)} y2={((VB_HEIGHT / 2) - y)} stroke="black" strokeWidth={BOLDNESS} />
          )}
        </svg>
      </div>

      <div>
        {remaining && <p>You have {remaining} years left.</p>}

        <label htmlFor="birth-year">Your birth year: </label>
        <input id="birth-year" type="text" value={inputBirthYear} onChange={handleChange} />
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}
