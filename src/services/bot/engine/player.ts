import { Player } from "@discordx/music";
import { Guild, TextBasedChannel } from "discord.js";
import { ExpressQueue } from "./queue";

export class ExpressPlayer extends Player{
    constructor(){
        super();

        this.on<ExpressQueue, "onError">("onError", ([queue, err, track]) => {
           queue.channel.send(`Невозможно воспроизвести трек: ${track} \nОшибка: ${err.message}`);
        })

        this.on<ExpressQueue, "onFinishPlayback">("onFinishPlayback", ([queue]) => {
              queue.channel.send("Музыка закончилась... :musical_note:"); 
              queue.timeoutTimer = setTimeout(() => {
                queue.channel?.send(
                  "Бот покинул чат."
                );
                queue.leave();
              }, 5 * 60 * 1000);
        });

        this.on<ExpressQueue, "onTrackAdd">("onTrackAdd", ([queue]) => {
            queue.channel.send(`Добавлен трек ${queue.nextTrack.title}, всего треков: ${queue.tracks.length}`);
      });
      
    }

    getQueue(guild: Guild, channel?: TextBasedChannel): ExpressQueue {
        return super.queue<ExpressQueue>(guild, () => new ExpressQueue(this, guild, channel));
    }
}