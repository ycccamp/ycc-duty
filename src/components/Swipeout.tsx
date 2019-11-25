import React, {useState, useEffect, useRef} from 'react'
import c from 'classnames'
import {useSwipeable} from 'react-swipeable'
import {useDrag} from 'react-use-gesture'
import {useSpring, animated} from 'react-spring'

import {notify} from '../utils/noti'

interface SwipeDirection {
  text: React.ReactNode
  onSwipe?: () => void
  type?: any
  style?: any
  className?: string
}

interface SwipeoutProps {
  left?: SwipeDirection
  right?: SwipeDirection
  autoClose?: boolean
  onOpen?: () => void
  onClose?: () => void
  disabled?: boolean
  style?: any
  prefix?: string
  children?: JSX.Element[]
}

export default function Swipeout(props: SwipeoutProps) {
  const cover = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const [{x}, set] = useSpring(() => ({x: 0}))

  const bind = useDrag(event => {
    const {
      down,
      movement: [mx, my],
      first,
      last,
    } = event

    // Swiped Left
    if (last && mx > 80) {
      if (props.left && props.left.onSwipe) {
        props.left.onSwipe()
      }
    }

    // Swiped Right
    if (last && mx < -80) {
      if (props.right && props.right.onSwipe) {
        props.right.onSwipe()
      }
    }

    console.log(mx)

    set({x: down ? mx : 0})
  })

  function renderSwipeDirection(
    button: SwipeDirection | undefined,
    position: string,
  ) {
    if (!button) return

    return (
      <div className={`swipeout-actions swipeout-actions-${position}`}>
        <div
          className={c('swipeout-btn', button.className)}
          style={button.style}
          role="button">
          <div className="swipeout-btn-text">{button.text}</div>
        </div>
      </div>
    )
  }

  const {prefix, left, right, disabled, children, ...restProps} = props

  const {autoClose, onOpen, onClose, ...divProps} = restProps

  const cls = c('swipeout', {[`swipeout-swiping`]: true})

  const isSwipeable = (left || right) && !disabled

  if (!isSwipeable) {
    return (
      <animated.div ref={content} {...bind()} {...divProps}>
        {children}
      </animated.div>
    )
  }

  const contentStyle = {
    left: x,
  }

  const coverStyle = {
    display: 'block',
    left: x,
  }

  return (
    <div className={cls} {...bind()} {...divProps}>
      <animated.div className="swipeout-cover" ref={cover} style={coverStyle} />

      {renderSwipeDirection(left, 'left')}
      {renderSwipeDirection(right, 'right')}

      <animated.div
        className="swipeout-content"
        ref={content}
        style={contentStyle}>
        {children}
      </animated.div>
    </div>
  )
}
