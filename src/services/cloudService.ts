export type CloudData = {
  macAddress?: string;
  publicKey?: string;
  qrCode?: string;
  plantID?: string;
};

type CloudResponse = {
  plantID: string;
};

const getPlantID = (macAddress: string, publicKey: string, qrCode: string) => {
  return fetch("https://run.mocky.io/v3/11ad91cc-2ae1-4881-9607-8ee73b63f1a4", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      macAddress: macAddress,
      publicKey: publicKey,
      qrCode: qrCode,
    }),
  })
    .then((response) => {
      if (response.headers?.get("content-type")?.match(/application\/json/)) {
        return response.json();
      } else throw new Error("Wrong answer");
    })
    .then<CloudResponse>((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const cloudService = { getPlantID };
