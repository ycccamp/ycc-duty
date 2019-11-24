import * as React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import {DutyCard} from './DutyCard'
import {SlotSeparator} from './SlotSeparator'

import {notify, success} from '../utils/noti'
import {useDutyData} from '../hooks/useDutyData'

export function DutiesList() {
  const [duties, setDuties] = useDutyData()

  function handleDone(id, name) {
    setDuties(duties.filter(duty => duty.id !== id))

    notify(`งาน <b>${name}</b> เสร็จแล้ว! &nbsp;😎`)
  }

  return (
    <div>
      <TransitionGroup className="duty-list">
        {duties.map(duty => (
          <CSSTransition
            appear
            key={duty.id}
            timeout={800}
            classNames="duty-card">
            <DutyCard onDone={handleDone} {...duty} />
          </CSSTransition>
        ))}
      </TransitionGroup>

      <SlotSeparator />

      <DutyCard id={3} name="เซ็ตโต๊ะลงทะเบียน" upcoming />
      <DutyCard id={4} name="เช็คอินเตอร์เน็ต" color="#25B9CF" upcoming />
    </div>
  )
}
