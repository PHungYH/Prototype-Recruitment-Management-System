import React, { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import { useNavigate } from 'react-router-dom';

interface ProfileResponse {
  lastname: string,
  firstname: string,
  alias: string,
  idcard: string,
  dob_dd: string,
  dob_mm: string,
  dob_yyyy: string,
  gender: string,
  phoneNumber: string,
  address: string,
  nationality: string,
  linkedin: string
}

const style_input = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
const style_input_dob_ddmm = "mt-1 w-1/5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
const style_input_dob_yyyy = "mt-1 w-3/5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
const style_input_label = "block text-sm font-medium text-gray-700";
const style_input_error = "text-red-500 text-sm mt-1";

const validation_pattern_special_chars = {
  value: /^[a-zA-Z0-9]+$/,
  message: 'No special characters allowed',
}
const validation_pattern_idcard = {
  value: /^[A-Z]\d*3$/,
  message: 'Invalid idcard format',
}

const ProfileManagementForm: React.FC = () => {
  const navigate = useNavigate();
  const hasFetchedProfile = useRef(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProfileResponse>();

  const dobDay = watch('dob_dd');
  const dobMonth = watch('dob_mm');
  const dobYear = watch('dob_yyyy');

  useEffect(() => {
    if (!hasFetchedProfile.current) {
      hasFetchedProfile.current = true;
      HTTPHelper.call<ProfileResponse>(
        `${appGlobal.endpoint_applicant}/getProfile`,
        'GET'
      ).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, []);

  const validateFullDate = () => {
    const day = parseInt(dobDay, 10);
    const month = parseInt(dobMonth, 10);
    const year = parseInt(dobYear, 10);

    if (
      !Number.isInteger(day) ||
      !Number.isInteger(month) ||
      !Number.isInteger(year)
    ) return 'Incomplete date';

    const date = new Date(year, month - 1, day);
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return isValid || 'Invalid date';
  };

  const onSubmit: SubmitHandler<ProfileResponse> = async (data) => {
    console.log(data);
    // const username = data.username.trim();
    // const email = data.email.trim();
    // const password = data.password.toString().trim();
    // try {
    //   const regResult = await HTTPHelper.call<RegisterResponse>(
    //     `${appGlobal.endpoint_auth}/registerApplicant`,
    //     'POST',
    //     { username, email, password }
    //   );
    //   console.log(regResult);
    //   if (regResult.token) {
    //     localStorage.setItem(appGlobal.storage_key_token, regResult.token);
    //     localStorage.setItem(appGlobal.storage_key_userType, appGlobal.userType_APPLICANT);
    //     alert('Registration successful! Please provide us more information.');
    //     navigate(`/${appGlobal.userType_APPLICANT.toLowerCase()}/profile_management`);
    //   } else if (regResult.errorCode) {
    //     alert(`Registration failed: ${regResult?.message}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert('System error! Please try again.');
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">We want to know more about you!</h2>
      <h3 className="font-bold mb-6 text-center">Please fill in your details below.</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Last name Field */}
        <div>
          <label className={style_input_label}>Last Name</label>
          <input
            {...register('lastname', {
              pattern: validation_pattern_special_chars
            })}
            className={style_input}
          />
          {errors.lastname && <p className={style_input_error}>{errors.lastname.message}</p>}
        </div>

        {/* First name Field */}
        <div>
          <label className={style_input_label}>First Name</label>
          <input
            {...register('firstname', {
              pattern: validation_pattern_special_chars
            })}
            className={style_input}
          />
          {errors.firstname && <p className={style_input_error}>{errors.firstname.message}</p>}
        </div>

        {/* Alias Field */}
        <div>
          <label className={style_input_label}>Alias/Nickname</label>
          <input
            {...register('alias', {
              pattern: validation_pattern_special_chars
            })}
            className={style_input}
          />
          {errors.alias && <p className={style_input_error}>{errors.alias.message}</p>}
        </div>

        {/* ID card Field */}
        <div>
          <label className={style_input_label}>HK Id Card (first 4 characters e.g., A1234)</label>
          <input
            {...register('idcard', {
              pattern: validation_pattern_idcard,
              maxLength: {
                value: 4,
                message: 'Must not exceed 4 characters',
              }
            })}
            className={style_input}
          />
          {errors.idcard && <p className={style_input_error}>{errors.idcard.message}</p>}
        </div>

        {/* Date of birth Field */}
        <div>
          <label className={style_input_label}>Date of Birth</label>
          <div className='flex justify-start'>
            <input
              {...register('dob_dd', {
                validate: validateFullDate,
              })}
              placeholder='D'
              maxLength={2}
              className={style_input_dob_ddmm}
            />
            <input
              {...register('dob_mm', {
                validate: validateFullDate,
              })}
              placeholder='M'
              maxLength={2}
              className={style_input_dob_ddmm}
            />
            <input
              {...register('dob_yyyy', {
                validate: validateFullDate,
              })}
              placeholder='Y'
              maxLength={4}
              className={style_input_dob_yyyy}
            />
          </div>
          {(errors.dob_dd||errors.dob_mm||errors.dob_yyyy) && <p className={style_input_error}>{errors.dob_dd?.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileManagementForm;
