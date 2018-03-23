import { Home } from '../components'

const tracker = props => {
  const ready = Meteor.subscribe('profiles').ready()
  if (!ready) return { ready }

  const profiles = Profiles.find().map(({ data }) => JSON.parse(data))
  return { profiles }
}

export default withTracker(tracker)(Loading(Home))
