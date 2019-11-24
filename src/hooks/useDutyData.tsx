import {useState, useEffect} from 'react'

import {Duty} from '../types/Duty'

type DutyDataHookResult = [Duty[], React.Dispatch<React.SetStateAction<Duty[]>>]

const mockDuties: Duty[] = [
  {id: 1, name: 'เปิดประตูห้อง', color: '#25B9CF'},
  {id: 2, name: 'เปิดไฟ'},
  {id: 3, name: 'เช็คเครื่องเสียง'},
]

export function useDutyData(): DutyDataHookResult {
  const [data, setData] = useState<Duty[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(mockDuties)
    }, 500)
  }, [])

  return [data, setData]
}
