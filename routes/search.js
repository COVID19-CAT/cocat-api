const express = require("express");
const router = express.Router();
const position = require("../ndata");
const axios = require("axios");

router.post("/position", (req, res, next) => {
  const { lat, lng } = req.body;
  axios({
    method: "get",
    url: `https://dapi.kakao.com/v2/local/search/keyword.json`,
    params: { query: spot },
    headers: { Authorization: "KakaoAK 7b98b237d9751707379a96b7fc1ba3e7" },
  })
    .then(function (response) {
      const Tlng = lat;
      const Tlat = lng;
      let re = [];
      position.forEach((n) => {
        let latlngreplace = n.latlng.replace(/(\s*)/g, "");
        let sp = latlngreplace.split(",");
        const lat = sp[0];
        const lng = sp[1];
        const rr = distance(Tlat, Tlng, lat, lng);
        if (rr <= 10) {
          re.push(n);
        }
      });
      res.json({ Qweq: re });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;