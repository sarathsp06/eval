import Head from 'next/head'

const Header = (props) => (
  <div>
    <Head>
      <title>3x073L qu!2</title>
      {props.styles.map((value, index) => {
        return (
          <link href={`/static/${value}.css`} rel="stylesheet" key={value} />
        )
      })}
    </Head>
  </div>
)

export default Header