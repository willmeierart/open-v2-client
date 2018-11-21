import Head from '../components/Head'

const InfoPage = () => {
	return (
		<div>
			<Head title='Links' />
			<section className='info-page info-sec'>
				<div className='info-sec'>
					<span className='info-sec'>
						<a href='/'>Denver's.Art</a>
					</span>{' '}
					is the front page of Denver's art scene. A singular resource for presenting the best galleries and events,
					both obvious and obscure. Data sourced directly from the Facebook API on a platform designed to present
					elegantly what's going on -- where, when, here, now. No more needing to know what to 'like', who to ask, where
					to look. Welcome to Denver's Art.
				</div>
				<a className='info-sec' href='mailto:denversartscene@gmail.com'>
					Reach out if you think you'd like to be included in the project.
				</a>
			</section>
			<style jsx>{`
				.info-page {
					width: 100vw;
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background: black;
					z-index: 99999999999;
					box-sizing: border-box;
					color: white;
					font-size: 2em;
					padding: 5vw;
					 {
						/* font-family: 'Art Sans'; */
					}
				}
				.info-page div {
					margin-bottom: 1em;
					line-height: 1.25em;
				}
				.info-page a:hover,
				.info-page span:hover {
					color: var(--color-green);
					cursor: pointer;
				}
			`}</style>
		</div>
	)
}

export default InfoPage
