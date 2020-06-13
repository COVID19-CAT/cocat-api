const axios = require('axios');
const position = require("../../ndata");

const config = require('../../config');

const distance = (lat1, lon1, lat2, lon2, unit = "kilometer") => {
  theta = lon1 - lon2;
  dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.cos(deg2rad(theta));

  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;

  if (unit == "kilometer") {
    dist = dist * 1.609344;
  } else if (unit == "meter") {
    dist = dist * 1609.344;
  }

  return dist;
}

const deg2rad = (deg) => {
  return (deg * Math.PI) / 180.0;
}

const rad2deg = (rad) => {
  return (rad * 180) / Math.PI;
}

module.exports = {
  async findPlaceBySpot(spot) {

    const response = await axios({
      method: "get",
      url: `https://dapi.kakao.com/v2/local/search/keyword.json`,
      params: { query: spot },
      headers: { Authorization: "KakaoAK " + config.kakaoAK },
    })
    const result = response.data.documents;
    const target = result[0];
    const Tlng = target.x;
    const Tlat = target.y;
    let re = [];

    position.forEach((n) => {
      let latlngreplace = n.latlng.replace(/(\s*)/g, "");
      let sp = latlngreplace.split(",");
      const lat = sp[0];
      const lng = sp[1];
      const rr = distance(Tlat, Tlng, lat, lng);
      if (rr <= 1) {
        re.push(n);
        return re;
      }
    });

    return re;
  },
}