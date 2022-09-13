import Head from 'next/head'
import Panel from '../../templates/panel'

const PanelIndex = () => {
  return (
    <Panel keys="/panel">
      <>
        <Head>
          <title>Tekkadan | Dashboard</title>
        </Head>
        <h1>Dashboard</h1>
      </>
    </Panel>
  )
}

export default PanelIndex
