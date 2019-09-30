const Signin = ({ teamName }) => (
  <p className="signin">
    or <a href={`https://${teamName}.slack.com`}>sign in</a>.
    <style jsx>{`
      .signin {
        font-size: 1.2rem;
        margin: 1.5rem 0 0;
      }
      .signin a {
        color: #e01563;
        text-decoration: none;
      }
      .signin a:hover {
        background-color: #e01563;
        color: #fff;
      }
    `}</style>
  </p>
)

export default Signin
