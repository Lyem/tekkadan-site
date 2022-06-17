import React from 'react'
import Custom404 from '../../pages/404'

type PanelProps = {
  children: React.ReactNode
}

const Panel = ({ children }: PanelProps) => {
  if (!localStorage.getItem('user')) {
    return <Custom404 />
  }
  const user = JSON.parse(localStorage.getItem('user')!)
  console.log(user.token)
  return (
    <>
      <div>{children}</div>
    </>
  )
}
export default Panel
