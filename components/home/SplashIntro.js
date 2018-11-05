import DaLogo from '../assets/DA_LOGO'
import DownArrow from '../assets/down-arrow'

const SplashIntro = ({ handleIntro, isMobile }) => {
	return (
		<div className='outer-container'>
			<div className='inner-container'>
				<div className='logo-wrapper'>
					<DaLogo />
				</div>
				<div className='body-text'>
					is the front page of Denver's art scene. A singular resource for presenting its <span>best events,</span> both
					obvious and obscure. Data sourced directly from the Facebook API on a platform designed to present elegantly
					what's going on where, when – <span>here, now.</span> No more needing to know what to 'like', who to ask,
					where to look. Welcome to Denver's Art.
				</div>
				<div onClick={handleIntro} className='arrow'>
					<DownArrow color='var(--color-orange)' />
				</div>
			</div>
			<style jsx>{`
				.outer-container {
					width: 100vw;
					height: 100vh;
					background-color: var(--color-lightblue);
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.inner-container {
					width: ${isMobile ? '85%' : '70%'};
				}
				.logo-wrapper {
					background-color: var(--color-orange);
					display: inline-block;
					padding: .33em .66em;
					margin-right: .66em;
				}
				.body-text {
					display: inline;
					font-size: ${isMobile ? '5vw' : '2.5vw'};
				}
				.body-text span {
					background-color: var(--color-orange);
					padding: 0 .125em;
				}
				.arrow {
					display: inline;
					position: absolute;
					left: 90%;
					cursor: pointer;
				}
			`}</style>
		</div>
	)
}

export default SplashIntro
