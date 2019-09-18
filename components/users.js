const Status = ({ iframe, children }) =>
  iframe ? (
    <p>
      {children}
      <style jsx>{`
        p {
          font-size: 1.1rem;
        }
      `}</style>
    </p>
  ) : (
    <p>{children}</p>
  )

export default function Users({ users, iframe }) {
  const { active, total } = users

  if (active) {
    return (
      <Status iframe={iframe}>
        <b className="active">{active}</b> users online now of <b>{total}</b> registered.
        <style jsx>{`
          .active {
            color: #e01563;
          }
        `}</style>
      </Status>
    )
  }

  return (
    <Status iframe={iframe}>
      <b className="total">{total}</b> users are registered so far.
    </Status>
  )
}
