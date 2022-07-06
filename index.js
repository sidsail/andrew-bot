const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const tokens = require('./tokens.js')
const token = tokens.botToken

const userSchema = require("./schemas/user_schema")

const basicFunctions = require('./scripts/basic_functions.js');
const marketActions = require('./scripts/market.js');
const moneyGames = require('./scripts/money_games');
const discordActions = require('./scripts/discord_actions')

const prefix = 'a!';
const botId = '981826460186718208'

client.login(token);


client.once('ready', () => {
    console.log('andrew-bot is online');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        console.log(message.content);
		console.log(message.author.username)

		console.log(message.author.id)

		if (message.author.id === botId) {
			return;
		}

		//message.channel.send(`${message.author.username} says --> ${message.content}`)
		
		return;

    }

    const discordId = message.author.id

    const command = message.content.slice(prefix.length).split(" ");
    //console.log(command[0])

    switch(command[0]) {
        case "say":
            basicFunctions.say(message, command);        
            break;

        case "ping":
            basicFunctions.ping(message)
            break;

        case "testdbentry":
            var userInfo = {name: command[1], age: command[2]}
            console.log(userInfo, message)
            marketActions.testDB(message, userInfo)
            break;
        
        case "register":
            console.log(message.author.id)
            marketActions.registerNewUser(message)
            break;
        
        case "give":

            switch(command[1]) {
                case "money":
                    const amount = command[2];
                    marketActions.addMoney(discordId, amount)
                    break;
                
                case "item":
                    const item = command[2];
                    const count = command[3];
                    //marketActions.addItem(discordId, item, count);
                    break;

                case "house":
                    marketActions.addHouse(discordId, command[2], command[3]);

                    break;

                    

                default:
                    break;
            }
            break;
            
        case "inventory":
            marketActions.displayInventory(message);
            break;
        
        case "work":
            moneyGames.actionWork(message);
            break;
        
        case "crime":
            moneyGames.actionCrime(message);
            break;

        case "unregister":
            marketActions.deleteUser(message.author.id);
            message.channel.send("You have unregistered");
            break;

        case "spin": 
            moneyGames.actionDailySpin(message);
            break;
            
        case "buy":
            
            moneyGames.actionBuy(message, "houses", "singlefamily", 2)

            break;
        
        case "rpc":
            
            moneyGames.handleRockPaperScissors(message)

            break;
        

        default: 
            message.channel.send("Not a valid command! " + prefix + "help to get help");
            break;  
            
    } 
})


