document.getElementById('videoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;
  
    const videoData = {
      title,
      url,
      description,
      // Add other required fields here
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
        // Clear form fields after successful submission
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
      document.getElementById('url').value = youtubeInfo.url;
      document.getElementById('description').value = youtubeInfo.description;
    });
  });