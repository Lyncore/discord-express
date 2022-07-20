import { Pagination } from "@discordx/pagination";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import { MetadataStorage, SlashGroup ,
  Discord,
  Slash,
} from "discordx";


@Discord()
export class BaseCommands{
 
   /* @Slash("hello", {description: "Приветствие пользователя"})
    async hello(
        interaction: CommandInteraction
    ): Promise<void>{
        interaction.reply(`👋 Привет, ${interaction.member}`);
    }*/

    @Slash("ping", {description: "Проверка ботяры"})
    async ping(
        interaction: CommandInteraction
    ): Promise<void>{
        
        interaction.reply(`Бот живой, пинг ${interaction.client.ws.ping} мс* 🛰️`);
    }

    @Slash("help", {description: "Список комманд"})
    async help(
        interaction: CommandInteraction
    ):Promise<void>{
        const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
            return { name: cmd.name, description: cmd.description };
          });
      
          const pages = commands.map((cmd, i) => {
            return new MessageEmbed()
              .setFooter({ text: `Страница ${i + 1} из ${commands.length}` })
              .setTitle("**Информация**")
              .addField("Команда", cmd.name)
              .addField("Описание", cmd.description);
          });
      
          const pagination = new Pagination(interaction, pages);
          await pagination.send();
    }
}