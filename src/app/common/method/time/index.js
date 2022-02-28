
let digit = (data) => {

    let value =data.toString()
    let length = value.length

    if (length === 1) {
        return ('0' + data)
    }
    return data
}



export const timeCurrent = ()=>{

    let d = new Date()

    return `${digit(d.getHours())}:${ digit(d.getMinutes())}:${digit(d.getSeconds())+'.000000'}`
}
