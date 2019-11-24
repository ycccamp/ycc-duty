import moment from 'moment'

import {TimeSlot} from '../src/types/TimeSlot'

import {getSlotFromTime} from '../src/utils/timeslot'

describe('Time Slot', () => {
  // 1 | 07:30 - 07:40
  // 2 | 07:40 - 07:50
  // 3 | 07:50 - 08:00

  it('should derive the correct slot from time', () => {
    const start = '07:30'
    const duration = 10

    expect(getSlotFromTime(start, duration, '07:32')).toBe(1)
    expect(getSlotFromTime(start, duration, '07:47')).toBe(2)
    expect(getSlotFromTime(start, duration, '07:55')).toBe(3)
  })
})
