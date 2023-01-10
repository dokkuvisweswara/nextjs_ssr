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

export const getThumbNailData = async (verifyURl) => {
    var configure = {
        url : verifyURl,   
        method : 'GET',
        headers : {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjE5NDQ2NTg3NTk1NTMxNzMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzMzMjkzMTksImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi4zOCIsIkdlb0xvY0lwIjoiMTcxLjc2LjcxLjkyIiwidmlzaXRpbmdjb3VudHJ5IjoiSU4iLCJpc3N1ZXIiOiJub29ycGxheSIsImV4cGlyZXNJbiI6NjA0ODAwLCJwcm92aWRlcm5hbWUiOiJOb29yUGxheSIsImlhdCI6MTY3MzMyOTMwNiwiZXhwIjoxNjczOTM0MTA2LCJpc3MiOiJub29ycGxheSJ9.lt8jmtxWTJkToFCncBnybDrVnM5Fba-W3lQuCF0r-jY"
        }
    };
    return getServiceActive(configure);
}