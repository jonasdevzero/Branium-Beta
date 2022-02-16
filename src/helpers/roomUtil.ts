import moment from 'moment';

const months = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
} as { [key: string]: string }

function getDay(day: Date) {
  const dayFormated = moment(day).format('DD/MM/YYYY');
  const dayUnix = moment(day).unix();
  const date = new Date();

  if (dayFormated === moment(date).format('DD/MM/YYYY')) {
    return 'Hoje';
  } else if (dayFormated === moment(date.getDay() - 1).format('DD/MM/YYYY')) {
    return 'Ontem';
  } else if (
    dayUnix >= moment(date.getDay() - 4).unix() &&
    dayUnix <= moment(date.getDay() - 2).unix()
  ) {
    return moment(day).format('dddd');
  }

  const [dayF, month, year] = dayFormated.split("/");
  return `${dayF} de ${months[month]} de ${year}`
}

function messagesDay<T extends any[]>(messages: T) {
  return messages.reduce((acc: any, crr) => {
    const messageDay = moment(crr.created_at).format('DD/MM/YYYY');

    return acc[messageDay]
      ? { ...acc, [messageDay]: acc[messageDay].concat([crr]) }
      : { ...acc, [messageDay]: [crr] };
  }, {});
}

type OrdedMessages<T> = Array<T & { date?: string }> | [];

export function orderMessages<T>(messages: T[]): OrdedMessages<T> {
  if (!messages?.length) return [];

  const days = messagesDay(messages);
  const sortedDays = Object.keys(days).sort(
    (x, y) => moment(y, 'DD/MM/YYYY').unix() - moment(x, 'DD/MM/YYYY').unix()
  );

  const sortedMessages = sortedDays.reduce((acc: any, date) => {
    const dateFormat = getDay(days[date][0].created_at);
    const sortedMessages = days[date].sort(
      (x: any, y: any) =>
        moment(x.created_at).unix() - moment(y.created_at).unix()
    );

    return [{ date: dateFormat, id: date }, ...sortedMessages].concat(acc);
  }, []);

  return sortedMessages;
}
