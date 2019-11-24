import * as React from 'react'
import styled from '@emotion/styled'
import Swipeout from 'rc-swipeout'

const actionRight = [
  {
    text: 'เสร็จ',
    onPress: () => console.log('เสร็จ'),
    className: 'duty-card-action-done'
  }
]

const Container = styled.div`
  width: 100%;

  text-align: center;
  font-size: 1.4em;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 16px 0;
  border-left: 12px solid ${props => props.color || '#9b59b6'};
  border-radius: 6px;

  .rc-swipeout {
    background: #9b59b6;
    border-radius: 0px 6px 6px 0px;
  }

  .rc-swipeout-btn.duty-card-action-done {
    color: white;
    font-size: 0.85em;
    background: #9b59b6;
  }

  .rc-swipeout-actions-left .rc-swipeout-btn.duty-card-action-done {
    border-radius: 6px 0px 0px 6px;
  }

  .rc-swipeout-actions-right .rc-swipeout-btn.duty-card-action-done {
    border-radius: 0px 6px 6px 0px;
  }
`

export const InnerCard = styled.div`
  color: #2c3e50;
  background: white;
  padding: 10px 0;
  border-radius: 0px 6px 6px 0px;
`

interface DutyCardProps {
  name: string
}

export function DutyCard(props: DutyCardProps) {
  return (
    <Container>
      <Swipeout right={actionRight}>
        <InnerCard>
          {props.name}
        </InnerCard>
      </Swipeout>
    </Container>
  )
}
