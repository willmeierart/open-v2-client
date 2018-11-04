const SVGSurface = ({ className, view, trbl, style, children, ...other }) => (
	<div
		className={className}
		style={{
			...style,
			position: 'relative',
			width: '100%',
			height: '100%'
			// paddingBottom: `${Math.round(view[1] / view[0] * 100)}%`
		}}
		{...other}
	>
		<svg
			width={view[0]}
			height={view[1]}
			viewBox={`0 0 ${view[0]} ${view[1]}`}
			style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
		>
			{/* <g transform={`translate(${trbl[3]} ,${trbl[0]})`}>{children}</g> */}
			{children}
		</svg>
	</div>
)

export default SVGSurface
