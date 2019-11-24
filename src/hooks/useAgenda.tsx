import {useState, useEffect} from 'react'

import {Agenda} from '../types/Agenda'
import {useCurrentSlot} from './useCurrentSlot'
import {getAgenda, getAgendaIndex} from '../utils/agenda'

type AgendaHookResult = [Agenda | null, Agenda | null, Agenda[], number]

export function useAgenda(startTime: string): AgendaHookResult {
  const agendas: Agenda[] = [
    {slot: 0, slotEnd: 18, name: 'นอนหลับพักผ่อน'},
    {slot: 19, slotEnd: 22, name: 'รับน้องมาจากโรงแรม'},
    {slot: 23, slotEnd: 24, name: 'Design Thinking III'},
    {slot: 25, slotEnd: 36, name: 'สอนวิธีสัมภาษณ์'},
    {slot: 37, slotEnd: 50, name: 'พักกินข้าวเที่ยง'},
    {slot: 51, slotEnd: 200, name: 'พาน้องไปสัมภาษณ์'},
    {slot: 201, name: 'ร้องเพลงไฟเย็น'},
  ]

  const [agendaIndex, setAgendaIndex] = useState<number | null>(null)

  const currentSlot = useCurrentSlot(startTime)

  useEffect(() => {
    const index = getAgendaIndex(currentSlot, agendas)

    if (index !== null) setAgendaIndex(index)
  }, [currentSlot])

  if (agendaIndex === null) return [null, null, agendas, currentSlot]

  const currentAgenda = agendas[agendaIndex]
  const nextAgenda = agendas[agendaIndex + 1]

  return [currentAgenda, nextAgenda, agendas, currentSlot]
}
