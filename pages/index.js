import { channels } from '../utils/config'
import { getTeam } from '../utils/slack'
import Head from '../components/head'
import Splash from '../components/splash'
import Logos from '../components/logos'
import Users from '../components/users'
import InviteForm from '../components/invite-form'
import Signin from '../components/signin'

const Index = ({ name, logo, large }) => (
  <>
    <Head name={name} />

    <Splash>
      <Logos logo={logo} />

      <p>
        Join <b>{name}</b> {channels.length === 1 && <span>#{channels[0]}</span>} on Slack.
      </p>

      <Users />

      <InviteForm teamName={name} />

      <Signin teamName={name} />

      <footer>
        <p>
          Powered by{' '}
          <a href="http://rauchg.com/slackin" target="_blank" rel="noopener noreferrer">
            slackin
          </a>
        </p>
      </footer>
    </Splash>

    <style jsx global>{`
      html {
        font-size: ${large ? '87.5%' : '62.5%'}; /* 14px and 10px */
        box-sizing: border-box;
      }
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      p {
        font-size: 1.5rem;
        margin: 0.5rem 0;
      }
      /* Use media queries to reduce the font size in large mode for small devices */
      @media only screen and (max-width: 29rem) {
        html {
          font-size: ${large ? '75%' : '62.5%'};
        }
      }
      @media only screen and (max-width: 23rem) {
        html {
          font-size: 62.5%;
        }
      }
    `}</style>
    <style jsx>{`
      footer {
        display: flex;
        flex-grow: 1;
        color: #d6d6d6;
        align-items: flex-end;
        justify-content: center;
        padding: 5vh;
      }
      footer p {
        font-size: 1rem;
        margin: 0;
      }
      footer a {
        color: #9b9b9b;
        text-decoration: none;
        border-bottom: 0.1rem solid #9b9b9b;
      }
      footer a:hover {
        color: #fff;
        background-color: #9b9b9b;
      }
    `}</style>
  </>
)

Index.getInitialProps = async ({ req, res }) => {
  const team = await getTeam(req)

  if (res) {
    res.setHeader('Cache-Control', 's-maxage=7200, stale-while-revalidate')
  }

  return { ...team, large: true }
}

export default Index
