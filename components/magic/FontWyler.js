import PropTypes from 'prop-types'
import randomBoolean from 'random-boolean'

// const isUpper = () => Math.random() * 10 < 5

const FontWyler = ({ phrase }) => {
	const splitta = phrase.split('').map((l, i) => {
		return (
			<span
				key={i}
				style={{
					textTransform:
						(i % 2 === 1 && i < phrase.length / 2) || i === phrase.length - 2 || i === phrase.length - 1
							? 'uppercase'
							: 'none',
					color: 'inherit',
					fontSize: 'inherit'
				}}
			>
				{l}
			</span>
		)
	})
	return (
		<div className='phrase-wrapper' style={{ color: 'inherit', fontSize: 'inherit' }}>
			{splitta}
		</div>
	)
}

FontWyler.propTypes = {
	phrase: PropTypes.string.isRequired
}

export default FontWyler
