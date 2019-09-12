import Head from 'next/head'

const getData = async () => ({
  org: {
    name: 'ZEIT',
    logo: 'https://avatars.slack-edge.com/2015-10-14/12533264214_c5dd3e906cd6321497a2_132.jpg',
  },
})

const Index = ({ name, logo, channels, large, iframe }) => {
  return (
    <>
      <Head>
        <title>Join {name} on Slack!</title>
        <link
          rel="shortcut icon"
          href="https://slack.global.ssl.fastly.net/272a/img/icons/favicon-32.png"
        />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`}
        ></script>
      </Head>

      <div className="splash">
        <div className="logos">
          {logo && <div className="logo org"></div>}
          <div className="logo slack"></div>
        </div>

        <p>
          Join <b>{name}</b> {channels && channels.length === 1 && <span>#{channels[0]}</span>} on
          Slack.
        </p>

        <p className="status"></p>

        <form id="invite"></form>
      </div>

      <style jsx global>{`
        html {
          font-size: ${large ? '14px' : '10px'};
        }
        body {
          margin: 0;
          padding: 0;
          background: #fafafa;
          overflow: ${iframe ? 'hidden' : 'visible'};
        }
      `}</style>
      <style jsx>{`
        .splash {
          box-sizing: border-box;
          width: ${iframe ? '25rem' : '30rem'};
          margin: ${iframe ? '0' : '20rem auto'};
          padding: ${iframe ? '1rem' : '0'};
          text-align: center;
          font-family: 'Helvetica Neue', Helvetica, Arial;
        }
      `}</style>
    </>
  )
}

Index.getInitialProps = async function() {
  const slack = await getData()
  const { name, logo } = slack.org
  const channels = ['best-channel']

  return { name, logo, channels, iframe: false, large: true }
}

export default Index
