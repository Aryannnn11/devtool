import axios from "axios";

async function getRepository(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  const response = await axios.get(url);

  return response.data;
}

export { getRepository };