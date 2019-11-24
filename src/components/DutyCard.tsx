import * as React from 'react'
import styled from '@emotion/styled'
import Swipeout from 'rc-swipeout'
import Ink from 'react-ink'

const actionRight = [
  {
    text: (
      <div className='duty-card-action-done-container'>
        <Ink />

        <i className='far fa-check-circle' />
      </div>
    ),
    onPress: () => console.log('เสร็จ'),
    className: 'duty-card-action-done'
  }
]

interface ContainerProps {
  color?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;

  font-size: 1.4em;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 25px 0;
  border-left: 12px solid ${props => props.color || '#9b59b6'};
  border-radius: 6px;

  .rc-swipeout, .rc-swipeout-btn.duty-card-action-done {
    background: ${props => props.color || '#9b59b6'};
  }
`

export const InnerCard = styled.div`
  color: #2c3e50;
  background: white;
  padding: 10px 0px 10px 28px;
  border-radius: 0px 6px 6px 0px;

  cursor: pointer;
`

interface DutyCardProps {
  name: string
  color?: string
}

export function DutyCard(props: DutyCardProps) {
  return (
    <Container className='duty-card-container' color={props.color}>
      <Swipeout right={actionRight}>
        <InnerCard>
          {props.name}
        </InnerCard>
      </Swipeout>
    </Container>
  )
}
