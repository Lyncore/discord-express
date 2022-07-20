import { Player } from "@discordx/music";
import { Guild, TextBasedChannel } from "discord.js";
import { ExpressQueue } from "./queue";

export class ExpressPlayer extends Player{
    constructor(){
        super();
    }
    getQueue(guild: Guild, channel?: TextBasedChannel): ExpressQueue {
        return super.queue<ExpressQueue>(guild, () => new ExpressQueue(this, guild, channel));
    }
}