module.exports = {
    say: function(message, command) {
        console.log(command)
        var number_times = command[2]
            if (command.length === 2) {
                number_times = 1;
            }
            for (i = 0; i < number_times; i++) {
                message.channel.send(command[1]);
            }
    },

    ping: function(message) {
        message.channel.send('pong')
    }
}