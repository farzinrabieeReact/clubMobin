import moment from 'moment-jalaali'
import { convertDigitToEnglish } from '../convertDigitToEnglish';
import momentJalaali from 'moment-jalaali'


let digit = (data) => {

    let value = data.toString()
    let length = value.length

    if (length === 1) {
        return ('0' + data)
    }
    return data
}



export const dateConvertMiladiToShamsi = (value) => {

    if (!value) return

    let dformat = moment(value, 'YYYY/M/D HH:mm').format('jYYYY/jMM/jDD')

    return convertDigitToEnglish(dformat)
}



export const dateConverttShamsiToMiladi = (value) => {

    if (!value) return

    let dformat = moment(value, 'jYYYY/jM/jD HH:mm').format('YYYY/MM/DD')

    return convertDigitToEnglish(dformat)
}



export const dateCurrentShamsi = () => {

    let date = momentJalaali().locale('fa').format('jYYYY/jMM/jDD').split('/')
    return `${digit(date[0])}/${digit(date[1])}/${digit(date[2])}`

}


export const dateCurrentMiladi = () => {

    let date = momentJalaali().locale('fa').format('YYYY/M/D').split('/')
    return `${digit(date[0])}/${digit(date[1])}/${digit(date[2])}`

}




export const getNameDays = (date) => {
    var dt = moment(date, "YYYY-MM-DD HH:mm:ss")
    return dt.format('dddd')
}