'use client'

import { useState } from 'react'
import { ChartBarLabelCustom } from '@/components/chart'

type SortOption = 'default' | 'ascending' | 'descending'

interface ChartSectionProps {
  allChartsData: Array<{
    label: string
    data: Array<{
      country: string
      value: number
    }>
  }>
}

export function ChartSection({ allChartsData }: ChartSectionProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default')

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'ascending', label: 'Ascending' },
    { value: 'descending', label: 'Descending' }
  ]

  const getSortedData = (data: any[], option: SortOption) => {
    switch (option) {
      case 'ascending':
        return [...data].sort((a, b) => a.value - b.value)
      case 'descending':
        return [...data].sort((a, b) => b.value - a.value)
      default:
        return data
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortOption(option.value as SortOption)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  sortOption === option.value
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white/60 text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {allChartsData.map((chart) => (
          <div 
            key={chart.label} 
            className="bg-white/80 backdrop-blur-sm rounded-2xl lg:col-span-2"
          >
            <ChartBarLabelCustom 
              label={chart.label} 
              chartData={getSortedData(chart.data, sortOption)} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}
