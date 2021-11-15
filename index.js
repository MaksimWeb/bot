const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require('./options')

const token = "2104006500:AAGZFkhHEdngYlPgkHX82X-wNbNCYLf2P9g";

const bot = new TelegramApi(token, { polling: true });

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен её отгадать')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное привествие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/game", description: "Начать игру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/dc7/a36/dc7a3659-1457-4506-9294-0d28f529bb0a/2.webp"
      );
      return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Максима`);
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }

    if (text === '/game') {
      return startGame(chatId)
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю');

    console.log(msg);
  });


  bot.on('callback_query', async msg => {
      console.log(msg)
      const data = msg.data;
      const chatId = msg.message.chat.id;
      if (data === '/again') {
          startGame(chatId)
      }
      if(Number(data) === chats[chatId]) {
          return await bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]}`, againOptions)
      }
      else {
          return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
      }

  })
};

start();
