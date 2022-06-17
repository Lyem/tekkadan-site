import { useRouter } from 'next/router'
import NavBar from '../../components/NavBar'
import OverView from '../../templates/overView'

const MangaOverView = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <NavBar />
      <OverView></OverView>
    </>
  )
}

export default MangaOverView
