import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { Player } from "discord-player";

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

}

export class PlayerEvents{

}