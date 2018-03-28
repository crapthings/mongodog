import config from '/config.js'

if (_.isEmpty(_.get(config, 'mongos'))) throw new Meteor.Error('require mongos url')

const { mongos } = config

const INTERVAL = 5000

RemoteProfiles = _.map(mongos, ({ name, url }) => {
  const _driver = new MongoInternals.RemoteCollectionDriver(process.env.REMOTE_MONGO_URL)
  const collection = new Mongo.Collection('system.profile', { _driver, _suppressSameNameError: true })
  return { name, collection }
})

_.each(RemoteProfiles, ({ name: from, collection }) => {
  Meteor.setInterval(() => {
    const profiles = utils.polling(collection)
    if (_.isEmpty(profiles)) return
    _.each(profiles, profile => {
      Profiles.insert({ from, ts: Date.now(), data: JSON.stringify(profile) })
    })
  }, INTERVAL)
})

//
