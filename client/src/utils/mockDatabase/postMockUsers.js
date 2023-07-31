import axios from "axios";
import { students, professionals, companies, jobs } from "./mockUsers.js";
const users = [...students, ...professionals];

(async () => {
  // Se crean los usuarios
  for (const user of users) {
    await axios.post(`http://localhost:3001/userTest`, user);
  }

  // Se crean las empresas y se les asocian trabajos al azar
  const jobKeys = Object.keys(jobs);
  const companyCount = companies.length;

  for (let i = 0; i < companyCount; i++) {
    const company = companies[i];
    const createdCompany = await axios.post(
      `http://localhost:3001/userTest`,
      company
    );
    const companyId = createdCompany.data.id;

    // Asociar trabajos al azar a la empresa actual
    const randomJobIndex = i % jobKeys.length;
    const randomJobKey = jobKeys[randomJobIndex];
    const randomCompanyJobs = jobs[randomJobKey];

    // Se crean los trabajos para la empresa actual
    if (randomCompanyJobs) {
      for (const job of randomCompanyJobs) {
        job.companyId = companyId;
        await axios.post(`http://localhost:3001/userTest`, job);
      }
    }
  }
})();
