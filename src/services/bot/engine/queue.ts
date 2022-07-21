import { toMS } from "@/utils";
import { Player, Queue } from "@discordx/music";

import { Guild, Message, TextBasedChannel } from "discord.js";

export class ExpressQueue extends Queue {
    constructor(player: Player, guild: Guild, public channel?: TextBasedChannel){
        super(player, guild)
        this.channel = channel
    }

    lastControlMessage?: Message;

    timeoutTimer?: NodeJS.Timeout;

    lockUpdate = false;

    get playbackMilliseconds(): number {
    const track = this.currentTrack;
    if (
      !track ||
      !track.metadata.isYoutubeTrack() ||
      !track.metadata.info.duration
    ) {
      return 0;
    }

    return toMS(track.metadata.info.duration);
  }
}