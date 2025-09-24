'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SortOptions() {
  const router = useRouter()
  const [sortState, setSortState] = useState('default')

  function handleSort(value: string) {
    setSortState(value)
    router.push(`/?sort=${value}`)
  }

  return (
    <Select value={sortState} onValueChange={handleSort}>
      <SelectTrigger className='bg-white'>
        <label htmlFor="sort-options" className='text-gray-700 text-xs font-semibold'>Sort by:</label>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='default'>Default</SelectItem>
        <SelectItem value='ascending'>Lowest To Highest</SelectItem>
        <SelectItem value='descending'>Highest To Lowest</SelectItem>
      </SelectContent>
    </Select>
  )
}
