import { Pagination, PaginationInteractions, PaginationItem, PaginationOptions, PaginationResolver, PaginationType } from "@discordx/pagination";
import {  ButtonStyle, Message, TextBasedChannel } from "discord.js";
import { ButtonComponent } from "discordx";

export class ExpressPagination<T extends PaginationResolver = PaginationResolver>  extends Pagination{
    constructor(sendTo: PaginationInteractions | Message | TextBasedChannel, embeds: PaginationItem[] | T, config?: PaginationOptions){
        super(sendTo, embeds, {
            /*start: {label: "⏮️", }, 
            end: {label:"⏭️", },*/
            next: {label:"Вперёд", },
            previous: {label:"Назад", },
            exit: {label: "Скрыть", style: ButtonStyle.Danger},
            enableExit: true,
            showStartEnd: false,
            type: PaginationType.Button,
            ...config.type == PaginationType.Button? config: undefined
        })
        
    }
}