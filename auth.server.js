import axios from 'axios';


export const getCallService = (url) => {
    return axios.get(url);
}


export const  getServiceActive = (config) => {
    return new Promise((resolve, reject) => {
        axios(config)
        .then(function (response) {
            debugger;
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
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjI3Mzk0MDIyNjk4OTkxNyIsImRldmljZXR5cGUiOiJQQyIsImRldmljZW9zIjoiTUFDT1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzIwMjgzMTAsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi4xNiIsIkdlb0xvY0lwIjoiNDkuMjA3LjIyNC4yMDciLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyMDI4MzE2LCJleHAiOjE2NzI2MzMxMTYsImlzcyI6Im5vb3JwbGF5In0.6RCNKdXU4n4LzA47PtZc0Da3GvOlIWnG2XIWgW2zbeQ"
        }
    };
    return getServiceActive(configure);
}