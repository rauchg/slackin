const Splash = ({ children, iframe }) =>
  !iframe ? (
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
  ) : (
    <div className="splash">
      {children}
      <style jsx>{`
        .splash {
          display: grid;
          width: 25rem;
          margin: 0;
          padding: 1rem;
          text-align: center;
          font-family: 'Helvetica Neue', Helvetica, Arial;
        }
      `}</style>
    </div>
  )

export default Splash
