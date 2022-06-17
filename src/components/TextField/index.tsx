import React, { useState, InputHTMLAttributes } from 'react'
import * as S from './style'

export type TextFieldProps = {
  onInputChange?: (value: string) => void
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  backgroundColor?: 'contrast' | 'black'
  fontSize?: 'xxsmall' | 'medium'
  type?: 'text' | 'password' | 'email'
} & InputHTMLAttributes<HTMLInputElement>

const TextField = ({
  initialValue = '',
  onInputChange,
  icon,
  iconPosition = 'left',
  fontSize = 'medium',
  type = 'text',
  backgroundColor = 'contrast',
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  return (
    <S.Wrapper>
      <S.InputWrapper backgroundColor={backgroundColor}>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type={type}
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          fontSize={fontSize}
          {...props}
        />
      </S.InputWrapper>
    </S.Wrapper>
  )
}

export default TextField
