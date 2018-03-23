import {
  Layout,
  Home,
} from './containers'

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      children: () => <Home />
    })
  }
})
