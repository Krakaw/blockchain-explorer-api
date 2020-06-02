const cron = require('node-cron')
const sync = require('./sync')
const options = { scheduled: true }

const schedule = () => {
  // Sync constants only needs to happen on load
  sync.syncConstants()
  console.log('Starting Cron', 'Sync Blocks and Headers')
  // Check every 2 minutes for new blocks and headers
  cron.schedule('*/2 * * * *', () => {
    sync.syncBlocks()
    sync.syncDifficulties()
  }, options)
  return cron
}
module.exports = {
  cron,
  schedule
}
