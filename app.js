const express = require("express");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.get("/images", async (req, res) => {
  let data;
  try {
    let resp = await axios.get(
      `https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/dqoh4lsjq/resources/search?expression="tags=lorddro1532@gmail.com"`
    );
    data = resp.data;
  } catch (e) {
    console.log(e.response.data);
  }

  const images = data.resources.map((image) => image.secure_url);
  console.log(images);
  res.status(200).json(images);
});

// axios
//   .get(
//     `https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/dqoh4lsjq/resources/search`
//   )
//   .then((resp) => {
//     console.log(resp.data[0]);
//   });

app.listen(PORT, () => {
  console.log("Server connected on PORT " + PORT);
});
