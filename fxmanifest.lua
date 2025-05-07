shared_script '@fiveguard/shared_fg-obfuscated.lua'
fx_version 'cerulean'
game 'gta5'
author "Rsheng-QQ:3391407547"
lua54 'yes'

files {
    'html/index.html',
    'html/style.css',
    'html/mouse.js',
    'html/script.js',
    'html/assets/**/*'
}

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'

client_script 'client.lua'