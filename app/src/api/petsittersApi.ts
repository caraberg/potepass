// Fullt navn: Carina Alexandra Bergman

const BASE_URL = "http://localhost:3000/api/petSitters";
const API_KEY = "12345";

type PetSitterInput = {
  name: string;
  location: string;
  pricePerDay: number;
  available: boolean;
  image: string;
  experienceDescription: string;
  rating: number;
  reviewCount: number;
  maxDogs: number;
  acceptsPuppies: boolean;
  acceptsLargeDogs: boolean;
  yearsOfExperience: number;
  created: string;
  updated: string;
};

/* HENT ALLE */

export async function getPetSitters() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Kunne ikke hente hundepassere");
  }

  return response.json();
}

/* OPPRETT */

export async function createPetSitter(data: PetSitterInput) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke opprette hundepasser");
  }

  return response.json();
}

/* OPPDATER */

export async function updatePetSitter(id: number, data: PetSitterInput) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke oppdatere hundepasser");
  }

  return response.json();
}

/* SLETT */

export async function deletePetSitter(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke slette hundepasser");
  }

  return true;
}