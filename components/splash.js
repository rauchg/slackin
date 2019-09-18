const Splash = ({ children, iframe }) =>
  !iframe ? (
    <div className="splash">
      {children}
      <style jsx>{`
        .splash {
          width: 30rem;
          margin: 20rem auto;
          text-align: center;
          font-family: 'Helvetica Neue', Helvetica, Arial;
        }

        @media only screen and (max-width: 50rem) {
          .splash {
            margin-top: 10rem;
          }
        }
      `}</style>
    </div>
  ) : (
    <div className="splash">
      {children}
      <style jsx>{`
        .splash {
          box-sizing: border-box;
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
