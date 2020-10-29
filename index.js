require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands/");
const url = require("./sources/chanclalibrary");

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }

  // const nickname = msg.member.Guildmember.nickname;

  // if (nickname && nickname.toLowerCase().includes("hoagie")) {
  //   let chance = Math.floor(Math.random() * 10);

  //   if (chance <= 3) {
  //     msg.react("🥪").catch((error) => console.log(error));
  //   }
  // }

  const filterWords = [
    "fuck",
    "bitch",
    "cunt",
    "dick",
    "pussy",
    "booty",
    "asshole",
    "nipples",
  ];

  const messageString = msg.content.toLowerCase();

  if (msg.content.includes("!bonk")) {
    //turn into !bonk command
    let args = msg.content.split(" ");
    let arg = args[1].toString();
    console.log(msg.channel.id);
    const channel = bot.channels.find("id", msg.channel.id);

    console.log(channel.members);
    const target = channel.members.find((mem) =>
      mem.nickname.toLowerCase().includes(arg)
    );

    if (!target || !arg) {
      return;
    }

    const lastMessage = target.lastMessage;

    if (!lastMessage) {
      return;
    }

    lastMessage
      .react(bot.emojis.get("753418611313344512"))
      .catch((error) => console.log(error));
  }

  if (messageString.includes("smite")) {
    msg.reply("Exorcizamus te!");
  }

  if (
    messageString.includes("get me a beer")
  ) {
    msg.react("🍺").catch((error) => console.log(error));
  }

  if (
    messageString.includes("thanks") &&
    messageString.includes("popebot")
  ) {
    msg.reply("You're welcome, my dude.");
  }

  for (let i = 0; i < filterWords.length; i++) {
    if (messageString.includes(filterWords[i])) {
      msg.reply("This is a Christian minecraft server.");
    }
  }

  if (messageString.includes("heresy") || messageString.includes("heretic")) {
    msg.reply("A heretic? Confess and repent!");
  }

  if (messageString.includes("bread")) {
    msg.react("🍞").catch((error) => console.log(error));
  }

  let args;
  let command;

  if (messageString.includes(":chancla:")) {
    let index = Math.floor(Math.random() * 26);
    msg.channel.send(url[index]);
  }

  if (msg.content.startsWith("+")) {
    args = msg.content.split("#");
    command = args.shift().toLowerCase().replace(/\s/g, "").toString();
  }

  if (msg.content.startsWith("!")) {
    args = msg.content.split(" ");
    command = args[0].toLowerCase().toString();
  }

  if (args === undefined) {
    args = msg.content;
    command = args.toLowerCase().replace(/\s/g, "").toString();
  }

  if (!bot.commands.has(command)) {
    return;
  }

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("Tell Tyler something broke!");
  }
});



