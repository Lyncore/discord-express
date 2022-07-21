import "reflect-metadata";
import { Configuration, Service } from "@tsed/di";
import {importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { Intents } from "discord.js";
import { Client } from "discordx";

@Service()
export class BotService{
    private bot = new Client({
        botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
      
        intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MEMBERS,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          Intents.FLAGS.GUILD_VOICE_STATES,
        ],
      
        silent: false,
      
        simpleCommand: {
          prefix: "/",
        },
      });

    constructor(@Configuration() configuration: Configuration) {
        console.log("Music service initialised");
        this.run();
    }

    async run() {
     
      console.log(__dirname);
      console.log(process.cwd());
        await importx(`${process.cwd()  }/dist/services/bot/{events,commands}/**/*.{ts,js}`);
      
        await importx(`${__dirname   }/engine/**/*.{ts,js}`);
        
        if (!process.env.BOT_TOKEN) {
          throw Error("Could not find BOT_TOKEN in your environment");
        }

        this.bot.once("ready", async () => {
            await this.bot.guilds.fetch();
          
            await this.bot.initApplicationCommands();
          
            await this.bot.initApplicationPermissions();
          
            // To clear all guild commands, uncomment this line,
            // This is useful when moving from guild commands to global commands
            // It must only be executed once
            //
            //  await this.bot.clearApplicationCommands(
            //    ...this.bot.guilds.cache.map((g) => g.id)
            //  );
          
            console.log("Bot started");
          });
          
          this.bot.on("interactionCreate", (interaction: Interaction) => {
            if (interaction.isButton() || interaction.isSelectMenu()) {
              if (interaction.customId.startsWith("discordx@pagination@")) {
                return;
              }
            }
            this.bot.executeInteraction(interaction);
          });
          
          this.bot.on("messageCreate", (message: Message) => {
            console.log(`Server: ${message.guild}\nChannel: ${message.channel.id}\nUser: ${message.author}\nMessage: ${message.content} `);
            this.bot.executeCommand(message);
          });
       
        
      
        await this.bot.login(process.env.BOT_TOKEN);
      }  


}

