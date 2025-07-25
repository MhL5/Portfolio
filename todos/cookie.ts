export function getDocumentCookieAndDecode(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// isBase64(cookie) ? atob(cookie) : cookie; ?
export function isBase64(str: string) {
  if (typeof str !== "string") return false;

  try {
    // Check if the string matches the Base64 format
    const base64Regex =
      /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    if (!base64Regex.test(str)) return false;

    // Try decoding it
    atob(str);
    return true;
  } catch {
    return false;
  }
}
