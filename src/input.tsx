import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Centering } from "./utils/components"
import { DateTime } from "luxon"

const LOCAL_STORAGE_KEY = "birthYear"

export function BirthDayInput({ onChange }: { onChange: (birthYear: DateTime | undefined) => void }) {

  const [birthday, setBirthday] = useState<DateTime>()

  const handleChange = useCallback((inputBirthday: Date | null) => {

    if (!inputBirthday) {
      onChange(undefined)
      return
    }

    const birthday = DateTime.fromJSDate(inputBirthday)
    if (!birthday.isValid) {
      return
    }
    setBirthday(birthday)

    // It's very unlikely to be born before 1900 or after 2100.
    if (birthday.year > 2100 || birthday.year < 1900) {
      onChange(undefined)
      return
    }

    // save for later accesses
    localStorage.setItem(LOCAL_STORAGE_KEY, birthday.toMillis().toString())

    onChange(birthday)
  }, [onChange])

  const handleChangeCb = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.valueAsDate)
  }, [handleChange])

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      console.log("read from localstorage")
      const parsed = DateTime.fromMillis(Number.parseInt(saved))
      if (parsed.isValid) {
        handleChange(parsed.toJSDate())
      }
    }
  }, [handleChange])

  return (
    <Centering>
      <div>
        <label htmlFor="birth-year">Your birth year: </label>
        <input id="birth-year" type="date" value={birthday?.toISODate() ?? ""} onChange={handleChangeCb} style={{ width: "10em" }} />
      </div>
    </Centering>
  )
}

