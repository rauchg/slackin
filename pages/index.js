import React from 'react'
import Head from 'next/head'

const getData = async () => ({
  org: {
    name: 'ZEIT',
    logo: 'https://avatars.slack-edge.com/2015-10-14/12533264214_c5dd3e906cd6321497a2_132.jpg',
  },
  users: {
    active: 60,
    total: 670,
  },
})

const useData = () => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setData(data)
    }
    fetchData()
  }, [])

  return data
}

const Index = ({ name, logo, channels, large, iframe, coc }) => {
  const data = useData()
  const { users } = data || {}
  const { active, total } = users || {}

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

        {users &&
          (active ? (
            <p className="status">
              <b className="active">{active}</b> users online now of{' '}
              <b className="total">{total}</b> registered.
            </p>
          ) : (
            <p className="status">
              <b className="total">{total}</b> users are registered so far.
            </p>
          ))}

        <form id="invite">
          {channels && channels.length > 1 && (
            <select name="channel" className="form-item">
              {channels.map(channel => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
          )}

          <input
            type="email"
            className="form-item"
            name="email"
            placeholder="you@yourdomain.com"
            autoFocus={!iframe}
          />
          <br />

          {coc && (
            <div className="coc">
              <label>
                <input type="checkbox" name="coc" value="1" />I agree to the{' '}
                <a href={coc} target="_blank" rel="noopener noreferrer">
                  Code of Conduct
                </a>
                .
              </label>
            </div>
          )}
          <button className="loading">Get my Invite</button>
        </form>

        <p className="signin">
          or{' '}
          <a href={`https://${org}.slack.com`} target="_top">
            sign in
          </a>
          .
        </p>

        {!iframe && (
          <footer>
            Powered by{' '}
            <a href="http://rauchg.com/slackin" target="_blank" rel="noopener noreferrer">
              slackin
            </a>
          </footer>
        )}
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
        .logos {
          position: relative;
          margin-bottom: 4rem;
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
