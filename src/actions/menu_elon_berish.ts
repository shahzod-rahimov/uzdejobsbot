import { User } from '../models/user.model.js'
import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { getMenuRus, getMenuUzb, inlineMenuElonBerish, inlineMenuElonBerishRus } from '../libs/menu_elon.js'

const composer = new Composer()

composer.hears("📣 E'lon berish", async (ctx) => {
  const user_id = ctx.from.id
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Botga "/start" tugmasi orqali qayta kiring`)
    } else {
      if ((user.dataValues.phone_number = '' || user.dataValues.phone_number == null)) {
        await ctx.reply(`Iltimos, <b>"Telefon raqimini yuborish"</b> tugmasini bosing! 👇`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('📱 Telefon raqamini yuborish'), '🏠 Bosh sahifa']])
            .oneTime()
            .resize(),
        })
      } else {
        getMenuUzb(ctx)
      }
    }
  })
})

composer.hears('📣 Подать объявление', async (ctx) => {
  const user_id = ctx.from.id
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Повторно войти в бот через "/start"`)
    } else {
      if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
        await ctx.reply(`Нажмите кнопку <b>Отправить номер телефона</b> 👇`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('📱 Отправить номер телефона'), '🏠 Главная страница']])
            .oneTime()
            .resize(),
        })
      } else {
        getMenuRus(ctx)
      }
    }
  })
})

composer.hears("🆕 Yangi e'lonni qo'shish", async (ctx) => {
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  getMenuUzb(ctx)
  await inlineMenuElonBerish(ctx, `<b>Yangi e'lon qo'shish uchun quyidabilardan birini tanlang</b>`)
})

composer.hears('🆕 Добавить новое объявление', async (ctx) => {
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  getMenuRus(ctx)
  await inlineMenuElonBerishRus(ctx, `<b>Выберите нужный раздел, чтобы добавить новую объявлению:</b>`)
})

bot.use(composer.middleware())
