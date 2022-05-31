const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

export default class WWW {
  static async jsonNonCache(url) {
    const response = await fetch(url, JSON_HEADERS);
    const dataJson = await response.json();
    return dataJson;
  }
}
