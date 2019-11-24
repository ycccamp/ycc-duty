import * as React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  position: relative;
  left: -35px;
  margin: 40px 0;
`

const Label = styled.div`
  color: white;
  font-size: 1.13em;
  left: 24px;
  position: relative;
`

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  top: 10px;
  position: relative;
`

interface SlotSeparatorProps {
  queue?: number
  timeSlot?: string
}

export function SlotSeparator(props: SlotSeparatorProps) {
  return (
    <Container>
      <Label>
        <span>คิว 51</span>&nbsp;
        <small>(10:00 - 10:10)</small>
      </Label>

      <Line />
    </Container>
  )
}
