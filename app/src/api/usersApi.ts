// Ewa Cwik

const BASE_URL = "http://localhost:3000/api/users";
const API_KEY = "12345";

type User = {
userId: number;
userName: string;
surname: string;
password: string;
email: string;
image: string;
dogs: {
  id: number;
  name: string;
  breed: string;
  age: number;
  weight: number;
}[];
created: string;
updated: string;
};

type Dog = {
  id: number;
  dogName: string;
  breed: string;
  age: number;
  weight: number;
};

export async function getALLUsers(): Promise<User[]> {
  try {
    const response: Response = await fetch(
      "http://localhost:3000/api/users",
      );

      if (!response.ok) {
        throw new Error("Kunne ikke hente data" + response.status);
      }

      const data: User[] = await response.json();
      return data;
    }
    catch (error) {
      console.log("Noe gikk galt!", error);
      throw error;
    }
      }

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

export async function createUser(data: User) {
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

export async function updateUser(id: number, data: User) {
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

/*create dog*/
export async function createDog(data: Dog) {
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

export async function deleteDog(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke slette hund");
  }

  return true;
}