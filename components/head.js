import Head from 'next/head'

export default ({ name }) => (
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
)
