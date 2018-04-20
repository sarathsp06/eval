import Head from 'next/head'

const Header = (props) => (
  <div>
    <Head>
      <title>3x073L qu!2</title>
      {props.styles.map((value, index) => {
        return (
          <link href={`/static/${value}.css`} rel="stylesheet" key="test" />
        )
      })}
      {/* <link href="/static/master.css" rel="stylesheet" key="test"/> */}
    </Head>
  </div>
)

export default Header