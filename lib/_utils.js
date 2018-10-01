import { mockPointerEvent } from './mockData'
import { Xs, Os } from '../components/assets/mapMarkers'

// syntactic-sugary method for this-binding react-class-methods
// use in class constructor like: 'binder(this,['method1','method2'])'
export const binder = (x, Ms) => Ms.forEach(m => (x[m] = x[m].bind(x)))

// apparently react doesn't want you to iterate over children as a simple array, this allows it.
// useful in the case of e.g. applying 'fadeColors' to
export const forEachChild = (array, callback) => {
  return Array.prototype.forEach.call(array, child => {
    callback(child)
  })
}

// takes the awkward format colors arrive in from GraphCMS and returns usable RGBA values
// (other methods left in in case API changes)
export const formatColors = (colors = []) => {
  return colors.map((each, i) => {
    const colorList = each.color.match(/\d+/g)

    let r = parseInt(colorList[0])
    let g = parseInt(colorList[1])
    let b = parseInt(colorList[2])
    let a = parseInt(colorList[3])
    return `rgba(${r},${g},${b},${a})`
  })
}

// since this is such a nice signature effect, go ahead and leave this here:
export const fadeColors = (element, colors, timing) => {
  const origColor = 'black' // element.style.color
  const randomDelay = Math.floor(Math.random() * timing) + 300
  const rD2 = Math.floor(Math.random() * (timing * 2))
  const randomColorIndex = Math.floor(Math.random() * 3)
  const interval = setInterval(() => {
    setTimeout(() => {
      element.style.color = colors[randomColorIndex]
      setTimeout(() => {
        element.style.color = origColor
      }, rD2)
    }, randomDelay)
    clearInterval(interval)
  }, 200)
}

// probably going to use something like this a lot (throw inside of position-relative container el):
export const renderGrid = (set, Component) => {
  return set.map((self, i) => {
    return (
      <div className='wrapper' key={i}>
        <Component self={self} />
        <style jsx>{`
          .wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: none;
          }
        `}</style>
      </div>
    )
  })
}

// for apollo data loading:
export const checkAllQueriesError = queries => {
  queries.forEach(query => {
    if ([query].error) {
      return <h1>¯\_(ツ)_/¯</h1>
    }
  })
}

export const FBdataTransformer = data => {
  // const eventParser = events => {}
  let transformedEvents = { today: [], upcoming: [] }
  
  const transformedGalleries = data.sort((a, b) => a.name - b.name).reduce((a, b) => {
    const body = JSON.parse(b.body)

    if (body.error) return a

    const { id, name, cover, about, location, mission, emails, description, hours, link, website, photos, general_info } = body
    let ABOUT = about && description
      ? about.length > description.length
        ? about
        : description
      : about || description
    const source = cover ? [cover.source] : []
    // const ABOUT = Math.max(about, mission, description)
    const generalInfo = general_info ? general_info : ''
    const fullAbout = `${ABOUT || ''} \n ${mission || ''} \n ${generalInfo || ''}`
    const email = emails ? emails[0] : null
    const images = photos ? photos.data.map(p => p.images[0].source) : []

    a.push({
      id,
      type: 'gallery',
      name,
      images: source.concat(images),
      about: fullAbout,
      location,
      email,
      fbLink:
      link,
      site: website
    })
    return a
  }, [])
  const retObj = {
    events: transformedEvents,
    galleries: transformedGalleries
  }
  return retObj
}

export const makeMarker = marker => {
  return marker ? {
    id: marker.id,
    name: marker.name,
    marker: {
      position: marker.coords,
      title: marker.name,
      animation: 'drop',
      onClick: (() => { console.log('clicked', marker.name) }),
      icon: { url: `/static/assets/o${Math.floor(Math.random() * 4) + 1}.svg` }
    },
    type: marker.type
  } : {}
}

export const toggleActiveMarker = (markerID, cb) => {
  cb(markerID)
}
