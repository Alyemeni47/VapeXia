
const { exec } = require("child_process");
const path = require("path");
const templates = require("./templates");
const generateVoice = require("../backend/tts/speak");

exports.buildVideo = async (category, duration)=>{
  const input = path.join(__dirname,"../assets/videos",templates[category].video);
  const output = path.join(__dirname,"../output/videos",Date.now()+".mp4");
  const voice = await generateVoice(category);

  return new Promise((resolve,reject)=>{
    const cmd = `ffmpeg -stream_loop -1 -i "${input}" -i "${voice}" -t ${duration} -map 0:v -map 1:a -c:v copy -c:a aac "${output}"`;
    exec(cmd,(e)=>{
      if(e) reject(e);
      resolve("http://localhost:3000/videos/"+path.basename(output));
    });
  });
};
