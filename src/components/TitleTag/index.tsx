import * as S from './style'

export type TitleTagProps = {
  title: string
}

const TitleTag = ({ title }: TitleTagProps) => {
  return <S.Tag>{title}</S.Tag>
}

export default TitleTag
