


const getRandomNumber = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
};

const getUrlAuth = () => {
    let protocol = window.location.protocol
    let hostName = window.location.hostname

    if (hostName === '127.0.0.1' || hostName === 'localhost') {
        return `http://192.168.231.11:${getRandomNumber(9191, 9199)}/stream/V1/auth`
    }
    return `${protocol}//${hostName}/stream/V1/auth`
}

const getUrlSubscription = () => {

    let protocol = window.location.protocol
    let hostName = window.location.hostname

    if (hostName === '127.0.0.1' || hostName === 'localhost') {
        return `http://192.168.231.11:8090`
    }
    return `${protocol}//${hostName}/stream/V1/subscription`
}


const ls_Client = (token, member_id) => {
    var lsClient = new LightstreamerClient(getUrlSubscription(), "MARKETMAP_ADAPTERS");

    lsClient.connectionDetails.setUser(member_id)
    lsClient.connectionDetails.setPassword(token)

    lsClient.connect();
    return lsClient
}

const unbscription = (lsClient , subscription) => {
    lsClient.unsubscribe(subscription);
}

let nameSector = (item) => {
    let obj = {}
    item.forEach(element => {
        if (element.CSecVal)
            obj[element.CSecVal] = element.LSecVal
    });

    return obj
}

let nameStock = (item) => {
    let obj = {}
    item.forEach(element => {
        if (element.ItemName)
            obj[element.ItemName] = element.LVal18AFC
    });

    return obj
}


// let setDetailsWhenHoverInSidebar = (data) => {
//     let tbody = document.getElementById("foamtree-details-tbody")
//     let htmlTag = ""
//     data.forEach(item => (
//         htmlTag += `<tr class="text-center">
//            <td>${item.symbol}</td>
//            <td>${item.price}</td>
//            <td ltr class="${item.change === 0 ? "" : item.change > 0 ? "greenColor" : item.change < 0 ? "redColor" : ""}">${item.change === "-" ? "-" : item.change + "%"}</td>
//            <td>${item.turnover}</td>
//            <td>${item.transactions}</td>
//         </tr>`
//     ))
//     tbody.innerHTML = htmlTag
// }
