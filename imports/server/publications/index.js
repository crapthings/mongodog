import pretty from 'prettysize'

const DATABASE_NAME = utils.getCurrentDatabaseName()

const COLLECTION_BLACKLIST = [
  `${DATABASE_NAME}.system.profile`,
  `${DATABASE_NAME}.meteor_accounts_loginServiceConfiguration`,
]

const QUERY_BLACKLIST = {
  '' : true
}

Meteor.publish('profiles', function () {
  if (!this.userId) return this.stop()

  const selector = {
    // op: { $in: ['query', 'getmore'] },
    ns: { $nin: COLLECTION_BLACKLIST },
    'millis': { $ne: 0 },
  }

  const options = { sort: { ts: -1 } }

  Profiles.find(selector, options).forEach(profile => {
    const _id = Random.id()
    profile._id = _id
    profile.name = profile.ns.replace(`${DATABASE_NAME}.`, '')
    profile.createdAt = moment(profile.ts).format('YYYY.M.D H:m:s')
    profile.prettyResponseLength = pretty(profile.responseLength)
    profile.querystr = profile.query ? JSON.stringify(profile.query) : ''
    this.added('system.profile', _id, { data: JSON.stringify(profile) })
  })

  return this.ready()
})
