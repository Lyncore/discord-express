import { CommandInteraction, User } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

@Discord()
export class AdminCommands{

  /*  @Slash("report", {description: "Пожаловаться на пользователя"})
    report(
        @SlashOption("user", {description: "Пользователь", type: "USER"})
        user: User,
        @SlashOption("reason", {description: "Причина"})
        reason: string,
        interaction: CommandInteraction
    ){

    }*/
    @SlashGroup("set")
    Set(){

    }

}