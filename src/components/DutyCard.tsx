import * as React from 'react'
import styled from '@emotion/styled'
import Swipeout from 'rc-swipeout'
import Ink from 'react-ink'

const actionLeft = [
  {
    text: (
      <div className='duty-card-action-container action-left'>
        <Ink />

        <i className='far fa-clock' />
      </div>
    ),
    onPress: () => console.log('เปลี่ยนเวลา'),
    className: 'duty-card-action'
  }
]

const actionRight = [
  {
    text: (
      <div className='duty-card-action-container'>
        <Ink />

        <i className='far fa-check-circle' />
      </div>
    ),
    onPress: () => console.log('เสร็จ'),
    className: 'duty-card-action'
  },
]

interface ContainerProps {
  color?: string
  upcoming?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;

  font-size: 1.4em;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 25px 0;
  border-left: 12px solid ${props => props.color || '#9b59b6'};
  border-radius: 6px;

  opacity: ${props => props.upcoming ? 0.88 : 1};

  .rc-swipeout, .rc-swipeout-btn.duty-card-action {
    background: ${props => props.color || '#9b59b6'};
  }
`

export const InnerCard = styled.div`
  color: #2c3e50;
  background: white;
  padding: 10px 0px 10px 28px;
  border-radius: 0px 6px 6px 0px;
  position: relative;

  cursor: pointer;
`

interface DutyCardProps {
  name: string
  color?: string
  upcoming?: boolean
}

export function DutyCard(props: DutyCardProps) {
  return (
    <Container className='duty-card-container' color={props.color} upcoming={props.upcoming}>
      <Swipeout left={actionLeft} right={actionRight}>
        <InnerCard>
          {props.name}
        </InnerCard>
      </Swipeout>
    </Container>
  )
}
