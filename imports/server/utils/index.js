utils = {}

utils.getCurrentDatabaseName = function () {
  const { db: { s: { databaseName } } } = MongoInternals.defaultRemoteCollectionDriver().mongo
  return databaseName
}
