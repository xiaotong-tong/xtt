const fs = require ("fs");
const axios = require('axios');

let url = "https://i.pixiv.cat/img-original/img/2021/07/02/17/09/58/90957468_p0.jpg"

const getimage = async () => {
    const { data } = await axios.get(url);
    console.log(data);
}
getimage();