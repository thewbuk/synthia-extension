const ytdl = require('ytdl-core');

async function extractYouTubeInfo() {
  const url = window.location.href;
  try {
    const info = await ytdl.getInfo(url);
    return {
      title: info.videoDetails.title,
      channel: info.videoDetails.author.name,
      url: url,
      videoId: info.videoDetails.videoId,
      category: info.videoDetails.category,
      description: info.videoDetails.description,
      viewCount: info.videoDetails.viewCount,
      publishedAt: info.videoDetails.publishDate,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails[0].url,
      language: 'en', // Assuming the language is English, you can modify this if needed
      difficulty: 'Unknown', // You can set a default value or modify this based on your requirements
      channelTitle: info.videoDetails.author.name
    };
  } catch (error) {
    console.error('Error extracting YouTube video info:', error);
    return null;
  }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getYouTubeInfo') {
    extractYouTubeInfo().then((youtubeInfo) => {
      sendResponse(youtubeInfo);
    });
    return true; // Required to use sendResponse asynchronously
  }
});