console.log("Content Plugin successfully loaded");
function createDownloadButton(): void {
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Télécharger mes buts";
  downloadButton.style.position = "fixed";
  downloadButton.style.bottom = "40px";
  downloadButton.style.right = "20px";
  downloadButton.style.zIndex = "1000";

  downloadButton.addEventListener("click", () => {
    const matchId = getMatchId(window.location.href);
    if (matchId) {
      getVideoUrlsForPlayer(4077499, matchId)
        .then((videoUrls: string[]) => {
          videoUrls.forEach((videoUrl: string) => openTabAndDownload(videoUrl));
        })
        .catch((error: Error) => {
          console.error("Erreur lors de la récupération des vidéos :", error);
        });
    }
  });

  document.body.appendChild(downloadButton);
}

function getMatchId(url: string): string | null {
  const match = url.match(/detail\/(\d+)/);
  return match ? match[1] : null;
}

async function fetchMatchData(matchId: string): Promise<any> {
  const response = await fetch(
    `https://api.lefive.fr/splf/v1/matches/${matchId}/matchevents`
  );
  return response.json();
}

async function getVideoUrlsForPlayer(
  playerId: number,
  matchId: string
): Promise<string[]> {
  const matchData = await fetchMatchData(matchId);
  return matchData
    .filter((event: any) => event.player?.id === playerId)
    .map((event: any) => event.videoUrl);
}

function openTabAndDownload(url: string): void {
  chrome.runtime.sendMessage({
    action: "openTab",
    url:
      "https://telecharger-videos.com/dailymotion?url=" +
      encodeURIComponent(url),
  });
}

createDownloadButton();
