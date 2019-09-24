import { useReducer } from 'react'
import fetch from 'isomorphic-unfetch'
import { channels, coc } from '../utils/config'
import { inviteToSlack } from '../utils/slack'

const initialState = { text: 'Get my Invite' }

function reducer(state, action) {
  switch (action.type) {
    case 'ready':
      return { ...initialState }
    case 'loading':
      return { disabled: true, text: 'Please Wait' }
    case 'success':
    case 'error':
      return {
        disabled: action.type === 'success',
        className: action.type,
        text: action.text,
      }
    default:
      throw new Error()
  }
}

export default function InviteForm({ iframe }) {
  const [{ disabled, className, text }, dispatch] = useReducer(reducer, initialState)
  const handleInvite = e => {
    e.preventDefault()
    dispatch({ type: 'loading' })

    const form = e.target
    const email = form.email.value
    const channel = form.channel.value
    const cocChecked = form.coc.checked

    // This should never happen because the inputs have required set
    if (!email || !channel || !cocChecked) {
      dispatch({ type: 'ready' })
      return
    }

    inviteToSlack({ email, channel })
      .then(data => {
        dispatch({ type: 'success', text: data.message })
      })
      .catch(error => {
        dispatch({ type: 'error', text: error.message })
      })
  }

  return (
    <form className={iframe ? 'iframe-form' : null} onSubmit={handleInvite}>
      {channels.length > 1 && (
        <select name="channel" className="form-item">
          {channels.map(channel => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      )}

      <input
        type="email"
        name="email"
        className="form-item"
        placeholder="you@yourdomain.com"
        autoFocus={!iframe}
        required
      />

      {coc && (
        <div className="coc">
          <label>
            <input type="checkbox" name="coc" required />I agree to the{' '}
            <a href={coc} target="_blank" rel="noopener noreferrer">
              Code of Conduct
            </a>
            .
          </label>
        </div>
      )}

      <button type="submit" className={className} disabled={disabled}>
        {text}
      </button>

      <style jsx>{`
        .iframe-form button,
        .iframe-form .form-item {
          height: 2.8rem;
          line-height: 2.8rem;
          font-size: 1.1rem;
        }
        select {
          background: none;
        }
        input {
          color: #9b9b9b;
          border: 0.1rem solid #d6d6d6;
        }
        input:focus {
          color: #666;
          border-color: #999;
          outline: 0;
        }
        button,
        .form-item {
          font-size: 1.2rem;
          margin-top: ${iframe ? '0.5rem' : '1.5rem'};
          display: block;
          text-align: center;
          width: 100%;
          padding: 0.9rem;
        }
        button {
          color: #fff;
          font-weight: bold;
          border-width: 0;
          background: #e01563;
          text-transform: uppercase;
          cursor: pointer;
          appearence: none;
          outline: 0;
          transition: background-color 150ms ease-in, color 150ms ease-in;
        }
        button:disabled {
          color: #9b9b9b;
          background-color: #d6d6d6;
          cursor: default;
          pointer-events: none;
        }
        button.success:disabled {
          color: #fff;
          background-color: #68c200;
        }
        button.error {
          background-color: #f4001e;
          text-transform: none;
        }
        .coc {
          font-size: ${iframe ? '1.1rem' : '1.2rem'};
          padding-top: ${iframe ? '1rem' : '1.5rem'};
          color: #666;
        }
        .coc label {
          cursor: pointer;
        }
        .coc input {
          position: ${iframe ? 'relative' : 'static'};
          top: -0.2rem;
          appearance: none;
          border: none;
          vertical-align: middle;
          margin: 0 0.5rem 0 0;
        }
        .coc input::after {
          content: '';
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          vertical-align: middle;
          background: url(assets/checkbox.svg);
          background-size: cover;
          cursor: pointer;
        }
        .coc input:checked::after {
          background-position: right;
        }
        .coc a {
          color: #666;
        }
        .coc a:hover {
          background-color: #666;
          text-decoration: none;
          color: #fff;
        }
        .iframe-form .coc {
          font-size: 1.1rem;
          padding-top: 1rem;
        }
        .iframe-form .coc input {
          position: relative;
          top: -0.2rem;
        }
      `}</style>
    </form>
  )
}
