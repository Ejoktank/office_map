export function workplaces() {
  return fetch("/workplaces/", { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function plans() {
  return fetch("/plans/", { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
