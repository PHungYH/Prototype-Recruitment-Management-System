import { useNavigate } from 'react-router-dom';
import JobInfoList from '../components/JobInfoList';
import NavBar from '../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { useAuthGuardPreLogin } from '../utils/ComponentsHelper/AuthGuard';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import type { Job, JobListResponse } from '../commonInterface/JobListResponse.interface';

const Home = () => {
  const navigate = useNavigate();
  const hasFetchedJobList = useRef(false);
  const [jobInfoData, setJobInfoData] = useState<Job[]>([]);
  const [rawResponse, setRawResponse] = useState<JobListResponse>({} as JobListResponse);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalNumOfResults, setTotalNumOfResults] = useState(0);

  useAuthGuardPreLogin();

  const navButtons = [
    { label: 'Login', onClick: () => navigate('/login') }
  ];

  useEffect(() => {
    if (!hasFetchedJobList.current) {
      hasFetchedJobList.current = true;
      HTTPHelper.call<JobListResponse>(
        `${appGlobal.endpoint_job}/getActiveJobs`,
        'GET'
      ).then((response) => {
        console.log(response);
        setRawResponse(response);
        setCurrentPage(response.page.number + 1);
        setTotalPage(response.page.totalPages);
        setTotalNumOfResults(response.page.totalElements);

        // fill in job info cards
        const tmpJobInfo = [] as Job[];
        response.content.forEach(job => {
          tmpJobInfo.push(job);
        });
        setJobInfoData(tmpJobInfo);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, []);

  // ** old **
  // return (
  //   <div>
  //     <div className="w-full justify-between bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
  //       <div className='flex justify-start'><h2 className="ml-2 text-2xl">🛰️SpaceHK</h2></div>
  //       <div className='flex justify-end'><NavBar buttons={navButtons} /></div>
  //     </div>
  //     <div className="flex h-screen justify-start">
  //       {jobInfoCardData.length > 0 && <JobInfoList jobs={jobInfoCardData} />}
  //       <div><h1>Test</h1></div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full justify-between bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
        <div className="flex justify-start">
          <h2 className="ml-2 text-2xl">🛰️SpaceHK</h2>
        </div>
        <div className="flex justify-end">
          <NavBar buttons={navButtons} />
        </div>
      </div>

      <div className="overflow-auto">
        {jobInfoData.length > 0 && <JobInfoList jobs={jobInfoData} />}
      </div>
    </div>
  );
};

export default Home;