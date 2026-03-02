
const express = require("express");
const cors = require("cors");
const { buildVideo } = require("../ffmpeg/buildVideo");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/videos", express.static("../output/videos"));

app.post("/generate", async (req,res)=>{
  const { category, duration } = req.body;
  const file = await buildVideo(category, duration);
  res.json({ video: file });
});

app.listen(3000,()=>console.log("Server running on 3000"));
