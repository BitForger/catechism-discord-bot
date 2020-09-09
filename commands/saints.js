const fetch = require("node-fetch");
const url = "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today";

module.exports = {
  name: "!saint",
  description: "Saint of the day",
  async execute(msg, args) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      let celebrations = json.celebrations;
      let celebrationsList = celebrations.map((c) => c.title);
      if (celebrationsList.length === 1) {
        return msg.reply(
          `Today is ${celebrationsList[0]}. There are no feast days today.`
        );
      }
      let feastDays = celebrationsList.slice(1);

      if (feastDays.length === 1) {
        return msg.reply(
          `Today is ${celebrationsList[0]} and we are celebrating the Feast of ${feastDays[0]}`
        );
      }

      if (feastDays.length > 1) {
        let feastArray = feastDays.join(" and ");
        return msg.reply(
          `Today is ${celebrationsList[0]} and we are celebrating the following Feasts: ${feastArray}`
        );
      }
    } catch (error) {
      console.log(error);
      msg.reply("Sorry, something went wrong");
    }
  },
};
