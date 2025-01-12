import React from "react"
import { DateTime, Duration } from "luxon"
import { Centering } from "./utils/components"
import { isMobile } from "./utils/utils"

const AGE_SCALE = 80

export function Calendar({ birthday }: { birthday: DateTime | undefined }): React.ReactElement {

  const SIZE = isMobile() ? "32px" : "52px"
  const GAP = "8px"

  if (!birthday) {
    return <></>
  }

  const now = DateTime.now()

  const yearsUntilDie = Math.floor(
    (birthday.plus(Duration.fromObject({ years: AGE_SCALE }))).diff(birthday, "years").years
  )
  const age = Math.floor(now.diff(birthday, "years").years)

  const weeksOfYear = now.weeksInWeekYear
  const nowWeekNum = now.weekNumber

  const firstDaysOfMonths = Array.from(
    Array(12).keys().map((_, i) => {
      const firstDay = DateTime.fromObject({ year: now.year, month: i + 1 })
      return [firstDay.weekNumber, firstDay.toFormat("LLL")] as [number, string]
    })
  )
  console.log(Array.from(firstDaysOfMonths))

  return (
    <div style={{ padding: "1rem 1rem" }}>
      <Centering style={{ padding: "1rem" }}>
        <h2 style={{ padding: "1em 0" }}>Age Calendar</h2>
        <div style={{ display: "grid", gap: GAP, grid: "auto-flow / repeat(10, 1fr)", padding: "unset 4rem" }}>
          {Array(yearsUntilDie).keys().map((_, i) => {
            const years = i + 1
            return (
              <div style={{
                width: SIZE,
                height: SIZE,
                color: years < age ? "white"
                  : "unset",
                backgroundColor: years < age ? "black"
                  : years === age ? "lightblue"
                    : years >= 61 ? "rgb(180, 180, 180)"
                      : "rgb(220, 220, 220)"
              }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "inherit" }}>
                  <p>
                    {(years === 1 || years === 60 || years === 80 || years === age) ? years : null}
                  </p>
                </div>
              </div>
            )
          })}
          <div />
        </div>
      </Centering>

      <Centering style={{ padding: "1rem" }}>
        <h2 style={{ padding: "1em 0" }}>Year Calendar</h2>
        <div style={{ display: "grid", gap: GAP, grid: "auto-flow / repeat(10, 1fr)", padding: "unset 4rem" }}>
          {Array(weeksOfYear).keys().map((_, i) => {
            const week = i + 1
            return (
              <div style={{
                width: SIZE,
                height: SIZE,
                color: week < nowWeekNum ? "white"
                  : "unset",
                backgroundColor: week < nowWeekNum ? "black"
                  : week === nowWeekNum ? "lightblue"
                    : "rgb(220, 220, 220)"
              }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "inherit" }}>
                  <p>
                    {(() => {
                      const month = firstDaysOfMonths.find(([n, _]) => week === n)
                      return month ? month[1] : null
                    })()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Centering>
    </div>
  )
}
