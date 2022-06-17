import React from 'react'
import Custom404 from '../../pages/404'

type PanelProps = {
  children: React.ReactNode
}

const Panel = ({ children }: PanelProps) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}
export default Panel
