import Link from 'next/link'

const Header = ({ needsFbApproval }) => (
  <div className='header-outer'>
    <div className='header-inner'>
      { needsFbApproval && <div className='fb-notice'>
        <Link href='/fb'>
          <a>If you are with the Facebook Privacy Policy Auditing Team, please click here</a>
        </Link>
      </div> }
    </div>
    <style jsx>{`
      .header-inner {
        width: 100vw;
        height: 50px;
        background: red;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.5em;
        color: white;
        border-bottom: 1px solid red;
      }
      .header-inner:hover {
        background: white;
        color: red;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Header
