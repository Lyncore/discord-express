import { Discord, Slash, SlashOption} from "discordx";
import { ApplicationCommandOptionType, CommandInteraction, User } from "discord.js";
@Discord()
export class AdminCommands{

    @Slash("report", {description: "Пожаловаться на пользователя"})
    report(
        @SlashOption("user", {description: "Пользователь", type: ApplicationCommandOptionType.User})
        user: User,
        @SlashOption("reason", {description: "Причина"})
        reason: string,
        interaction: CommandInteraction
    ){
        interaction.reply("Функция пока недуступна на этом сервере.")
    } 
    /* @SlashGroup("set")
    Set(){

    } */

}