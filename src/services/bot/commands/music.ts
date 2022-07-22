
import { fromMS, regexPlaylist, toMS } from "@/utils";
import { AudioResource } from "@discordjs/voice";
import { CommonTrack, Queue} from "@discordx/music";
import { Client, CommandInteraction, Guild, GuildMember,TextBasedChannel } from "discord.js";
import { ArgsOf, On, SlashOption ,
  Discord,
  Slash,

} from "discordx";
import { ExpressPlayer, ExpressQueue } from "../engine";

@Discord()
export class MusicCommands{
  player: ExpressPlayer;

  channel: TextBasedChannel | undefined;

  @On("voiceStateUpdate")
  voiceUpdate(
    [oldState, newState]: ArgsOf<"voiceStateUpdate">,
    // client: Client
  ): void {
    const queue = this.player.getQueue(oldState.guild)

    if (
      !queue.isReady ||
      !queue.voiceChannelId ||
      (oldState.channelId !== queue.voiceChannelId &&
        newState.channelId !== queue.voiceChannelId) 
    ) {
      return;
    } 

    const channel =
      oldState.channelId === queue.voiceChannelId
        ? oldState.channel
        : newState.channel;

    if (!channel) {
      return;
    }

    const totalMembers = channel.members.filter((m) => !m.user.bot);

    if (totalMembers.size === 0) {
      if(!queue.isPause){ 
        queue.pause();
        queue.channel.send( `Все участники покинули голосовой чат, воспроизведение приостановлено.`);
      }

      if (queue.timeoutTimer) {
        clearTimeout(queue.timeoutTimer);
      }

      queue.timeoutTimer = setTimeout(() => {
        queue.channel?.send(
          "Бот покинул чат, плейлист очищен."
        );
        queue.leave();
      }, 5 * 60 * 1000);
    } else if (oldState.channel.members.filter((m)=> !m.user.bot).size === 0 
    && newState.channel.members.filter((m)=> !m.user.bot).size > 0
    && queue.tracks.length != 0) {

      if (queue.timeoutTimer) {
        clearTimeout(queue.timeoutTimer);
        queue.timeoutTimer = undefined;
      }
      // queue.resume();
      queue.channel.send(
        "Вы снова вернулись - можете продолжить воспроизведение текущего плейлиста 🎶"
      );
    }
  }

  constructor(){
    this.player = new ExpressPlayer();
  }
  
  @Slash("play", { description: "Добавить трек в очередь" })
  async play(
    @SlashOption("song", { description: "Название или ссылка" })
    songName: string,
    interaction: CommandInteraction,
    client: Client
  ): Promise<void> {
    // await interaction.deferReply();
    
    const queue = await this.processJoin(interaction, client)
    if(!queue) return;
    if(queue.timeoutTimer){
      clearTimeout(queue.timeoutTimer);
      queue.timeoutTimer = undefined;
    }
    
    console.log(songName)


    const status = await queue.play(songName);
    if (!status) {
      interaction.followUp("Трек не найден(");
    } else {
      interaction.followUp(`Добавляю трек ${songName}...`); 
    }
    /*if(regexPlaylist.test(songName)){
      const status = await queue.playlist(songName);
      if (!status) {
        interaction.followUp("Плейлист не найден(");
      } else {
        interaction.followUp(`Добавляю трек ${songName} и ещё ${status.length-1} треков...`); 
      }
    } else {
      const status = await queue.play(songName);
      if (!status) {
        interaction.followUp("Трек не найден(");
      } else {
        interaction.followUp(`Добавляю трек ${songName}...`); 
      }
    }*/
  }

  @Slash("now", {description: "Что играет?"})
  now(
    interaction: CommandInteraction
  ): void{
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }
    const { queue } = validate;

    interaction.reply(`Сейчас играет: ${queue.currentTrack.metadata.title}\n
    Время: ${fromMS(queue.currentTrack.playbackDuration)}\n
    Всего: ${fromMS(this.playbackMilliseconds(queue.currentTrack))}`)
  }

  @Slash("pause", { description: "Пауза" })
  pause(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    if (queue.isPause) {
      interaction.reply("Уже на паузе");
      return;
    }

    queue.pause() ? interaction.reply("Воспроизведение приостановлено") : interaction.reply("Музыки нет...") ;
  }

  @Slash("resume", { description: "Продолжить" })
  resume(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    if (queue.isPlaying) {
      interaction.reply("Уже воспроизводится");
      return;
    }

    queue.resume() ? interaction.reply("Воспроизведение продолжено") : interaction.reply("Музыки нет...");
  }

  @Slash("skip", { description: "Пропустить трек" })
  skip(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;
    if(queue.size === 0){
      interaction.reply(`Очередь уже пуста`);
      return;
    }

    queue.skip() ? interaction.reply(`Трек ${queue.currentTrack.metadata.title} пропущен`) : interaction.reply("Музыки нет...");
  }

  @Slash("stop", { description: "Остановить музыку" })
  leave(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;
  
    queue.leave();
    interaction.reply("Плейлист сброшен, бот покинул чат...");
  }

  playbackMilliseconds(track: AudioResource<CommonTrack>): number {

    if (
      !track ||
      !track.metadata.isYoutubeTrack() ||
      !track.metadata.info.duration
    ) {
      return 0;
    }

    return toMS(track.metadata.info.duration);
  }


  async processJoin(
    interaction: CommandInteraction,
    client: Client
  ): Promise<ExpressQueue | undefined> {
    if (
      !interaction.guild ||
      !interaction.channel ||
      !(interaction.member instanceof GuildMember)
    ) {
      interaction.reply(
        "Невозможно обработать запрос, повторите позже"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      interaction.reply("Вы не находитесь в голосовом чате");

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    await interaction.deferReply();
    const queue = this.player.getQueue(interaction.guild, interaction.channel);

    if (!queue.isReady) {
      queue.channel = interaction.channel;
      // this.channel = interaction.channel ?? undefined;
      await queue.join(interaction.member.voice.channel);
    } else if(queue.voiceChannelId != interaction.member.voice.channel.id){
      interaction.followUp("Бот находится в другом голосовом чате");
      return;
    }

    return queue;
  }


  validateInteraction(
    interaction: CommandInteraction
  ): undefined | { guild: Guild; member: GuildMember; queue: Queue } {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) {
      interaction.reply("Невозможно обработать запрос");
      return;
    }

    if (!interaction.member.voice.channel) {
      interaction.reply("Вы не находитесь в голосовом чате");
      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    const queue = this.player.getQueue(interaction.guild, interaction.channel)

    if (!queue.isReady) {
      interaction.reply("Бот ещё не готов...");
      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    if (interaction.member.voice.channel.id !== queue.voiceChannelId) {
      interaction.reply("Бот находится в другом чате");
      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    return { guild: interaction.guild, member: interaction.member, queue };
  }
}
