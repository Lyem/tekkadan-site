import * as S from './style'

export type UserListProps = {
  photo: string
  name: string
}

const UserList = ({ photo, name }: UserListProps) => {
  return (
    <S.Wrapper>
      <S.Photo>
        <img src={photo} />
      </S.Photo>
      <S.Name>{name}</S.Name>
    </S.Wrapper>
  )
}

export default UserList
