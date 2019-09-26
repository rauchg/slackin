import { useUsers, useChanged } from '../utils/hooks'

const Status = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        font-size: 1.2rem;
      }
    `}</style>
  </p>
)

export default function Users() {
  const users = useUsers()
  const changed = useChanged(users, 150)

  if (!users) {
    return <Status>&nbsp;</Status>
  }

  const { active, total } = users

  return (
    <Status>
      {active ? (
        <>
          <b className={`active ${changed.active ? ' grow' : ''}`}>{active}</b> users online now of{' '}
          <b className={changed.total ? 'grow' : null}>{total}</b> registered.
        </>
      ) : (
        <>
          <b className={changed.total ? 'grow' : null}>{total}</b> users are registered so far.
        </>
      )}

      <style jsx>{`
        b {
          display: inline-block;
          transition: transform 150ms ease-in;
        }
        .active {
          color: #e01563;
        }
        .grow {
          transform: scale(1.3);
        }
      `}</style>
    </Status>
  )
}
