import { WorkplacesProps } from "../App.vue";

export function workplaces() {
  return fetch("/workplaces/", { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function workplacesUpd({ id, x, y, plan, employee }: WorkplacesProps) {
  const workplaceId: number = id; // Замените на фактический идентификатор рабочего места
  const url: string = `/workplaces/${workplaceId}/`;

  const updatedWorkplaceData = {
    x: x,
    y: y,
    plan: plan,
    employee: employee,
  };

  const requestOptions: RequestInit = {
    method: "PUT",
    credentials: 'same-origin',
    body: JSON.stringify(updatedWorkplaceData),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Workplace updated:", data);
    })
    .catch((error) => {
      console.error("Error updating workplace:", error);
    });
}

export function plans() {
  return fetch("/plans/", { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
