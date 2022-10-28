//based
require('./config')
const { proto, getContentType } = require('@adiwajshing/baileys')
const { getGroupAdmins, parseMention, runtime, monospace, fetchJson } = require('./lib/myfunc.js')
const { color, bgcolor } = require('./lib/color')
const fs = require('fs')
const axios = require("axios").default
const chalk = require('chalk')
const { get } = require('http')

module.exports = async (client, m, msg) => {
    try {
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return
        const pushname = msg.pushName || 'name not detected'
        const type = getContentType(msg.message)
        const content = JSON.stringify(msg.message)
        const from = msg.key.remoteJid
        const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
        const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
        const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(' ')
        const isGroup = from.endsWith('@g.us')
        const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
        const sender = msg.key.fromMe ? (client.user.id.split(':')[0] + '@s.whatsapp.net' || client.user.id) : (msg.key.participant || msg.key.remoteJid)
        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender)
        const senderNumber = sender.split('@')[0]
        const isBot = botNumber.includes(senderNumber)
        const isOwner = ownerNumber.includes(senderNumber) || isBot

        function mentions(teks, mems = [], id) {
            if (id == null || id == undefined || id == false) {
                let res = client.sendMessage(from, { text: teks, mentions: mems })
                return res
            } else {
                let res = client.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }

        const reply = async (teks) => { await client.sendMessage(from, { contextInfo: { externalAdReply: { showAdAttribution: true, title: `Hallo ${pushname}`, body: fake, previewType: 'PHOTO', thumbnail: thumb, sourceUrl: `https://wa.me/${ownerNumber}?text=Hai%20bang` } }, text: teks, mentions: parseMention(teks) }, { quoted: msg }) }
        const replyf = async (id, teks, quoted) => { await client.sendMessage(id, { contextInfo: { externalAdReply: { showAdAttribution: true, title: `Hallo ${pushname}`, body: fake, previewType: 'PHOTO', thumbnail: thumb, sourceUrl: `https://wa.me/${ownerNumber}?text=Hai%20bang` } }, text: teks, mentions: parseMention(teks) }, { quoted: quoted }) }

        const sendButMessage = (id, text1, footer1, but = [], options = {}) => {
            const buttonMessage = { text: text1, footer: footer1, buttons: but, headerType: 1 }
            client.sendMessage(id, buttonMessage, options)
        }

        const sendButTemplate = (id, text1, footer1, but = [], options = {}) => {
            const templateMessage = { text: text1, footer: footer1, templateButtons: but }
            client.sendMessage(id, templateMessage, options)
        }

        const sendList = (id, text1, footer1, title1, buttonText1, sec = [], sender, quoted) => {
            const listMessage = { text: text1, footer: footer1, title: title1, buttonText: buttonText1, mentions: [sender], sections: sec }
            client.sendMessage(id, listMessage, { quoted: quoted })
        }

        const sendRacMessage = (id, text1 = {}) => {
            const reactionMessage = { react: { text: text1, key: msg.key } }
            client.sendMessage(id, reactionMessage)
        }

        switch (command) {
            case 'runtime':
                reply('*Oke Active! Runtime :*\n' + monospace(`${runtime(process.uptime())}`))
                break
            case 'menu':
                sendButMessage(from,
                    'Nielzie7 Bot Wa,\nMade With Javacript And Baileys Lib',
                    `@ 2022 By Nielzie7\nRuntime: ${runtime(process.uptime())}`,
                    [{
                        buttonId: `${prefix}about`,
                        buttonText: { displayText: 'About' },
                        type: 1
                    }],
                    { quoted: msg })
                break
            case "about":
                reply('Nielzie7 Bot, \nmade with javascript and baileys lib\n\nGithub: https://github.com/nielzie7/')
                break
            case "neko": {
                waifud = await axios.get('https://waifu.pics/api/sfw/neko')
                client.sendMessage(from, { image: { url: waifud.data.url }, caption: 'Done!' }, { quoted: msg })
            }
                break
            case "waifu": {
                reply('Wait!')
                let waifu = JSON.parse(fs.readFileSync("./lib/database/waifu.json"))
                let waifuimg = waifu[Math.floor(Math.random() * waifu.length)]
                let buttons = [{ buttonId: `.${command}`, buttonText: { displayText: "Next!" }, type: 1 }]
                let buttonMessage = {
                    image: { url: waifuimg },
                    caption: `Delay 5 Detik, Jangan Spam Button`,
                    footer: `© 2022 Nielzie7\nRuntime ${runtime(process.uptime())}`,
                    buttons: buttons,
                    headerType: 4
                }
                client.sendMessage(from, buttonMessage, { quoted: msg })
            }
                break;
            default:
        }
    } catch (e) {
        e = String(e)
        if (!e.includes("this.isZero")) {
            if (!e.includes("Cannot read property 'conversation' of null")) {
                if (!e.includes("Cannot read property 'contextInfo' of undefined")) {
                    if (!e.includes("Cannot set property 'mtype' of undefined")) {
                        if (!e.includes("jid is not defined")) {
                            if (e.includes("rate-overlimit")) {
                                if (e.includes("Connection Closed")) {
                                    if (e.includes("Timed Out")) {
                                        console.log(color('|ERROR|', 'red'), color(e, 'cyan'))
                                        client.sendMessage(ownerNumber, { text: e })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}