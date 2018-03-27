import { Home } from '../components'

const tracker = props => {
  const ready = Meteor.subscribe('profiles').ready()
  if (!ready) return { ready }

  const profiles = Profiles.find({}, { sort: { ts: -1 } }).map(profile => {
    profile.data = JSON.parse(profile.data)
    return profile
  })

  return { profiles }
}

export default withTracker(tracker)(Loading(Home))
