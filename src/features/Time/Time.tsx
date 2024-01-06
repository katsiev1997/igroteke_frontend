import React from "react"
import cls from './Time.module.scss'

const times: number[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export const Time = () => {
  return (
    <div className={cls.time}>
      {times.map((time, i) => (
        <React.Fragment key={i}>
          <span>{time}:00 —</span>
          <span>{time}:30 —</span>
        </React.Fragment>
      ))}
          <span>00:00 —</span>
    </div>
  )
}
