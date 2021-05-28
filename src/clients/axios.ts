import Axios from "axios";
import * as rax from "retry-axios";

const axiosInstance = Axios.create();

rax.attach(axiosInstance);

export default axiosInstance;
