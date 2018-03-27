import config from '/config.js'
import { polling } from './utils'

if (_.isEmpty(_.get(config, 'mongos'))) throw new Meteor.Error('require mongos url')

Users = Meteor.users
Profiles = new Mongo.Collection('profiles')

if (Meteor.isServer) {
  const { mongos } = config
  RemoteProfiles = _.map(mongos, ({ name, url }) => {
    const _driver = new MongoInternals.RemoteCollectionDriver(process.env.REMOTE_MONGO_URL)
    const collection = new Mongo.Collection('system.profile', { _driver, _suppressSameNameError: true })
    return { name, collection }
  })

  const selector = {
  // op: { $in: ['query', 'getmore'] },
    ns: { $nin: [/meteor_accounts_loginServiceConfiguration/, /system.profile/] },
    'millis': { $ne: 0 },
  }

  const options = { sort: { ts: -1 } }

  _.each(RemoteProfiles, ({ name: from, collection }) => {
    collection.find(selector, options).observe({
      added: (doc) => {
        console.log(doc)
      }
    })

    // Meteor.setInterval(() => {
      // const profiles = polling(collection)
      // if (_.isEmpty(profiles)) return
      // Profiles.insert({ from, ts: Date.now(), data: JSON.stringify(profiles) })
    // }, 5000)
  })
}

//
