//const { Message } = require('discord.js');
const mongoose = require('mongoose');
//const { findById } = require('../schemas/test_schema.js');
//const tokens = require('../tokens.js')
//const dbURI = tokens.dbURI

const config = require('../config.js')
const dbURI = config.dbURI

const test_user = require('../schemas/test_schema.js');
const userSchema = require('../schemas/user_schema');
const marketInfo = require('../schemas/market_info');


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to database'))


module.exports = {
    /*
    checkCommandValidity: function(err, val, count, item, money) {
        if (err) {
            console.log('error', err.message)
            return
        }
        if (val === null) {
            console.log('not registered')
            return
        }
        if (item === undefined) {
            console.log('not valid command')
            return
        }
        if (isNaN(count)) {
            console.log('not a number')
        }

    },
    */

    addTypeOfArray: async function(id, field, type, count0, val) {
        //field either items or houses for now (others can be added)

 

        if (val === null) {
            console.log('use the register command to register');
            return;
        }

        if (type === undefined || type === null) {
            return;
        }

        if (isNaN(count0) && !(count0 === undefined)) {
            console.log('not a number');
            return;
        }

        type = type.toLowerCase()
        let count = Number(count0)
        
        if (count0 === undefined) {
            count = 1;
        }
 
        let array = val[field]
        for (ele of array) {
            if (type in ele) {
                ele[type] += count;

                if (ele[type] === 0) {
                    const index = array.indexOf(ele);
                    array.splice(index, 1);
                }

                const tempObj = {};
                tempObj[field] = array;
                console.log(tempObj)
                await userSchema.updateOne({_id: id}, tempObj);
                return;
            }
        }
        let newObj = {};
        newObj[type] = count;
        array.push(newObj);
        const tempObj = {};
        tempObj[field] = array;
        console.log(tempObj)
        await userSchema.updateOne({_id: id}, tempObj)

    },

    test: async function(discId) {
        const marketActions = this
        userSchema.findById(discId, function(err, val) {
            if (err) {
                console.log(err.message);
                return;
            }

            marketActions.addTypeOfArray(discId, 'houses', 'singlefamily', val, 4)


        })

    },

    testDB: async function(message, userInfo) {
        //console.log(typeof userInfo.name, isNaN(userInfo.age))
        try {
            const newTestUser = await test_user.create(userInfo)
            console.log(newTestUser, 'User Saved');
            message.channel.send('User Saved');
        } catch(err) {
            //console.log(err.message)
            message.channel.send('failed! format: <name> <age>');
            console.log('user save failed');
        }
    },

    registerNewUser: async function(message) {
        const discordId = message.author.id;
        const isUser = await userSchema.findById(discordId);
        //console.log(isUser)
        if (!(isUser === null)) {
            message.channel.send('You are already registered!');
            return
        } 
        try {
            const info = {
                _id: discordId,
                money: 0,
                items: [],
                houses: []
            };
            await userSchema.create(info);
            //console.log(newUser, 'User Registered');
            message.channel.send('User ' + discordId + ' Registered');
            console.log(info);
        }
        catch(err){
            console.log(err.message);
        }
    },

    addItem: async function(id, item, count0) {
        const marketActions = this
        
        
        userSchema.findById(id, 'items', async function (err, val) {

            if (err) {
                console.log(err.message)
            }

            marketActions.addTypeOfArray(id, 'items', item, count0, val)



        })
    },

    addHouse: async function(id, type, count0) {
        const marketActions = this
        userSchema.findById(id, 'money houses', async function(err, val) {
            
            if (err) {
                console.log(err.message);
            }  
            /*
            const price = marketInfo.houses[type].price;

            if (val.money < price) { //cant afford
                console.log('false')
                return false;
            }
            */

            await marketActions.addTypeOfArray(id, 'houses', type, count0, val);
            //await marketActions.addMoney(id, price * -1)
            console.log('done')


            
        })
    },


    addMoney: async function(id, amount0) {

        userSchema.findById(id, 'money', async function (err, val) {
            if (err) {
                console.log('error', err.message);
                return;
            }
            if (val === null) {
                console.log('use the register command to reigster');
                return false;
            }
            if (amount0 === undefined) {
                console.log('command not valid');
                return;
            }
            if (isNaN(amount0)) {
                console.log('not a number');
                return;
            }
            const amount = Number(amount0);
            let moneyVal = val.money;
            moneyVal += amount;
            if (moneyVal < 0) {
                moneyVal = 0
            }
            await userSchema.updateOne({_id: id}, {money: moneyVal});
            console.log(moneyVal);

        })
    },

    displayInventory: function(message) {
        userSchema.findById(message.author.id, function (err, val) {
            if (err) {
                console.log(err.message);
                return;
            }

            if (val === null) {
                console.log('use the register command to register');
                return;
                
            }
            
            //let displayedInv = {};
            //displayedInv['money'] = val.money;
            //displayedInv['items'] = val.items;
            //console.log(displayedInv);
            console.log(val)
            //message.channel.send(displayedInv.toString())
        })
    },

    deleteUser: async function(id) {
        await userSchema.deleteOne({_id: id})
        console.log('deleted user')
    },

    checkIfUserExists: function(id) {
        userSchema.countDocuments({_id: id}, function(err, count) {
            if (err) {
                console.log(err);
                return;
            };

            if (count === 0) {return true} else {return false}
        })
    }

}