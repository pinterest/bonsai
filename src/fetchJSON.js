/*
 * @flow
 */

export default function fetchJSON(endpoint: string) {
  return fetch(endpoint).then((response) => response.json());
}
