const API = 'http://localhost:3000/api/auth';

async function request(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const registerUser = (form) => request('/register', form);
export const loginUser = (form) => request('/login', form);