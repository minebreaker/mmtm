import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { Clock } from "./clock"
import { BirthDayInput } from "./input"
import { Tab } from "./tab"
import { DateTime } from "luxon"
import { Calendar } from "./calendar"

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById("app")!!)
  root.render(<App />)
})

function App() {

  const [birthday, setBirthday] = useState<DateTime | undefined>()

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100svh" }}>
      <header />

      <main>
        <Tab>
          {[
            { name: "Clock", component: <Clock birthday={birthday} /> },
            { name: "Calendar", component: <Calendar birthday={birthday} /> }
          ]}
        </Tab>
        <BirthDayInput onChange={setBirthday} />
      </main>

      <footer style={{ display: "flex", justifyContent: "end" }}>
        <div style={{ padding: "1rem" }}>
          <a href="https://github.com/minebreaker/mmtm">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
