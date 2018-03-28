import pretty from 'prettysize'

utils = {}

utils.polling = function (collection) {
  const now = new Date()

  const selector = {
  // op: { $in: ['query', 'getmore'] },
    ts: { $gte: moment(now).subtract(5, 's').toDate() },
    ns: { $nin: [/meteor_accounts_loginServiceConfiguration/, /system.profile/] },
    'millis': { $ne: 0 },
  }

  const options = { sort: { ts: -1 } }

  const profiles = collection.find(selector, options).map(profile => {
    const _id = Random.id()
    profile._id = _id
    profile.name = _.drop(profile.ns.split('.')).join('.')
    profile.createdAt = moment(profile.ts).format('YYYY.M.D H:m:s')
    profile.prettyResponseLength = pretty(profile.responseLength)
    profile.querystr = profile.query ? JSON.stringify(profile.query) : ''
    return profile
  })

  return profiles
}
