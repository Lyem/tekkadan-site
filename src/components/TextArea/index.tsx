import React, { useState, TextareaHTMLAttributes } from 'react'
import * as S from './style'

export type TextFieldProps = {
  onInputChange?: (value: string) => void
  initialValue?: string
  backgroundColor?: 'contrast' | 'black' | 'contrast2' | 'contrast3'
  fontSize?: 'xxsmall' | 'medium'
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = ({
  initialValue = '',
  onInputChange,
  fontSize = 'medium',
  backgroundColor = 'contrast',
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }
  return (
    <S.TextArea
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      onChange={onChange}
      value={value}
      {...props}
    ></S.TextArea>
  )
}

export default TextArea
