export const gallery = {
  id: 9909090909, // this won't be displayed
  about: 'some short paragraph about the gallery', // probably max around 300 characters or something, not sure
  cover: 'https://some-hosting-site.com/some-gallery-photo-url.jpg', // will just be the src of an img tag
  description: 'for all intents and purposes same as "about", used interchangeably',
  location: 'I believe this is an address and also a lat-lng literal' CHECK,
  mission: 'kinda just like "about" and "description" if I remember correctly',
  name: 'title of gallery'
} // keep in mind that all of this stuff is going to be however the organization represents THEMSELVES on facebook

export const event = {
  id: 99999090909,
  owner: 'might even just be the id, but it refers to the gallery', // don't worry about displaying it
  name: 'some event title',
  cover: 'https://some-hosting-site.com/some-event-photo-url.jpg',
  description: 'some short description of event',
  place: 'cannot remember how this is different than owner, maybe if it is at a different address',
  start_time: 'some start time',
  end_time: 'some end time'
}
