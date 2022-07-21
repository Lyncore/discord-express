import { Discord, Slash, SlashOption} from "discordx";
import { CommandInteraction, User } from "discord.js";
@Discord()
export class AdminCommands{

    @Slash("report", {description: "Пожаловаться на пользователя"})
    report(
        @SlashOption("user", {description: "Пользователь", type: "USER"})
        user: User,
        @SlashOption("reason", {description: "Причина"})
        reason: string,
        interaction: CommandInteraction
    ){

    } 
    /* @SlashGroup("set")
    Set(){

    } */

}