import PropTypes from 'prop-types'
import randomBoolean from 'random-boolean'

const Links = ({ links }) => {
	const splitta = phrase =>
		phrase.split('').map((l, i) => {
			return (
				<span key={i}>
					{l}
					<style jsx>{`
						span {
							text-transform: ${randomBoolean() ? 'uppercase' : 'none'};
							display: inline-block;
							flex-grow: 0;
							white-space: pre;
							min-width: fit-content;
							display: inline-flex;
							width: fit-content;
						}
						span::before {
							white-space: pre;
						}
					`}</style>
				</span>
			)
		})
	const renderList = () =>
		links.map((data, i) => (
			<a key={i} className='ev-font' href={data.href} target='_blank'>
				{splitta(data.name)}
				<span className='space'> </span>
				<style jsx>{`
					a {
						font-size: 7em;
						text-decoration: none;
						color: inherit;
						white-space: pre-wrap;
						width: fit-content;
						cursor: pointer;
					}
					a:visited {
						background-color: var(--color-blue) !important;
					}
					a:hover {
						background-color: var(--color-yellow);
					}
				`}</style>
			</a>
		))
	return (
		<div className='outer-container'>
			<div className='inner-container'>{renderList()}</div>
			<style jsx>{`
        .outer-container {
          margin-top: 100px;
          background-color: var(--color-orange);
          height: calc(100vh - 100px);
          overflow: scroll;
        }
        .inner-container {
          padding: 0;
          width: 100vw;
          height: 100%;
      `}</style>
		</div>
	)
}

Links.propTypes = {
	links: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Links
