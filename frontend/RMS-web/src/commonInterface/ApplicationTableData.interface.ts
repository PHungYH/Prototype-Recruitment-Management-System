export interface Data {
  id: number;
  fullname: string;
  alias: string;
  idcard: string;
  phone: string;
  appliedTimestamp: number;
  status: string;
  interviewLocation: string;
  interviewTimestamp: number;
}

export function createData(
  id: number,
  fullname: string,
  alias: string,
  idcard: string,
  phone: string,
  appliedTimestamp: number,
  status: string,
  interviewLocation: string,
  interviewTimestamp: number,
): Data {
  return {
    id,
    fullname,
    alias,
    idcard,
    phone,
    appliedTimestamp,
    status,
    interviewLocation,
    interviewTimestamp
  };
}
