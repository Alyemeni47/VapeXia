
const fs = require("fs");
const path = require("path");
const textTemplates = require("./textTemplates");
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname,"google-tts-key.json")
});

module.exports = async function(category){
  const text = textTemplates[category]();
  const out = path.join(__dirname,"../../assets/music/voice.mp3");

  const [res] = await client.synthesizeSpeech({
    input:{text},
    voice:{languageCode:"en-US",name:"en-US-Wavenet-D"},
    audioConfig:{audioEncoding:"MP3"}
  });

  fs.writeFileSync(out,res.audioContent,"binary");
  return out;
};
