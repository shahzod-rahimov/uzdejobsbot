import { Context, Markup } from 'telegraf'
import { keyboards } from './keyboards.js'

export async function getMenuUzb(ctx: Context) {
  await ctx.reply("<b>Yangi e'lonlar qo'shish 👇</b>", {
    parse_mode: 'HTML',
    ...Markup.keyboard([
      ["🆕 Yangi e'lonni qo'shish"],
      ['Tilni tanlash', "Men bergan e'lonlar"],
      ['🏠 Bosh sahifa', "💁 E'lon berish tartibi"],
    ])
      .oneTime()
      .resize(),
  })
}

export async function getMenuRus(ctx: Context) {
  await ctx.reply('<b>Добавить новое объявление</b> 👇', {
    parse_mode: 'HTML',
    ...Markup.keyboard([
      ['🆕 Добавить новое объявление'],
      ['☸️ Выбор языка', 'Мои объявления'],
      ['🏠 Главная страница', '💁 Рекламная процедура'],
    ])
      .oneTime()
      .resize(),
  })
}

export async function inlineMenuElonBerish(ctx: Context, inlineElonText: string) {
  return await ctx.reply(inlineElonText, {
    parse_mode: 'HTML',
    ...keyboards['inline_menu_elon_berish'],
  })
}

export async function inlineMenuElonBerishRus(ctx: Context, inlineElonText: string) {
  return await ctx.reply(inlineElonText, {
    parse_mode: 'HTML',
    ...keyboards['inline_menu_elon_berish_rus'],
  })
}
