import http from './request';


const insertMenu = (params: any = {}) => http.get('/config/insert', params);
const getMenu = (params: any = {}) => http.get('/config/all', params);
const downloadDocx = (params: any = {}) => http.get('/doc/docx', params);
const downloadPdf = (params: any = {}) => http.get('/pdf/pdf', params);
const licenseContext = (params: any = {}) => http.get('/license/license', params);
const insertHistory = (params: any = {}) => http.get('/history/insert', params);
const getHistory = (params: any = {}) => http.get('/history/all', params);
const login = (params: any = {}) => http.get('/login/login', params);
const register = (data: any = {}) => http.post('/login/register', data)
export default {
  insertMenu,
  getMenu,
  downloadDocx,
  downloadPdf,
  licenseContext,
  insertHistory,
  getHistory,
  login,
  register
}