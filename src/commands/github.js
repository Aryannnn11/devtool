import { Command } from "commander";
import { getRepository } from "../services/github.js";

const githubCommand = new Command("github");

githubCommand
  .description("Get information about a GitHub repository")
  .argument("<repository>", "Repository in owner/name format")
  .action(async (repository) => {
    try {
      const [owner, repo] = repository.split("/");

      if (!owner || !repo) {
        console.log("Please provide a repository in owner/name format.");
        return;
      }

      const data = await getRepository(owner, repo);

      console.log(`\nRepository: ${data.full_name}`);
      console.log(`Description: ${data.description || "No description"}`);
      console.log(`Stars: ${data.stargazers_count}`);
      console.log(`Forks: ${data.forks_count}`);
      console.log(`Language: ${data.language || "Not specified"}`);
      console.log(`Open Issues: ${data.open_issues_count}`);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("Repository not found.");
      } else if (error.response?.status === 403) {
        console.log("GitHub API rate limit exceeded.");
      } else {
        console.log("Unable to fetch repository information.");
      }
    }
  });

export default githubCommand;