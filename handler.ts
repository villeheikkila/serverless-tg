const Telegraf = require("telegraf");
import {
  hearsBulli,
  weatherHelsinki,
  unisportHours,
  calculateWilks,
  calculateIpf,
} from "./actions";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
  webhookReply: false,
});

module.exports.webhook = async (event) => {
  try {
    const body = JSON.parse(event.body);

    bot.hears("bulli", (ctx) => hearsBulli(ctx));
    bot.command("weather", async (ctx) => weatherHelsinki(ctx));
    bot.command("unisport", async (ctx) => await unisportHours(ctx));
    bot.command("wilks", (ctx) => calculateWilks(ctx));
    bot.command("ipf", (ctx) => calculateIpf(ctx));

    await bot.handleUpdate(body);
    return { statusCode: 200, body: "" };
  } catch (error) {
    return { statusCode: 500 };
  }
};
