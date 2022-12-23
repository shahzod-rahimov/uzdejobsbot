import { Composer } from 'telegraf'
import { saveLang, selectLang } from '../libs/lang.js'
import { bot } from '../main.js'

const composer = new Composer()

composer.hears('Tilni tanlash / Выберите язык', async (ctx) => {
  await selectLang(ctx)
})

composer.hears('Tilni tanlash', async (ctx) => {
  await selectLang(ctx)
})

composer.hears('Выберите язык', async (ctx) => {
  await selectLang(ctx)
})

composer.hears("🇺🇿 O'zbek tili", async (ctx) => {
  await saveLang(ctx, 'UZB')
})

composer.hears('🇷🇺 Русский язык', async (ctx) => {
  await saveLang(ctx, 'RUS')
})

bot.use(composer.middleware())
