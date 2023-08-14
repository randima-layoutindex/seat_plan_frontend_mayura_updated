import axios from "axios";

export async function fetchAuthToken() {
  try {
    const response = await axios.post(
      `http://localhost:8000/generate-api-key`,
      {
        // access_code: "dc96f8", //? stage
        access_code: "1234V2", //? dev-1
        // access_code: "12Cy34", //? dev-2
        device: "2",
      }
    );

    return response.data.data.apiKey;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    throw error;
  }
}
