import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { Guild, Message, } from "discord.js";


@Discord()
export class Events {

  @On({event: "messageDelete"})
  onMessageDeleted([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Сообщение удалено", client.user?.username, message.content);
  }

  @On({event: 'error'})
  onError([message]: ArgsOf<"error">, client: Client): void{
    console.log(`Ошибка: ${message}`);
  }

  @On({ event:"guildCreate"} )
  onGuildCreate(guild: Guild){
    console.log(`Добавлен сервер: ${  guild.name}`)
  }

  /*
  @On('guildMemberAdd')
  onGuildMemberAdd(member: GuildMember){
    member.guild.systemChannel.send(`Добро пожаловать, ${member.user}! Для получения доступа к серверу ознакомься с правилами и ответь на сообщение с правилами для подтверждения.`);
   
  }
  @On('messageReactionAdd')
  onMessageCreate(reaction: MessageReaction, user: User ){
    if(user.bot){return;}
    
  } */
  onMessageCreate(message: Message){
    console.log(`Server: ${message.guild}\nChannel: ${message.channel }\nUser: ${message.author.username}\nMessage: ${message.content} `);
  }
}
