/**
 * @param {URL | string} url
 * @param {RequestInit | undefined} options
 * @returns {(path?: string, data?: {}) => Promise<Response>}
 */
export default function (url, options = {}) {
  const baseURL = new URL(url)

  return (path = './', data = {}) => {
    const requestURL = new URL(path, baseURL)

    for (const [key, value] of (data[Symbol.iterator]?.() || Object.entries(data))) requestURL.searchParams.append(key, value)

    requestURL.searchParams.sort() // sort to always have the same order, nicer for caching
    return fetch(requestURL, options)
  }
}
