import React, { ChangeEvent, useCallback, useEffect, useState } from "react"

const LOCAL_STORAGE_KEY = "birthYear"

export function BirthDayInput({ onChange }: { onChange: (birthYear: number) => void }) {

  const [inputBirthYear, setInputBirthYear] = useState<string>()

  const handleChange = useCallback((inputBirthYear?: string) => {

    const birthYear = Number.parseInt(inputBirthYear ?? "")

    // It's very unlikely to be born before 1900 or after 2100. In these cases error message is tedious, just ignore the input.
    if (birthYear > 2100 || birthYear < 1900) {
      return
    }

    setInputBirthYear(inputBirthYear)
    // save for later accesses
    localStorage.setItem(LOCAL_STORAGE_KEY, birthYear.toString())

    onChange(birthYear)
  }, [onChange])

  const handleChangeCb = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value)
  }, [handleChange])

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      console.log("read from localstorage")
      handleChange(saved)
    }
  }, [handleChange])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div>
          <label htmlFor="birth-year">Your birth year: </label>
          <input id="birth-year" type="text" value={inputBirthYear} onChange={handleChangeCb} />
        </div>

        <div>
          <a href="https://github.com/minebreaker/mmtm">GitHub</a>
        </div>
      </div>
    </div>
  )
}

