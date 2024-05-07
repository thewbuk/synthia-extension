function getYouTubeInfo() {
  const title = document.querySelector('h1.title').innerText;
  const url = window.location.href;
  const description = document.querySelector('#description').innerText;
  return { title, url, description };
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getYouTubeInfo') {
    const youtubeInfo = getYouTubeInfo();
    sendResponse(youtubeInfo);
  }
});