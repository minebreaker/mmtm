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
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100dvh" }}>
      <header />

      <main>
        <Clock birthYear={birthYear} />
        <BirthDayInput onChange={setBirthYear} />
      </main>

      <footer style={{ display: "flex", justifyContent: "end" }}>
        <div style={{ padding: "1rem" }}>
          <a href="https://github.com/minebreaker/mmtm">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
