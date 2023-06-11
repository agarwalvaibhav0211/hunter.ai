import axios from 'axios'

let axiosInstance=axios.create({
    validateStatus:function(status){
        return true;
    }
});

export {axiosInstance}