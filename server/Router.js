// pretty simple, but this is what controls the synthetic routing

const nextRoutes = require('next-routes')
const Router = nextRoutes()

Router
	// .add('main', '/:slug', '')  // <<< transition example = this only
	// .add('home', '/:slug', '')
	// .add('us', '/:slug', '')
	// .add('work', '/:slug', '')
	// .add('services', '/:slug', '')
	// .add('converse', '/:slug', '')

	.add('index', '/')
	.add('privacy', '/privacy')
	.add('links', '/links')
	.add('info', '/info')
	.add('fb', '/facebook-review')
// .add('us', '/us')
// .add('work', '/work')
// .add('services', '/services')
// .add('converse')

// .add('us', '/us/:slug', '')
// .add('work', '/work/:slug', '')
// .add('services', '/services/:slug', '')

module.exports = Router
