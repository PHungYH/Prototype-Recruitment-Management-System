import { useEffect, useState } from "react";
import JobAppInfoCard from "../components/AppHistoryInfoCard";
import appGlobal from "../utils/AppGlobal";
import { HTTPHelper } from "../utils/HTTPHelper";
import type { AppHistoryResponse, JobApplication } from "../commonInterface/AppHistoryResponse.interface";

const ApplicationHistory = () => {
  const [results, setResults] = useState<JobApplication[]>([]);

  useEffect(() => {
    // Fetch application history
    HTTPHelper.call<AppHistoryResponse>(
      `${appGlobal.endpoint_job}/getAppliedJobs`,
      'GET'
    ).then((response) => {
      console.log(response);
      if (response.result) {
        setResults(response.resultList);
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div>
      {results.map((app) => (
        <div key={app.id}>
          <JobAppInfoCard appHistory={app}/>
        </div>
      ))}
    </div>
  );
}

export default ApplicationHistory;