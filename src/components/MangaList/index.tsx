import Image from 'next/image'
import * as S from './style'

export type MangaListProps = {
  image: string
  title: string
}

const MangaList = ({ image, title }: MangaListProps) => {
  return (
    <S.Wrapper>
      <S.Cover>
        <Image width="110px" height="150px" src={image} />
      </S.Cover>
      <S.WrapperInfos>
        <S.Title>{title}</S.Title>
      </S.WrapperInfos>
    </S.Wrapper>
  )
}

export default MangaList
