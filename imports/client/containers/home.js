import { Home } from '../components'

const tracker = props => {
  const ready = Meteor.subscribe('profiles').ready()
  if (!ready) return { ready }

  const profiles = Profiles.find({}, { sort: { ts: -1 } }).map(profile => {
    const data = JSON.parse(profile.data)
    data.from = profile.from
    data._id = profile._id
    console.log(data._id)
    console.log(data)
    return data
  })

  return { profiles }
}

export default withTracker(tracker)(Loading(Home))
