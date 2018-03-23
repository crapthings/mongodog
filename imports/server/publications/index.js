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

  const timerId = Meteor.setInterval(() => {
    send.call(this, polling())
    console.log('sent')
  }, 5000)

  this.onStop(() => {
    Meteor.clearInterval(timerId)
  })

  send.call(this, polling())

  return this.ready()
})

function send(data) {
  this.added('system.profile', Date.now(), { ts: Date.now(), data })
}

function polling() {
  const selector = {
  // op: { $in: ['query', 'getmore'] },
    ns: { $nin: COLLECTION_BLACKLIST },
    'millis': { $ne: 0 },
  }

  const options = { sort: { ts: -1 } }

  const profiles = Profiles.find(selector, options).map(profile => {
    const _id = Random.id()
    profile._id = _id
    profile.name = profile.ns.replace(`${DATABASE_NAME}.`, '')
    profile.createdAt = moment(profile.ts).format('YYYY.M.D H:m:s')
    profile.prettyResponseLength = pretty(profile.responseLength)
    profile.querystr = profile.query ? JSON.stringify(profile.query) : ''
    return profile
  })

  return JSON.stringify(profiles)
}
