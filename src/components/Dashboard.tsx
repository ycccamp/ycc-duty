import * as React from 'react'
import styled from '@emotion/styled'

import {DutyCard} from './DutyCard'
import {SlotCard} from './SlotCard'
import {AgendaCard} from './AgendaCard'
import {SlotSeparator} from './SlotSeparator'

import {useDutyData} from '../hooks/useDutyData'

const ActionContainer = styled.div`
  width: 100%;
  min-height: 200px;
`

const Backdrop = styled.div`
  background: #2c3e50;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 30px 35px 30px 35px;
`

const Row = styled.div`
  width: 100%;
  max-width: 500px;
`

const Small = styled.span`
  color: #354A5E;
  font-size: 0.8em;
`

export function Dashboard() {
  const duties = useDutyData()

  return (
    <Backdrop>
      <Row>
        <SlotCard />

        <AgendaCard />

        {duties.map(duty => <DutyCard key={duty.name} {...duty} />)}

        <SlotSeparator />

        <DutyCard name="เซ็ตโต๊ะลงทะเบียน" upcoming />
        <DutyCard name="เช็คอินเตอร์เน็ต" color="#25B9CF" upcoming />

        <ActionContainer />
      </Row>
    </Backdrop>
  )
}
