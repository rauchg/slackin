import { channels } from '../../utils/config'
import { getTeam } from '../../utils/slack'
import Head from '../../components/head'
import Splash from '../../components/splash'
import Logos from '../../components/logos'
import Users from '../../components/users'
import InviteForm from '../../components/invite-form'
import Signin from '../../components/signin'

const Dialog = ({ name, logo, large }) => (
  <>
    <Head name={name} />

    <Splash iframe={true}>
      <p>
        Join <b>{name}</b> {channels && channels.length === 1 && <span>#{channels[0]}</span>} on
        Slack.
      </p>

      <Users />

      <InviteForm iframe={true} teamName={name} />

      <Signin teamName={name} />
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
    `}</style>
  </>
)

Dialog.getInitialProps = async ({ req, res }) => {
  const team = await getTeam(req)

  if (res) {
    res.setHeader('Cache-Control', 's-maxage=7200, stale-while-revalidate')
  }

  return { ...team, large: true }
}

export default Dialog
