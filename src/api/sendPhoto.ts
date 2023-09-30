interface CheckResponse {
  Status: 'Failed' | 'Empty' | 'Ok';
  Message: string;
}

async function sendImages(images: FileList): Promise<CheckResponse[] | false> {
  const data = new FormData();

  Array.from(images).forEach((image, index) => {
    data.append(`file${index}`, image);
  });

  try {
    const response = await fetch('http://85.21.8.81:8888/api/check', {
      method: 'POST',
      body: data,
    });

    return response.json() as Promise<CheckResponse[]>;
  } catch (err) {
    return false;
  }
}

async function sendImage(image: File): Promise<CheckResponse[] | false> {
  const data = new FormData();
  data.append('file1', image);

  try {
    const response = await fetch('http://85.21.8.81:8888/api/check', {
      method: 'POST',
      body: data,
    });

    return response.json() as Promise<CheckResponse[]>;
  } catch (err) {
    return false;
  }
}

export { sendImages, sendImage };
export type { CheckResponse };
