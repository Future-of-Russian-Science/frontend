interface CheckResponse {
  Status: number;
  Message: string;
}

async function sendPhoto(file: File): Promise<CheckResponse | false> {
  const data = new FormData();
  data.append('file', file);

  try {
    const response = await fetch('http://85.21.8.81:8888/api/check', {
      method: 'POST',
      body: data,
    });

    return response.json() as Promise<CheckResponse>;
  } catch (err) {
    return false;
  }
}

export { sendPhoto };
export type { CheckResponse };
