_ = require('lodash')
moment = require('moment')

Profiles = new Mongo.Collection('system.profile')
Users = Meteor.users

if (Meteor.isClient) {
  React = require('react')
  Component = React.Component
  withTracker = require('meteor/react-meteor-data').withTracker
  mount = require('react-mounter').mount
  Loading = C => ({ ready = true, ...props }) => ready ? C(props) : <div>loading</div>
}
