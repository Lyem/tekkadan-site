import React, { useState, SelectHTMLAttributes } from 'react'
import * as S from './style'

type SelectProps = {
  children: React.ReactNode
  onSelectChange?: (value: string) => void
  backgroundColor?: 'contrast' | 'black' | 'contrast2' | 'contrast3'
} & SelectHTMLAttributes<HTMLSelectElement>

const Select = ({
  children,
  onSelectChange,
  backgroundColor = 'contrast'
}: SelectProps) => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    !!onSelectChange && onSelectChange(newValue)
  }

  return (
    <S.Wrapper
      onChange={onChange}
      value={value}
      backgroundColor={backgroundColor}
    >
      {children}
    </S.Wrapper>
  )
}

export default Select
