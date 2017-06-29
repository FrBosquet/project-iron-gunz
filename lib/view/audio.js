function createEffectTag(sound) {
  var audio = document.createElement("AUDIO");
  audio.controls = false;
  audio.autoplay = false;
  audio.setAttribute("src", "audio/effects/" + sound + ".wav");
  return audio;
}

function createMusicTag(sound) {
  var audio = document.createElement("AUDIO");
  audio.controls = false;
  audio.autoplay = false;
  audio.loop = true;
  audio.setAttribute("src", "audio/music/" + sound + ".mp3");
  return audio;
}
