import { useState, useEffect } from 'react'
import { Duty } from '../types/Duty'
export function useDutyData() {
  const [data, setData] = useState<Duty[]>([]);
  const duties: Duty[] = [
    { name: 'เปิดประตูห้อง', color: '#25B9CF' },
    { name: 'เปิดไฟ' },
    { name: 'เช็คเครื่องเสียง' }
  ];
  useEffect(() => {
    setData(duties);
  }, []);
  return data;
}
