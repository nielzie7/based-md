const chalk = require('chalk')
const color = (text, color) => { return !color ? chalk.cyan(text) : chalk.keyword(color)(text) }
const bgcolor = (text, bgcolor) => { return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text) }
const SuryaLog = (text, color) => { return !color ? chalk.cyan('[ NIEL ] ') + chalk.greenBright(text) : chalk.cyan('[ NIEL ] ') + chalk.keyword(color)(text) }
module.exports = { color, bgcolor, SuryaLog }
