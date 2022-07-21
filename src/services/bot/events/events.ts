import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { Guild,} from "discord.js";

@Discord()
export class Events {
  @On("messageDelete")
  onMessageDeleted([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Сообщение удалено", client.user?.username, message.content);
  }

  @On('error')
  onError([message]: ArgsOf<"error">, client: Client): void{
    console.log(`Ошибка: ${message}`);
  }

  @On('ready')
  onReady([message]: ArgsOf<"ready">, client: Client): void{
    client.user?.setActivity("/help");
  }

  @On("guildCreate")
  onGuildCreate(guild: Guild){
    console.log(`Добавлен сервер: ${  guild.name}`)
  }/*
  @On('guildMemberAdd')
  onGuildMemberAdd(member: GuildMember){
    member.guild.systemChannel.send(`Добро пожаловать, ${member.user}! Для получения доступа к серверу ознакомься с правилами и ответь на сообщение с правилами для подтверждения.`);
   
  }
  @On('messageReactionAdd')
  onMessageCreate(reaction: MessageReaction, user: User ){
    if(user.bot){return;}
    
  } */
}
