const Discord = require('discord.js')

module.exports = {

    oneMessageCollector: function(message) {


        const collector = new Discord.MessageCollector(message.channel, {time: 1000 * 10, max: 1})

        collector.on('collect', m => {
            //console.log(m.content);
        });

        collector.on('end', collected => {
            //console.log(`Collected ${collected.size} items`);
            console.log(collected.at(0).content)
            const user_message = collected.at(0).content

            return user_message
        });

    }


}