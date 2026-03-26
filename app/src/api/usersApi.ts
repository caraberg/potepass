// Ewa Cwik

const BASE_URL = "http://localhost:3000/api/users";
const API_KEY = "12345";

type UserInput = {
  email: string;
  name: string;
  surname: string;
  password: string;
  image: string;
  created: string;
  updated: string;
};


export async function getUser(id: number) {
const response = await fetch(`${BASE_URL}/${id}`, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

  if (!response.ok) {
    throw new Error(`Kunne ikke hente bruker`);
  }

  const data = await response.json();
  return data;
}

export async function createUser(data: UserInput) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke opprette bruker");
  }

  return response.json();
}

export async function updateUser(id: number, data: UserInput) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke oppdatere bruker");
  }

  return response.json();
}

export async function deleteUser(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke slette bruker");
  }

  return true;
}

