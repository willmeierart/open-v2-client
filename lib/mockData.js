export const gallery = {
  type: 'gallery',
  id: 990909090129, // this won't be displayed
  about: 'Four loko artisan twee tbh cred brunch, gochujang live-edge asymmetrical swag flexitarian poke photo booth. Gochujang drinking vinegar meggings stumptown. Pabst lomo wolf mumblecore, bushwick cornhole YOLO. Wayfarers blog biodiesel dreamcatcher, green juice godard twee coloring book etsy man bun helvetica. Hashtag scenester distillery enamel pin humblebrag snackwave, kinfolk fanny pack yuccie migas tote bag irony.', // probably max around 300 characters or something, not sure
  cover: 'http://via.placeholder.com/400x300', // will just be the src of an img tag
  description: 'Wolf chambray kitsch sriracha normcore, mixtape yr. Schlitz whatever gluten-free hella williamsburg subway tile gastropub snackwave food truck shaman glossier dreamcatcher iPhone tbh.',
  location: '3004 Some St.',
  mission: 'Bitters YOLO tote bag stumptown unicorn roof party tilde.',
  name: 'Cool Gallery'
} // keep in mind that all of this stuff is going to be however the organization represents THEMSELVES on facebook

export const todayEvent = {
  type: 'event',
  id: 9999909090119,
  owner: 'Cool Gallery', // don't worry about displaying it
  name: 'some event happening today',
  cover: 'http://via.placeholder.com/400x300',
  description: 'Lorem ipsum dolor amet shabby chic freegan migas actually keffiyeh snackwave listicle meggings hoodie meditation tilde brunch retro small batch sriracha. Man braid ugh everyday carry iPhone microdosing cred meditation paleo twee yr gentrify swag fam gluten-free helvetica. Leggings next level butcher vexillologist tofu distillery everyday carry letterpress yr la croix hoodie kogi. Meh actually pop-up direct trade, snackwave cloud bread dreamcatcher. Pok pok cloud bread pour-over, cliche celiac actually twee. Kickstarter retro viral crucifix portland dreamcatcher health goth. Palo santo bushwick banjo cloud bread ramps prism butcher shabby chic lomo organic post-ironic health goth. YOLO umami coloring book, organic ramps mixtape 90\'s raw denim asymmetrical.',
  place: 'The Address',
  start_time: 'some start time',
  end_time: 'some end time'
}

export const futureEvent = {
  type: 'event',
  id: 9999909090119,
  owner: 'Cool Gallery', // don't worry about displaying it
  name: 'some event happening in the future',
  cover: 'http://via.placeholder.com/400x300',
  description: 'Lorem ipsum dolor amet shabby chic freegan migas actually keffiyeh snackwave listicle meggings hoodie meditation tilde brunch retro small batch sriracha. Man braid ugh everyday carry iPhone microdosing cred meditation paleo twee yr gentrify swag fam gluten-free helvetica. Leggings next level butcher vexillologist tofu distillery everyday carry letterpress yr la croix hoodie kogi. Meh actually pop-up direct trade, snackwave cloud bread dreamcatcher. Pok pok cloud bread pour-over, cliche celiac actually twee. Kickstarter retro viral crucifix portland dreamcatcher health goth. Palo santo bushwick banjo cloud bread ramps prism butcher shabby chic lomo organic post-ironic health goth. YOLO umami coloring book, organic ramps mixtape 90\'s raw denim asymmetrical.',
  place: 'The Address',
  start_time: 'some start time',
  end_time: 'some end time'
}

export const link = {
  href: 'http://extra-vitamins.com',
  name: 'extra vitamins'
}

export const actualFBoutput = [{
  'id': '248777792610992',
  'name': 'Denvers.art Tester',
  'events': {
    'data': [
      {
        'cover': {
          'offset_x': 50,
          'offset_y': 63,
          'source': 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/38469429_248784142610357_9064490089790308352_n.jpg?_nc_cat=0&oh=3fe5e3219869a45f0350291d77cb674e&oe=5C0B9147',
          'id': '248784139277024'
        },
        'end_time': '2018-08-22T20:00:00-0600',
        'id': '493252304434983',
        'description': 'First event to test pulling events from graph API. Some lorem ipsum: Lorem ipsum dolor amet shabby chic freegan migas actually keffiyeh snackwave listicle meggings hoodie meditation tilde brunch retro small batch sriracha. Man braid ugh everyday carry iPhone microdosing cred meditation paleo twee yr gentrify swag fam gluten-free helvetica. Leggings next level butcher vexillologist tofu distillery everyday carry letterpress yr la croix hoodie kogi. Meh actually pop-up direct trade, snackwave cloud bread dreamcatcher. Pok pok cloud bread pour-over, cliche celiac actually twee. Kickstarter retro viral crucifix portland dreamcatcher health goth. Palo santo bushwick banjo cloud bread ramps prism butcher shabby chic lomo organic post-ironic health goth. YOLO umami coloring book, organic ramps mixtape 90\'s raw denim asymmetrical.',
        'start_time': '2018-08-22T17:00:00-0600',
        'place': {
          'name': 'Denvers.art Tester',
          'location': {
            'city': 'Denver',
            'country': 'United States',
            'latitude': 39.754523041627,
            'longitude': -104.98732030392,
            'state': 'CO',
            'street': '2330 Broadway',
            'zip': '80205'
          },
          'id': '248777792610992'
        },
        'owner': {
          'name': 'Denvers.art Tester',
          'id': '248777792610992'
        }
      }
    ],
    'paging': {
      'cursors': {
        'before': 'QVFIUkNNRHJWbVM0ZAVlHbjhheldNekRZAcF9ySl9BLUVxaU5vV1liVm1iVVpfQnpVX0pHbnNVdzVWVllwdS1TMDZAQMGZAvX2FpNTZA6UWhBeHNDMVhxX0hqbXdn',
        'after': 'QVFIUkNNRHJWbVM0ZAVlHbjhheldNekRZAcF9ySl9BLUVxaU5vV1liVm1iVVpfQnpVX0pHbnNVdzVWVllwdS1TMDZAQMGZAvX2FpNTZA6UWhBeHNDMVhxX0hqbXdn'
      }
    }
  },
  'cover': {
    'cover_id': '248778875944217',
    'offset_x': 50,
    'offset_y': 0,
    'source': 'https://scontent.xx.fbcdn.net/v/t1.0-9/38542097_248778879277550_8076451589402918912_n.jpg?_nc_cat=0&oh=c9e717005110fa32db9bd0d3ac20698b&oe=5BCB00C9',
    'id': '248778875944217'
  },
  'about': 'This is a dummy page to test the fb graph API for the in-development denvers.art app to test pulling events from a page, since graph API restrictions are so stringent currently.',
  'location': {
    'city': 'Denver',
    'country': 'United States',
    'latitude': 39.754523041627,
    'longitude': -104.98732030392,
    'state': 'CO',
    'street': '2330 Broadway',
    'zip': '80205'
  }
}]
