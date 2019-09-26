import { useData } from '../../utils/hooks'

const Iframe = () => {
  const data = useData()
  const { users } = data || {}
  const { active, total } = users || {}
  const text = users ? (active ? `${active}/${total}` : total) : '-'

  return (
    <span className="slack-button">
      <a className="slack-btn" href="/" target="_blank" rel="noopener noreferrer">
        <span className="slack-ico"></span>
        <span className="slack-text">Slack</span>
      </a>
      <a className="slack-count" href="/" target="_blank" rel="noopener noreferrer">
        {text}
      </a>

      <style jsx global>{`
        body,
        html {
          background: transparent;
        }
        body {
          padding: 0;
          margin: 0;
          font: bold 11px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
          overflow: hidden;
        }
      `}</style>
      <style jsx>{`
        .slack-button {
          height: 20px;
          overflow: hidden;
          display: inline-block;
        }
        .slack-btn,
        .slack-count,
        .slack-ico {
          float: left;
        }
        .slack-btn,
        .slack-count {
          padding: 2px 5px 2px 4px;
          color: #333;
          text-decoration: none;
          text-shadow: 0 1px 0 #fff;
          white-space: nowrap;
          cursor: pointer;
          border-radius: 3px;
          transition: background-color 200ms ease-in;
        }
        .slack-btn {
          background: #eee linear-gradient(#fcfcfc, #eee) no-repeat;
          border: 1px solid #d5d5d5;
        }
        .slack-btn:hover,
        .slack-btn:focus {
          text-decoration: none;
          background: #ddd linear-gradient(#eee, #ddd);
          border-color: #ccc;
        }
        .slack-btn:active {
          background-image: none;
          background-color: #dcdcdc;
          border-color: #b5b5b5;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        .slack-ico {
          width: 14px;
          height: 14px;
          margin-right: 4px;
          background-image: url(assets/slack.svg);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .slack-count {
          position: relative;
          display: block;
          margin-left: 4px;
          background-color: #fafafa;
          border: 1px solid #d4d4d4;
        }
        .slack-count:hover,
        .slack-count:focus {
          color: #4183c4;
        }
        .slack-count:before,
        .slack-count:after {
          content: '';
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          transition: border-color 200ms ease-in;
        }
        .slack-count:before {
          top: 50%;
          left: -3px;
          margin-top: -4px;
          border-width: 4px 4px 4px 0;
          border-right-color: #fafafa;
        }
        .slack-count:after {
          top: 50%;
          left: -4px;
          z-index: -1;
          margin-top: -5px;
          border-width: 5px 5px 5px 0;
          border-right-color: #d4d4d4;
        }
        .slack-count.anim {
          background-color: yellow;
        }
        .slack-count.anim:before {
          border-right-color: yellow;
        }
      `}</style>
    </span>
  )
}

export default Iframe
