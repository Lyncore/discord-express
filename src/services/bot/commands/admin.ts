import { Discord, Slash, SlashOption} from "discordx";
import { ApplicationCommandOptionType, CommandInteraction, User } from "discord.js";

@Discord()
export class AdminCommands{

    @Slash( {name: "report",description: "Пожаловаться на пользователя"})
    report(
        @SlashOption({name: "user",description: "Пользователь", type: ApplicationCommandOptionType.User})
        user: User,
        @SlashOption( {name:"reason", description: "Причина"})
        reason: string,
        interaction: CommandInteraction
    ){
        interaction.reply("Функция пока недуступна на этом сервере.")
    } 
    /* @SlashGroup("set")
    Set(){

    } */

}