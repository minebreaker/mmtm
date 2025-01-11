import React, { useEffect, useState } from "react"
import { Centering } from "./utils/components"
import { isMobile } from "./utils/utils"

const AGE_SCALE = 80
const BOLDNESS = 20

const AGE_HAND_LENGTH_RATIO = 0.5
const YEAR_HAND_LENGTH_RATIO = 0.9
const COLOR = "black"

export function Clock({ birthYear }: { birthYear: number | undefined }) {

  const viewHeight = isMobile() ? 600 : 600
  const viewWidth = isMobile() ? 600 : 800
  const radius = isMobile()
    ? (viewWidth / 2 - 96) // 96 is a seemingly good padding value
    : viewWidth / 4

  const [error, setError] = useState<string>()
  const [remainingLife, setRemainingLife] = useState<string>()
  const [remainingDaysOfYear, setRemainingDaysOfYear] = useState<string>()

  const [ageX, setAgeX] = useState(0)
  const [ageY, setAgeY] = useState(0)

  const [yearX, setYearX] = useState(0)
  const [yearY, setYearY] = useState(0)

  useEffect(() => {
    // Reset states in case of invalid input
    setError(undefined)
    setRemainingLife(undefined)
    setAgeX(0)
    setAgeY(0)

    if (!birthYear) {
      return
    }

    if (Number.isNaN(birthYear)) {
      setError("invalid value")
      return
    }

    // looks like the input is valid birthday...

    const now = new Date()
    const currentYear = now.getFullYear()

    // Age hand

    const age = currentYear - birthYear
    if (age < 0) {
      setError("you are not born yet.")
      return
    }
    const ageDiff = AGE_SCALE - age
    setRemainingLife(ageDiff.toString())


    function calc(current: number, scale: number): { x: number, y: number } {
      // FIXME: use radian
      // current : scale = r : 360
      console.log(`current=${current}`)
      console.log(`scale=${scale}`)
      console.log(`ratio=${(360 * current / scale)}`)
      // Minus 450 to fix to clock-angle
      let r = 450 - (360 * current / scale)
      console.log(`ab_ratio=${r > 360 ? r - 360 : r}`)

      const x = Math.cos(r * Math.PI / 180) * radius
      const y = Math.sin(r * Math.PI / 180) * radius
      console.log(`x=${x}`)
      console.log(`y=${y}`)
      return { x, y }
    }

    const { x: ageX, y: ageY } = calc(age, AGE_SCALE)
    setAgeX(ageX)
    setAgeY(ageY)

    // Year hand

    const currentDay = (() => {
      const start = new Date(now.getFullYear(), 0)
      const diff = now.getTime() - start.getTime()

      return Math.floor(diff / (24 * 60 * 60 * 1000))
    })()
    const daysInYear =
      // is leap?
      ((currentYear % 4 === 0) || (currentYear % 4 === 0) && (currentYear % 100 !== 0)) ? 366 : 365
    setRemainingDaysOfYear((daysInYear - currentDay).toString())

    const { x: yearX, y: yearY } = calc(currentDay, daysInYear)
    setYearX(yearX)
    setYearY(yearY)
  }, [birthYear]);

  return (
    <Centering style={isMobile() ? {} : { padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`}
             style={{ width: viewWidth, maxWidth: "100vmin" }}>
          <circle cx={viewWidth / 2} cy={viewHeight / 2} r={radius} fill="none" stroke={COLOR} strokeWidth={BOLDNESS} />
          {!error && ageX && ageY && (
            <>
              <line x1={viewWidth / 2}
                    y1={viewHeight / 2}
                    x2={(ageX * AGE_HAND_LENGTH_RATIO) + (viewWidth / 2)}
                    y2={(viewHeight / 2) - (ageY * AGE_HAND_LENGTH_RATIO)}
                    stroke={COLOR}
                    strokeWidth={BOLDNESS}
                    stroke-linecap="round" />
              <line x1={viewWidth / 2}
                    y1={viewHeight / 2}
                    x2={(yearX * YEAR_HAND_LENGTH_RATIO) + (viewWidth / 2)}
                    y2={(viewHeight / 2) - (yearY * YEAR_HAND_LENGTH_RATIO)}
                    stroke={COLOR}
                    strokeWidth={BOLDNESS}
                    stroke-linecap="round" />
            </>
          )}
        </svg>
      </div>

      <Centering style={{ padding: "1rem" }}>
        <p style={{ margin: 0 }}>Short hand: days left in your life</p>
        <p style={{ margin: 0 }}>Long hand: days left in this year</p>
      </Centering>

      <Centering>
        {remainingDaysOfYear && <p style={{ margin: 0 }}>You have {remainingDaysOfYear} days left this year.</p>}
      </Centering>
      <Centering>
        {remainingLife && <p style={{ margin: 0 }}>You have {remainingLife} years left, if you die at 80.</p>}
      </Centering>

      <Centering style={{ padding: "1rem" }}>
        {error && <p style={{ margin: 0 }}>{error}</p>}
      </Centering>
    </Centering>
  )
}
