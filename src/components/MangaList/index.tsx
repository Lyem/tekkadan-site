import Image from 'next/image'
import * as S from './style'
import * as R from '../../shared/api.routes'

export type MangaListProps = {
  image: string
  title: string
}

const MangaList = ({ image, title }: MangaListProps) => {
  return (
    <S.Wrapper>
      <S.Cover>
        <Image width="110px" height="150px" src={R.image + image} />
      </S.Cover>
      <S.WrapperInfos>
        <S.Title>{title}</S.Title>
      </S.WrapperInfos>
    </S.Wrapper>
  )
}

export default MangaList
