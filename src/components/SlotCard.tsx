import * as React from 'react'
import {useState, useEffect} from 'react'
import styled from '@emotion/styled'

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
  f?: number
}

const Item = styled.div<ItemProp>`
  padding: 8px 10px 13px 10px;
  font-size: 1.2em;
  text-align: center;

  color: #35495d;
  width: 100%;

  flex: ${props => props.f || 1};
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
  color: #354A5E;
  font-size: 0.8em;
`

const pad = n => n < 10 ? '0' + n : String(n)

function useCurrentTime() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    let timer = setInterval(() => {
      const d = new Date()

      setTime(d.getHours() + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return time
}

export function SlotCard() {
  const currentTime = useCurrentTime()

  return (
    <Container>
      <Item f={1.9}>{currentTime}</Item>
      <Item><Small>คิว</Small> 50</Item>
      <Item f={1.9}><Small>เหลือ</Small> 4:10</Item>

      <ProgressLine />
    </Container>
  )
}
