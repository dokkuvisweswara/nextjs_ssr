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
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o"
        }
    };
    return getServiceActive(configure);
}