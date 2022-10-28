const fs = require('fs')
const chalk = require('chalk')

global.ownerNumber = "6282189387018@s.whatsapp.net"
global.ownerName = "nielzie"
global.botName = "nielzie7"
global.fake = "© 2022 Copyright by nielzie7"
global.sessionName = "session"
global.thumb = fs.readFileSync('./src/neil.jpg')
global.mess = {
    success: 'Sukses',
    wait: '*_Loading..._*',
    limit: 'Maaf limit harian kamu sudah habis, beli premium untuk mendapatkan limit Unlimited, atau kamu dapat menunggu reset limit pada pukul 00.00 setiap harinya',
    error: {
        Iv: 'Link yang kamu berikan tidak valid',
        api: 'Maaf terjadi kesalahan'
    },
    group: 'Perintah ini hanya bisa digunakan di grup',
    private: 'Perintah ini hanya bisa digunakan di private message',
    admin: 'Perintah ini hanya bisa digunakan oleh Admin Grup',
    botAdmin: 'Bot Harus menjadi admin',
    owner: 'Perintah ini hanya dapat digunakan oleh owner bot',
    premium: 'Perintah ini khusus user premium'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.cyan(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
