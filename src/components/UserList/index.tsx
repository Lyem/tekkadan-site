import { image } from '../../shared/api.routes'
import * as S from './style'

export type UserListProps = {
  photo: string
  name: string
}

const UserList = ({ photo, name }: UserListProps) => {
  return (
    <S.Wrapper>
      <S.Photo>
        <img src={image + photo} />
      </S.Photo>
      <S.Name>{name}</S.Name>
    </S.Wrapper>
  )
}

export default UserList
