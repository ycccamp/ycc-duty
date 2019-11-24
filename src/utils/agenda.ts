import {Agenda} from '../types/Agenda'

export function getAgendaIndex(slot: number, agendas: Agenda[]) {
  const index = agendas.findIndex(
    agenda =>
      slot >= agenda.slot && (agenda.slotEnd ? slot <= agenda.slotEnd : true),
  )

  if (index < 0) return null

  return index
}

export function getAgenda(slot: number, agendas: Agenda[]) {
  const index = getAgendaIndex(slot, agendas)
  if (index === null) return null

  if (agendas[index]) return agendas[index]
}
