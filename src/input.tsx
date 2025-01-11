import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Centering } from "./utils/components"

const LOCAL_STORAGE_KEY = "birthYear"

export function BirthDayInput({ onChange }: { onChange: (birthYear: number | undefined) => void }) {

  const [inputBirthYear, setInputBirthYear] = useState<string>()

  const handleChange = useCallback((inputBirthYear?: string) => {

    const birthYear = Number.parseInt(inputBirthYear ?? "")

    setInputBirthYear(inputBirthYear)

    if (Number.isNaN(birthYear)) {
      onChange(undefined)
      return
    }

    // It's very unlikely to be born before 1900 or after 2100.
    if (birthYear > 2100 || birthYear < 1900) {
      onChange(undefined)
      return
    }

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
    <Centering>
      <div>
        <label htmlFor="birth-year">Your birth year: </label>
        <input id="birth-year" type="text" value={inputBirthYear} onChange={handleChangeCb} style={{ width: "4em" }} />
      </div>
    </Centering>
  )
}

