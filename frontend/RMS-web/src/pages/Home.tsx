import { useNavigate } from 'react-router-dom';
import JobInfoList from '../components/JobInfoList';
import NavBar from '../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { useAuthGuardPreLogin } from '../utils/ComponentsHelper/AuthGuard';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';

interface JobInfoCard {
  title: string,
  department: string,
  jobType: string;
}

interface JobListResponse {
  content: Job[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: SortStatus;
  numberOfElements: number;
  empty: boolean;
}

interface Job {
  id: number;
  jobTitle: string;
  belongingEmploymentType: NamedEntity;
  belongingDepartment: NamedEntity;
  jobRequirement: string;
  jobPostedDate: string; // ISO 8601 date string
  active: boolean;
}

interface NamedEntity {
  id: number;
  name: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortStatus;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface SortStatus {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  const hasFetchedJobList = useRef(false);
  const [jobInfoCardData, setJobInfoCardData] = useState<JobInfoCard[]>([]);
  const [rawResponse, setRawResponse] = useState<JobListResponse>({} as JobListResponse);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

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
        setCurrentPage(response.pageable.pageNumber + 1);
        setTotalPage(response.totalPages);

        // fill in job info cards
        const tmpJobInfo = [] as JobInfoCard[];
        response.content.forEach(job => {
          tmpJobInfo.push({
            title: job.jobTitle,
            department:
              job.belongingDepartment.name,
            jobType: job.belongingEmploymentType.name
          });
        });
        setJobInfoCardData(tmpJobInfo);
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
      {/* Header */}
      <div className="w-full justify-between bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
        <div className="flex justify-start">
          <h2 className="ml-2 text-2xl">🛰️SpaceHK</h2>
        </div>
        <div className="flex justify-end">
          <NavBar buttons={navButtons} />
        </div>
      </div>

      {/* Content area that fills remaining height */}
      <div className="flex flex-grow justify-start overflow-auto">
        {jobInfoCardData.length > 0 && <JobInfoList jobs={jobInfoCardData} />}
        <div className='border-l-4 border-gray-200 pl-4 my-4'>
          <h1>Test</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;