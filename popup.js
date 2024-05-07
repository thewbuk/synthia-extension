document.getElementById('videoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const channel = document.getElementById('channel').value;
    const url = document.getElementById('url').value;
    const videoId = document.getElementById('videoId').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const viewCount = document.getElementById('viewCount').value;
    const publishedAt = document.getElementById('publishedAt').value;
    const duration = document.getElementById('duration').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const language = document.getElementById('language').value;
    const difficulty = document.getElementById('difficulty').value;
    const channelTitle = document.getElementById('channelTitle').value;
  
    const videoData = {
      title,
      channel,
      url,
      videoId,
      category,
      description,
      viewCount,
      publishedAt,
      duration,
      thumbnail,
      language,
      difficulty,
      channelTitle
    };
  
    try {
      const response = await fetch('https://upisugdeqfeuddfvpety.supabase.co/rest/v1/youtubeRecommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaXN1Z2RlcWZldWRkZnZwZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NDY5OTUsImV4cCI6MjAyMzQyMjk5NX0.xb-IH-oICJ-wsD7FblhF2pcPUmc7fTBbRq3iJ4m03Js',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaXN1Z2RlcWZldWRkZnZwZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NDY5OTUsImV4cCI6MjAyMzQyMjk5NX0.xb-IH-oICJ-wsD7FblhF2pcPUmc7fTBbRq3iJ4m03Js',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(videoData)
      });
  
      if (response.ok) {
        console.log('Video saved successfully.');
        document.getElementById('videoForm').reset();
      } else {
        console.error('Error inserting video:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving video:', error);
    }
  });
  
  // Populate form fields with YouTube video info when the popup is opened
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'getYouTubeInfo' }, (youtubeInfo) => {
      document.getElementById('title').value = youtubeInfo.title;
      document.getElementById('channel').value = youtubeInfo.channel;
      document.getElementById('url').value = youtubeInfo.url;
      document.getElementById('videoId').value = youtubeInfo.videoId;
      document.getElementById('category').value = youtubeInfo.category;
      document.getElementById('description').value = youtubeInfo.description;
      document.getElementById('viewCount').value = youtubeInfo.viewCount;
      document.getElementById('publishedAt').value = youtubeInfo.publishedAt;
      document.getElementById('duration').value = youtubeInfo.duration;
      document.getElementById('thumbnail').value = youtubeInfo.thumbnail;
      document.getElementById('language').value = youtubeInfo.language;
      document.getElementById('difficulty').value = youtubeInfo.difficulty;
      document.getElementById('channelTitle').value = youtubeInfo.channelTitle;
    });
  });