import Link from 'next/link'
import * as S from './style'

export type TagProps = {
  text: string
  href?: string
}

const Tag = ({ text, href = '/' }: TagProps) => {
  return (
    <Link href={href}>
      <S.Wrapper>{text}</S.Wrapper>
    </Link>
  )
}

export default Tag
