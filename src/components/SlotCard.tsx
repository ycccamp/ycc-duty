import * as React from 'react'
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

const Item = styled.div`
  padding: 8px 10px 13px 10px;
  font-size: 1.5em;
  text-align: center;

  color: #2c3e50;
  flex: 1;
  width: 100%;
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

export function SlotCard() {
  return (
    <Container>
      <Item>8:36</Item>
      <Item>คิว 5</Item>
      <Item style={{flex: 1.5}}>เหลือ 4:10</Item>

      <ProgressLine />
    </Container>
  )
}
