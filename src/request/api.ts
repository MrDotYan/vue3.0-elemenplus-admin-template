import http from './request';


const insertMenu = (params: any = {}) => http.get('/config/insert', params);
const getMenu = (params: any = {}) => http.get('/config/all', params);


export default {
  insertMenu,
  getMenu
}