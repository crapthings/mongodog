Meteor.publish('profiles', function () {
  Profiles.find().forEach(profile => {
    const _id = Random.id()
    profile._id = _id
    this.added('system.profile', _id, profile)
  })
  return this.ready()
})
