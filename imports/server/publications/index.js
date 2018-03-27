Meteor.publish('profiles', function () {
  if (!this.userId) return this.stop()
  return Profiles.find({}, { sort: { ns: -1 }, limit: 50 })
})
