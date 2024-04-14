export type CloudData = {
  plantId?: string;
  username?: string;
  password?: string;
  serialNumber?: string;
};

export type CloudError = {
  status: string;
  message: string;
  code: number;
};

type CloudResponse = {
  errorMessage?: CloudError;
  payload?: CloudData;
};

const lockLicense = (serialNumber: string) => {
  return fetch("https://icc.youus.it:8447/iccapi/devices/locklicense", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serialNumber: serialNumber,
      plantName: "Test Plant",
      plantLocation: "ITALY",
      latitude: 1.5,
      longitude: 1.6,
      email: "m.tarquini@gmail.com",
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

export const cloudService = { lockLicense };
