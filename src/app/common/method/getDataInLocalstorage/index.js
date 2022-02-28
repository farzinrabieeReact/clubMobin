
export const getDataInLocalstorage = (key) => {

    if (!JSON.parse(localStorage.getItem('persist:auth')).user) {
        return null
    }

    let { user } = JSON.parse(localStorage.getItem('persist:auth'))
    let userPars = JSON.parse(user)
    return userPars[key]
}



