import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gesture from 'rc-gesture'
import classnames from 'classnames'

interface ActionButton {
  text: React.ReactNode
  onPress?: () => void
  type?: any
  style?: any
  className?: string
}

interface SwipeoutProps {
  left?: ActionButton[]
  right?: ActionButton[]
  autoClose?: boolean
  onOpen?: () => void
  onClose?: () => void
  disabled?: boolean
  style?: any
  prefixCls?: string
}

function closest(el: HTMLElement, selector: string) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    } else if (el.parentElement) {
      el = el.parentElement
    }
  }

  return null
}

interface State {
  swiping: boolean
}

export default class Swipeout extends Component<SwipeoutProps, State> {
  static defaultProps = {
    prefixCls: 'swipeout',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
    onClose() {},
  }

  openedLeft: boolean = false
  openedRight: boolean = false
  content: any
  cover: any
  left: any
  right: any

  btnsLeftWidth: number
  btnsRightWidth: number
  swiping: boolean
  needShowLeft: boolean
  needShowRight: boolean

  state = {swiping: false}

  componentDidMount() {
    this.btnsLeftWidth = this.left ? this.left.offsetWidth : 0
    this.btnsRightWidth = this.right ? this.right.offsetWidth : 0

    document.body.addEventListener('touchstart', this.onCloseSwipe, {
      passive: true,
    })
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.onCloseSwipe, true)
  }

  onCloseSwipe = ev => {
    if (!(this.openedLeft || this.openedRight)) return

    const pNode = closest(ev.target, `.${this.props.prefixCls}-actions`)

    if (!pNode) {
      ev.preventDefault()
      this.close()
    }
  }

  onPanStart = e => {
    const {direction, moveStatus} = e
    const {x: deltaX} = moveStatus

    const isLeft = direction === 2
    const isRight = direction === 4

    if (!isLeft && !isRight) return

    const {left, right} = this.props
    this.needShowRight = isLeft && right!.length > 0
    this.needShowLeft = isRight && left!.length > 0
    if (this.left) {
      this.left.style.visibility = this.needShowRight ? 'hidden' : 'visible'
    }
    if (this.right) {
      this.right.style.visibility = this.needShowLeft ? 'hidden' : 'visible'
    }
    if (this.needShowLeft || this.needShowRight) {
      this.swiping = true
      this.setState({swiping: this.swiping})
      this._setStyle(deltaX)
    }
  }
  onPanMove = e => {
    const {moveStatus, srcEvent} = e
    const {x: deltaX} = moveStatus

    if (!this.swiping) return

    // fixed scroll when it's pan and moving.
    if (srcEvent && srcEvent.preventDefault) {
      srcEvent.preventDefault()
    }

    this._setStyle(deltaX)
  }

  onPanEnd = e => {
    if (!this.swiping) return

    const {moveStatus} = e
    const {x: deltaX} = moveStatus

    const needOpenRight =
      this.needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2
    const needOpenLeft =
      this.needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2

    if (needOpenRight) {
      this.doOpenRight()
    } else if (needOpenLeft) {
      this.doOpenLeft()
    } else {
      this.close()
    }
    this.swiping = false
    this.setState({swiping: this.swiping})
    this.needShowLeft = false
    this.needShowRight = false
  }

  doOpenLeft = () => {
    this.open(this.btnsLeftWidth, true, false)
  }

  doOpenRight = () => {
    this.open(-this.btnsRightWidth, true, false)
  }
  // left & right button click
  onBtnClick(ev, btn) {
    const onPress = btn.onPress
    if (onPress) {
      onPress(ev)
    }
    if (this.props.autoClose) {
      this.close()
    }
  }

  _getContentEasing(value, limit) {
    // limit content style left when value > actions width
    const delta = Math.abs(value) - Math.abs(limit)
    const isOverflow = delta > 0
    const factor = limit > 0 ? 1 : -1
    if (isOverflow) {
      value = limit + Math.pow(delta, 0.85) * factor
      return Math.abs(value) > Math.abs(limit) ? limit : value
    }
    return value
  }

  // set content & actions style
  _setStyle = value => {
    const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth
    const contentLeft = this._getContentEasing(value, limit)
    this.content.style.left = `${contentLeft}px`
    if (this.cover) {
      this.cover.style.display = Math.abs(value) > 0 ? 'block' : 'none'
      this.cover.style.left = `${contentLeft}px`
    }
  }

  open = (value, openedLeft, openedRight) => {
    if (!this.openedLeft && !this.openedRight && this.props.onOpen) {
      this.props.onOpen()
    }

    this.openedLeft = openedLeft
    this.openedRight = openedRight
    this._setStyle(value)
  }

  close = () => {
    if ((this.openedLeft || this.openedRight) && this.props.onClose) {
      this.props.onClose()
    }
    this._setStyle(0)
    this.openedLeft = false
    this.openedRight = false
  }

  renderButtons(buttons, ref) {
    const prefixCls = this.props.prefixCls

    return buttons && buttons.length ? (
      <div
        className={`${prefixCls}-actions ${prefixCls}-actions-${ref}`}
        ref={el => (this[ref] = el)}>
        {buttons.map((btn, i) => (
          <div
            key={i}
            className={`${prefixCls}-btn ${
              btn.hasOwnProperty('className') ? btn.className : ''
            }`}
            style={btn.style}
            role="button"
            onClick={e => this.onBtnClick(e, btn)}>
            <div className={`${prefixCls}-btn-text`}>{btn.text || 'Click'}</div>
          </div>
        ))}
      </div>
    ) : null
  }

  onTouchMove = e => {
    if (this.swiping) e.preventDefault()
  }

  render() {
    const {
      prefixCls,
      left,
      right,
      disabled,
      children,
      ...restProps
    } = this.props

    const {autoClose, onOpen, onClose, ...divProps} = restProps

    const cls = classnames(prefixCls, {
      [`${prefixCls}-swiping`]: this.state.swiping,
    })

    const refProps = {
      ref: el => (this.content = ReactDOM.findDOMNode(el)),
    }

    const isSwipeable = (left!.length || right!.length) && !disabled

    if (!isSwipeable) {
      return (
        <div {...refProps} {...divProps}>
          {children}
        </div>
      )
    }

    return (
      <div className={cls} {...divProps}>
        <div className={`${prefixCls}-cover`} ref={el => (this.cover = el)} />
        {this.renderButtons(left, 'left')}
        {this.renderButtons(right, 'right')}
        <Gesture
          onTouchMove={this.onTouchMove}
          onPanStart={this.onPanStart}
          onPanMove={this.onPanMove}
          onPanEnd={this.onPanEnd}
          onPanCancel={this.onPanEnd}
          onSwipeLeft={this.doOpenRight}
          onSwipeRight={this.doOpenLeft}
          direction="horizontal"
          {...refProps}>
          <div className={`${prefixCls}-content`}>{children}</div>
        </Gesture>
      </div>
    )
  }
}
