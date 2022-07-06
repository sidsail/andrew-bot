const marketActions = require('./market.js');
const marketInfo = require('../schemas/market_info');
const timeSchema = require('../schemas/time_schema');
const discordActions = require('./discord_actions');
const Discord = require('discord.js');
const userSchema = require('../schemas/user_schema')

module.exports = {

    randomNum:  function(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber

    },

    actionWork: function (message) {
        //const hours = 8;
        //const jobs = [{engineer: 100}, {pimp: 200}, {doctor: 300}, {entrepreneur: 400}, {cashier: 500}];
        const jobs = marketInfo.jobs

        var job_index = this.randomNum(0, jobs.length - 1)
        console.log(job_index)

        const job = Object.keys(jobs[job_index]);

        money_amount = jobs[job_index][job];
        
        marketActions.addMoney(message.author.id, money_amount);


        message.channel.send("You worked as a " + job + " and made " + money_amount + " dollars")
    },

    actionCrime: function (message) {
        //const crimes = [{'robbed a bank': [500, 2000]}, {'put a hit out': [3000, 5000]}]
        const crimes = marketInfo.crimes
        console.log(crimes)
        crimeChance = .50
        const num = Math.random();
        console.log(num);
        const crime_index = this.randomNum(0, crimes.length-1)
        console.log(crime_index)
        const crime = Object.keys(crimes[crime_index])
        const money_min = crimes[crime_index][crime]['min']
        const money_max = crimes[crime_index][crime]['max']
        let money_amount = this.randomNum(money_min, money_max)
        
        if (num < crimeChance) { //is crime
            money_amount = money_amount * - 1
        }

        marketActions.addMoney(message.author.id, money_amount)
        message.channel.send("You " + crime + " and made " + money_amount + " dollars")
    },

    actionBuy: function (message, field, type, count) {

        let price = null;
		if (field === "houses") {
			price = marketInfo[field][type].price;
		}

		if (field === "items") {
			price = marketInfo[field][type];
		}


        if (price === undefined || price === null) { //does not exist
            message.channel.send('does not exist') ;
            return;
        }	

		price = price * count

		const collector = new Discord.MessageCollector(message.channel, {time: 1000 * 10, max: 1});

		collector.on('collect', m => {
			message.channel.send(`You want to buy ${count} ${type}. Cost: ${price}. Cost: ${price}`)
			message.channel.send(`y to confirm, n to decline`)

		})

		collector.on('end', collected => {
			const user_action = collected.at(0).content
			console.log(user_action)
		})

		userSchema.findById(message.author.id, "money", function(err, val) {
			if (err) {
				console.log(err.message)
				return
			}
			user_money = val.money
			
	
			if (price > user_money) { //does not have the money
				message.channel.send(`You do not have the money! You need ${price}, you have ${user_money}`)
				return
			} else { //has the money

				marketActions.addTypeOfArray(message.author.id, field, type, count, val)
				marketActions.addMoney(price * -1)
				message.channel.send(`You have bought ${count} ${type}`)				


			}

		}) 
		


    },

    dailySpin: function (num) {
        //marketActions.addMoney(message.author.id, 4500);
        const spins = marketInfo.spins
        //var num = Math.random();
        //console.log(num)

        if (num < spins['newSingleFamlily']) {
            

        } 
        else if (num < spins['50000']) {
            
        }

        else if (num < spins['25000']) {
            
        }

        else if (num < spins['10000']) {
            
        } else {
            
        }
        

    },

    actionDailySpin: async function (message) {

        const discordId = message.author.id;
        const current_time = new Date().getTime();
        //const one_day = current_time + marketInfo.times.one_day
        const moneyGames = this
        timeSchema.findById(discordId, 'spin', function(err, val) {
            if (err) {
                console.log(err.message);
                return;
            }
            
            if (val === null) {
                timeSchema.create({_id: discordId, spin: current_time});
                console.log('created item');
                moneyGames.dailySpin(message);
                return;
            }

            const one_day_from_last_spin = val.spin + marketInfo.times.one_day

            if (one_day_from_last_spin > current_time) { //has not been one day
                console.log('has not been one day');
                return;
            } 
            if (one_day_from_last_spin <= current_time) { //has been one day
                moneyGames.dailySpin(message);
                return;
            }

        })

    },

    handleRockPaperScissors: async function(message) {
        if(marketActions.checkIfUserExists(message.author.id) === false) {message.channel.send('you are not registered'); return;} 

        //message.channel.send('enter your action')
        
        const win_amount = 1000
        
        const actions = ['rock', 'paper', 'scissors']; 
        const action_info = { //[beats, loses to]
            rock: ['scissors', 'paper'],
            paper: ['rock', 'scissors'],
            scissors: ['paper', 'rock']
        };

        //const bot_action = actions[this.randomNum(0, 2)];

        const bot_action = 'scissors'

        //const filter = m => m.author.id === message.author.id
        const collector = new Discord.MessageCollector(message.channel, {time: 1000 * 10, max: 1});

        
        
        collector.on('collect', m => {
           
        });

        collector.on('end', collected => {
            
            let user_action = collected.at(0).content
            
            user_action = user_action.toLowerCase();
            if (!(actions.includes(user_action))) {
                
                message.channel.send('not a command')
                return;
            };

            message.channel.send(`bot: ${bot_action}`)
            if (user_action === bot_action) {
                message.channel.send('tie');
                return;
            }

            if (user_action === action_info[bot_action][0]) { //bot beats user
                marketActions.addMoney(message.author.id, win_amount * -1)
                message.channel.send(`You lost ${win_amount} dollars`);
            
            } else {
                marketActions.addMoney(message.author.id, win_amount);
                message.channel.send(`You won ${win_amount} dollars`)
            }


        });


    }



    /*
    testSpin: function() {

        let chanceSF = 0;
        let chance50000 = 0;
        let chance25000 = 0;
        let chance10000 = 0;
        let chance5000 = 0;

        for (let i = 0; i<100; i++) {
            let num = Math.random();
            const spin = this.dailySpin(num);
            if (spin === 'newSingleFamily') {
                chanceSF += 1
            }
            if (spin === '50000') {
                chance50000 += 1
            }

            if (spin === '25000') {
                chance25000 += 1
            }
            if (spin === '10000') {
                chance10000 += 1
            }
            if (spin === '5000') {
                chance5000 += 1
            }

            console.log(chanceSF, chance50000, chance25000, chance10000, chance5000)

        }
    }
    */

}