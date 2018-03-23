import { Home } from '../components'

const tracker = props => {
  const ready = Meteor.subscribe('profiles').ready()
  if (!ready) return { ready }

  const { data } = Profiles.findOne({}, { sort: { updatedAt: -1 } })
  const profiles = JSON.parse(data)
  return { profiles }
}

export default withTracker(tracker)(Loading(Home))
