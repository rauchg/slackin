export default function InviteForm({ iframe, channels, coc }) {
  return (
    <form className={iframe ? 'iframe-form' : null}>
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
      />

      {coc && (
        <div className="coc">
          <label>
            <input type="checkbox" name="coc" value="1" />I agree to the{' '}
            <a href={coc} target="_blank" rel="noopener noreferrer">
              Code of Conduct
            </a>
            .
          </label>
        </div>
      )}

      <button>Get my Invite</button>

      <style jsx>{`
        .iframe-form button,
        .iframe-form .form-item {
          height: 2.8rem
          line-height: 2.8rem;
          padding: 0;
          font-size: 1.1rem;
        }
        .select {
          background: none;
        }
        input {
          color: #9B9B9B;
          border: 0.1rem solid #D6D6D6;
        }
        input:focus {
          color: #666;
          border-color: #999;
          outline: 0;
        }
        button, .form-item {
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
          background: #E01563;
          text-transform: uppercase;
          cursor: pointer;
          appearence: none;
          outline: 0;
          transition: background-color 150ms ease-in, color 150ms ease-in;
        }
        button.loading {
          pointer-events: none;
        }
        button:disabled {
          color: #9B9B9B;
          background-color: #D6D6D6;
          cursor: default;
          pointer-events: none;
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
