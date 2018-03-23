import { Login, Layout } from '../components'

const tracker = props => {
  const userId = Meteor.userId()
  const ready = !Meteor.loggingIn()
  return { userId, ready }
}

export default withTracker(tracker)(Login(Layout))
