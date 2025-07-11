import { useNavigate } from 'react-router-dom';
import JobInfoList from '../components/JobInfoList';
import NavBar from '../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { useAuthGuardPreLogin } from '../utils/ComponentsHelper/AuthGuard';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import type { Job, JobListResponse } from '../commonInterface/JobListResponse.interface';


interface CurrentUsernameTypeResponse {
  username: string,
  userType: string;
}

type HomeProps = {
  loginMode: boolean
}

const Home:React.FC<HomeProps> = ({loginMode}) => {
  const navigate = useNavigate();
  const hasFetchedJobList = useRef(false);
  const [jobInfoData, setJobInfoData] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentUserType, setCurrentUserType] = useState('');

  if (!loginMode)
    useAuthGuardPreLogin();

  const navButtons = [
    { label: 'Login', onClick: () => navigate('/login') }
  ];

  const loadPage = (page: number) => {
    hasFetchedJobList.current = true;
    HTTPHelper.call<JobListResponse>(
      `${appGlobal.endpoint_job}/getActiveJobs?page=${page}`,
      'GET'
    ).then((response) => {
      console.log(response);
      setCurrentPage(response.page.number);
      setTotalPage(response.page.totalPages);

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

  useEffect(() => {
    if (!hasFetchedJobList.current) {
      loadPage(currentPage);
    }

    // Set authenticated user type
    if (localStorage.getItem(appGlobal.storage_key_token)) {
      HTTPHelper.call<CurrentUsernameTypeResponse>(
        `${appGlobal.endpoint_auth}/getLoggedInUsernameType`,
        'GET'
      ).then((response) => {
        setCurrentUserType(response?.userType);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }

  }, []);

  const onPageChanged = (page:number) => {
    loadPage(page);
  }

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

      {!loginMode && (
      <div className="w-full justify-between bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
        <div className="flex justify-start">
          <h2 className="ml-2 text-2xl">🛰️SpaceHK</h2>
        </div>
        <div className="flex justify-end">
          <NavBar buttons={navButtons} />
        </div>
      </div>)}

      <div className="overflow-auto">
        {jobInfoData.length > 0 && <JobInfoList currentPage={currentPage} 
                                                totalPage={totalPage}
                                                onPageChanged={onPageChanged}
                                                currentUserType={currentUserType}
                                                jobs={jobInfoData} />}
      </div>
    </div>
  );
};

export default Home;