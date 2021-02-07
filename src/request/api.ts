import http from './request';


const insertMenu = (params: any = {}) => http.get('/config/insert', params);
const getMenu = (params: any = {}) => http.get('/config/all', params);
const downloadDocx = (params: any = {}) => http.get('/doc/docx', params);
const downloadPdf = (params: any = {}) => http.get('/pdf/pdf', params);

export default {
  insertMenu,
  getMenu,
  downloadDocx,
  downloadPdf
}