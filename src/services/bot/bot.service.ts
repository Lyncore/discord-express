import "reflect-metadata";
import { Configuration, Service } from "@tsed/di";
import {importx } from "@discordx/importer";
import {   IntentsBitField, Interaction, Message } from "discord.js";
import { Client } from "discordx";


@Service()
export class BotService{
    private bot = new Client({
        botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
        intents: [
          IntentsBitField.Flags.Guilds,
          IntentsBitField.Flags.GuildMembers,
          IntentsBitField.Flags.GuildMessages,
          IntentsBitField.Flags.GuildMessageReactions,
          IntentsBitField.Flags.GuildVoiceStates,
          IntentsBitField.Flags.MessageContent
        ],
        silent: false,
        /*simpleCommand: {
          prefix: "/",
        },*/
      });

    constructor(
       @Configuration() private configuration: Configuration
      ) {
        console.log("Music service initialised");
        this.run();
    }

    async run() {
        
        if (!process.env.BOT_TOKEN) {
          throw Error("Could not find BOT_TOKEN in your environment");
        }

        this.bot.once("ready", async () => {
          await this.bot.guilds.fetch();
          
          await this.bot.initApplicationCommands();
        
          //await this.bot.initApplicationPermissions();
        
          // To clear all guild commands, uncomment this line,
          // This is useful when moving from guild commands to global commands
          // It must only be executed once
          //
          //  await this.bot.clearApplicationCommands(
          //    ...this.bot.guilds.cache.map((g) => g.id)
          //  );
          //this.bot.user.setActivity(this.configuration.get<BotOptions>('bot').playing)

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
          
          this.bot.executeCommand(message);
        });

        await importx(`${process.cwd()  }/dist/services/bot/{events,commands}/**/*.{ts,js}`);
    
        await importx(`${__dirname   }/engine/**/*.{ts,js}`);
        
        await this.bot.login(process.env.BOT_TOKEN);
      }  
}

