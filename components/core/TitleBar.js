import Link from 'next/link'
import MarqueeHeader from './MarqueeHeader'
import DaLogo from '../assets/DA_LOGO'

const TitleBar = ({ url, isHovered, title, handleClick }) => {
  console.log(url)
  return (
    <div className='header-outer'>
      <div className='header-inner'>
        { isHovered
          ? <div className='menu-bar'>
            <div className='logo-wrapper'>
              <DaLogo />
            </div>
            <div className='links-wrapper'>
              <div onClick={() => { handleClick('events') }} className='events-link link'>events</div>
              <div onClick={() => { handleClick('galleries') }} className='galleries-link link'>galleries</div>
              <div onClick={() => { handleClick('links') }} className='links-link link'>links</div>
            </div>
          </div>
          : <MarqueeHeader title={title} />
        }
      </div>
      <style jsx>{`
        .header-outer {
          width: 100vw;
          height: 60px;
          background-color: black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .header-inner {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .link {
          color: var(--color-lightblue);
        }
        .menu-bar {
          font-family: 'Art Sans'
        }
      `}</style>
    </div>
  )
}

export default TitleBar
