import { useData, useUsers } from '../utils/hooks'

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
  const data = useData()
  const { users } = data || {}
  // const users = useUsers()

  if (!users) {
    return <Status>&nbsp;</Status>
  }

  const { active, total } = users

  if (active) {
    return (
      <Status>
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
    <Status>
      <b>{total}</b> users are registered so far.
    </Status>
  )
}
