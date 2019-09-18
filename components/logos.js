const Logos = ({ logo }) => (
  <div className="logos">
    {logo && <div className="logo org"></div>}
    <div className="logo slack"></div>

    <style jsx>{`
      .logos {
        position: relative;
        margin-bottom: 4rem;
      }
      .logo {
        width: 4.8rem;
        height: 4.8rem;
        display: inline-block;
        background-size: cover;
      }
      .slack {
        background-image: url(assets/slack.svg);
      }
      .org {
        background-image: ${logo ? `url(${logo})` : 'none'};
        margin-right: 7rem;
      }
      .org::after {
        position: absolute;
        display: block;
        content: '+';
        top: 1.5rem;
        left: 0;
        width: 30rem;
        text-align: center;
        color: #d6d6d6;
        font-size: 1.5rem;
        font-family: 'Helvetica Neue';
      }
    `}</style>
  </div>
)

export default Logos
