const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/;

export function isValidYoutubeUrl(url: string) {
  return url.match(YOUTUBE_REGEX);
}

type GetEmbedYoutubeUrlOptions = {
  url: string;
  allowFullscreen?: boolean;
  autoplay?: boolean;
  nocookie?: boolean;
  controls?: boolean;
};

export function getEmbedYoutubeUrl({
  url,
  nocookie,
  allowFullscreen,
  autoplay,
  controls,
}: GetEmbedYoutubeUrlOptions) {
  if (!isValidYoutubeUrl(url)) {
    return null;
  }

  // if is already an embed url, return it
  if (url.includes("/embed/")) {
    return url;
  }

  const videoIdRegex = /(?:v=|shorts\/)([-\w]+)/gm;
  const matches = videoIdRegex.exec(url);

  if (!matches || !matches[1]) {
    return null;
  }

  const outputUrl =
    (nocookie ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/") +
    matches[1];

  const params = [];

  if (!allowFullscreen) {
    params.push("fs=0");
  }

  if (autoplay) {
    params.push("autoplay=1");
  }

  if (!controls) {
    params.push("controls=0");
  }

  return outputUrl;
}
