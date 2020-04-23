const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (message.content === `${prefix}ping`) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}

	else if (message.content === `${prefix}server`) {
		message.channel.send(`This server's name is: ${message.guild.name}`);
	}

	else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}

	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}

	else if (command === 'color') {
		if(!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		if (!message.mentions.roles.size) {
			return message.reply('you need to mention a role to change color for!');
		}

		message.mentions.roles.first().setColor(args[1])
  	.then(updated => console.log(`Set color of role to ${updated.color}`))
  	.catch(console.error);
		message.channel.send(`Color changed to ${args[1]}`);
	}

});

client.login(token);
