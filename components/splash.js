const Splash = ({ children }) => (
  <div className="splash">
    {children}
    <style jsx>{`
      .splash {
        font-family: 'Helvetica Neue', Helvetica, Arial;
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 30rem;
        margin: 0 auto;
        text-align: center;
        padding-top: 20vh;
      }
    `}</style>
  </div>
)

export default Splash
