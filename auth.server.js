import axios from 'axios';


export const getCallService = (url) => {
    return axios.get(url);
}


export const  getServiceActive = (config) => {
    return new Promise((resolve, reject) => {
        axios(config)
        .then(function (response) {
            resolve({"success":response.data});
        })
        .catch(function (error) {
            if (error.response && error.response.data) {
                reject(error.response.data);
              } else {
                reject(error);
              }
        });
        
      })
    
  }

export const getSession = () => {
    let session = localStorage.getItem('userLogged') == undefined || 'false' ? false : true;
    return session;
}

export const getConfigData = async () => {
    const configUrl = 'https://d2xowqqrpfxxjf.cloudfront.net/noorplay/web-noorplayv2.json';
    const configRes =  await fetch(configUrl);
    const configContent =  configRes.json();
    return configContent;
}

export const getThumbNailData = async (data) => {
    var configure = {
        url : data.thumbNailUrl,   
        method : 'GET',
        headers : {
            "authorization": data.token
        }
    };
    return getServiceActive(configure);
}