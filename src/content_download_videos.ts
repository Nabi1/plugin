setTimeout(() => {
  const url = new URL(window.location.href);
  const encodedVideoUrl = url.searchParams.get("url");

  if (encodedVideoUrl) {
    const decodedVideoUrl = decodeURIComponent(encodedVideoUrl);

    const inputElement = document.getElementById("url") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = decodedVideoUrl;
    }

    const sendButton = document.getElementById("send") as HTMLButtonElement;
    sendButton?.click();

    setTimeout(() => {
      const downloadLinks = document.querySelectorAll(".video-links .btn-dl");
      const lastLink = downloadLinks[
        downloadLinks.length - 1
      ] as HTMLAnchorElement;
      lastLink?.click();
    }, 5000); // Delay to load video dowload link
  }
}, 3000); //Delay for the page to be fully load
