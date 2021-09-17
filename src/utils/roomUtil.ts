import moment from "moment"
import { useState } from "react"

function getDay(day: Date) {
    const dayFormated = moment(day).format('DD/MM/YYYY');
    const dayUnix = moment(day).unix();
    const date = new Date();

    if (dayFormated === moment(date).format('DD/MM/YYYY')) {
        return 'Hoje';
    } else if (dayFormated === moment(date.getDay() - 1).format('DD/MM/YYYY')) {
        return 'Ontem'
    } else if (dayUnix >= moment(date.getDay() - 4).unix() && dayUnix <= moment(date.getDay() - 2).unix()) {
        return moment(day).format('dddd')
    }

    return dayFormated
}

function messagesDay<T extends any[]>(messages: T) {
    return messages.reduce((acc: any, crr) => {
        const messageDay = moment(crr.created_at).format("DD/MM/YYYY");
        return acc[messageDay] ? { ...acc, [messageDay]: acc[messageDay].concat([crr]) } : { ...acc, [messageDay]: [crr] };
    }, {});
}

type OrdedMessages<T> = Array<T & { date?: string }> | []

export function orderMessages<T>(messages: T[]): OrdedMessages<T> {
    if (!messages?.length) return [];

    const days = messagesDay(messages)
    const sortedDays = Object.keys(days).sort((x, y) => moment(y, "DD/MM/YYYY").unix() - moment(x, "DD/MM/YYYY").unix())

    const sortedMessages = sortedDays.reduce((acc: any, date) => {
        const dateFormat = getDay(days[date][0].created_at)
        const sortedMessages = days[date].sort((x: any, y: any) =>  moment(x.created_at).unix() - moment(y.created_at).unix())

        return [{ date: dateFormat, id: date }, ...sortedMessages].concat(acc)
    }, [])

    return sortedMessages
}
