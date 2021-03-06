_ = require('lodash')
moment = require('moment')

React = require('react')
Component = React.Component
withTracker = require('meteor/react-meteor-data').withTracker
mount = require('react-mounter').mount
LoadingComp = <div>loading</div>
Loading = C => ({ ready = true, ...props }) => ready ? C(props) : LoadingComp

class hook extends Component {
  constructor({ willMount, didMount, willUnmount }) {
    super()
    this.componentWillMount = willMount
    this.componentDidMount = didMount
    this.componentWillUnmount = willUnmount
  }

  render() {
    return null
  }
}

Hook = hook
