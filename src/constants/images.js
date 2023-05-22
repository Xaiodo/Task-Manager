const isValidImageUrl = (url) => {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExtension = url.slice(-4).toLowerCase();
  const imageUrl = validExtensions.includes(fileExtension)
    ? url
    : "https://cdn.discordapp.com/attachments/1080055604359462953/1110255615927926874/error-zU1kKzcjyD-transformed.png";

  return imageUrl;
};

export default isValidImageUrl;
