import * as React from 'react'
import styled from '@emotion/styled'

import {useCurrentTime} from '../hooks/useCurrentTime'
import {useCurrentSlot} from '../hooks/useCurrentSlot'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  position: relative;

  width: 100%;
  background: #f6f6f6;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 16px 0;
  border-radius: 6px;
`

interface ItemProp {
  flex?: number
}

const Item = styled.div<ItemProp>`
  padding: 8px 10px 13px 10px;
  font-size: 1.2em;
  text-align: center;

  color: #35495d;
  width: 100%;

  flex: ${props => props.flex || 1};
`

const ProgressLine = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 5px;

  background: #9b58b6;
  border-radius: 0px 0px 6px 6px;
`

const Small = styled.span`
  color: #354a5e;
  font-size: 0.8em;
`

export function SlotCard() {
  const currentTime = useCurrentTime()
  const currentSlot = useCurrentSlot('09:00')

  return (
    <Container>
      <Item flex={1.6}>{currentTime}</Item>
      <Item>
        <Small>คิว</Small> {currentSlot}
      </Item>
      <Item flex={1.6}>
        <Small>เหลือ</Small> 4:10
      </Item>

      <ProgressLine />
    </Container>
  )
}
