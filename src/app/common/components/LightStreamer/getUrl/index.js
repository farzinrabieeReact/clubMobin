const getRandomNumber = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
  };
  


export const  getUrlAuth = ()=> {

    let protocol = window.location.protocol
    let hostName = window.location.hostname
  
    if (!protocol || !hostName || hostName === 'localhost') {
      return `http://192.168.231.11:${getRandomNumber(9191,9199)}/stream/V1/auth`
    }

    return `${protocol}//${hostName}/stream/V1/auth`
 
  }

  

  export const  getUrlSubscription = ()=> {

    let protocol = window.location.protocol
    let hostName = window.location.hostname
  
    if (!protocol || !hostName || hostName === 'localhost') {
      return `http://192.168.231.11:${'8090'}`
    }

    return `${protocol}//${hostName}/stream/V1/subscription`
 
  }

  
