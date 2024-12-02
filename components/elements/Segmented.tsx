'use client'

import { Dispatch, SetStateAction } from 'react'
import { SegmentedControl } from '@/components/ui/segmented-control'
import styled from '@emotion/styled'

interface ISegmented {
  items: string[]
  value: string
  setState: Dispatch<SetStateAction<string>>
}

const CustomSegmentedControl = styled(SegmentedControl)`
  height: auto;
  padding: 6px 10px;
  background-color: #fbfbfb;

  label {
    padding: 4px 12px;
  }

  span {
    color: #3d3d3d;
  }

  [data-state='checked'] {
    background-color: #5bac73;
    color: white;
    font-weight: bold;
  }
`

export default function Segmented(props: ISegmented) {
  const { items, value, setState } = props

  return (
    <CustomSegmentedControl
      size={'xs'}
      value={value}
      onValueChange={(e) => setState(e.value)}
      items={items}
    />
  )
}
