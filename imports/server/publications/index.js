import pretty from 'prettysize'

const COLLECTION_BLACKLIST = [
  `${utils.getCurrentDatabaseName()}.system.profile`,
  `${utils.getCurrentDatabaseName()}.meteor_accounts_loginServiceConfiguration`,
]

const QUERY_BLACKLIST = {
  '' : true
}

Meteor.publish('profiles', function () {
  const selector = {
    // op: { $in: ['query', 'getmore'] },
    ns: { $nin: COLLECTION_BLACKLIST },
    'millis': { $ne: 0 },
  }

  const options = { sort: { ts: -1 } }

  Profiles.find(selector, options).forEach(profile => {
    const _id = Random.id()
    profile._id = _id
    profile.name = profile.ns.replace(`${utils.getCurrentDatabaseName()}.`, '')
    profile.createdAt = moment(profile.ts).format('YYYY.M.D H:m:s')
    profile.prettyResponseLength = pretty(profile.responseLength)
    this.added('system.profile', _id, { data: JSON.stringify(profile) })
  })

  return this.ready()
})
