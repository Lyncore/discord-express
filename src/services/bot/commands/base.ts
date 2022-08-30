import { Pagination, PaginationType } from "@discordx/pagination";
import { CommandInteraction, EmbedField, EmbedBuilder, MessagePayload, } from "discord.js";
import {
  MetadataStorage,
  Discord,
  Slash,
} from "discordx";
import { ExpressPagination } from "../engine";

@Discord()
export class BaseCommands {
  private commandsPerPage = 5;
  /* @Slash("hello", {description: "Приветствие пользователя"})
   async hello(
       interaction: CommandInteraction
   ): Promise<void>{
       interaction.reply(`👋 Привет, ${interaction.member}`);
   } */

  @Slash({ name: "ping",  description: "Проверка ботяры" })
  async ping(
    interaction: CommandInteraction
  ): Promise<void> { 
    interaction.reply(`Бот живой, пинг ${interaction.client.ws.ping} мс* 🛰️`);
  }

  @Slash( { name: "help", description: "Список комманд" })
  async help(
    interaction: CommandInteraction
  ): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { name: cmd.name, description: cmd.description };
    });

    const pages: EmbedBuilder[] = [];
    const count = Math.ceil(commands.length / this.commandsPerPage)
    for (let i = 1; i <= count; i++) {

      const fields: EmbedField[] = [];

      for (let j = 1; j < this.commandsPerPage + 1; j++) {
        if (j * i >= commands.length)
          break;
        const cmd = commands[i * j - 1]
        fields.push({ name: cmd.name, value: cmd.description, inline: false })
      }
      pages.push(
        new EmbedBuilder()
          .setTitle("**Список команд**")
          .addFields(fields)
          .setFooter({ text: `Страница ${i} из ${count}` })
      )
    }
    const pagination = new ExpressPagination(interaction, pages, { filter: (interact) => interact.user.id === interaction.user.id, type: PaginationType.Button });
    await pagination.send();
  }
}