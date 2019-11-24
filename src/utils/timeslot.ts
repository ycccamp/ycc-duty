import moment from 'moment'

const SLOT_DURATION_MIN = 10

export function getSlotFromTime(
  start: string,
  slotDuration: number = SLOT_DURATION_MIN,
  time?: string,
) {
  let endTime

  if (time) {
    const [eh, em] = time.split(':').map(Number)
    endTime = moment({hour: eh, minute: em})
  } else {
    endTime = moment()
  }

  const [sh, sm] = start.split(':').map(Number)
  const startTime = moment({hour: sh, minute: sm})

  const difference = endTime.diff(startTime)

  const diffMin = difference / 1000 / 60
  const slot = Math.ceil(diffMin / slotDuration)

  return slot
}
