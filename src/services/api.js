import axios from 'axios';
import env from '../../env';

/** Em ambiente local a API_URL precisa ser o IP da maquina.
 * use o comando "adb reverse tcp:8000 tcp:8000" para mapear a porta 8000
 */
const api = axios.create({
  baseURL: __DEV__ ? env.dev.API_URL : env.prod.API_URL,
});

export default api;
