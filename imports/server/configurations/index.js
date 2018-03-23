const { MongoClient } = require('mongodb')

async function setProfilingLevel() {
  const { _primary, db: { s: { databaseName } } } = MongoInternals.defaultRemoteCollectionDriver().mongo
  const url = `mongodb://${_primary}`
  const client = await MongoClient.connect(url)
  const db = client.db(databaseName)
  // db.setProfilingLevel('all', -1)
  db.setProfilingLevel('all')
}

setProfilingLevel()
