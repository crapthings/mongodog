import { Home } from '../components'

const tracker = props => {
  const ready = Meteor.subscribe('profiles').ready()
  if (!ready) return { ready }

  const profiles = Profiles.find().fetch()
  const users = Users.find().fetch()
  console.log(users)
  return { profiles, users }
}

export default withTracker(tracker)(Loading(Home))
