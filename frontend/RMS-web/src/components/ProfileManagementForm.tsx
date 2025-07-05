import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import Select from 'react-select';
import countryList from 'react-select-country-list'

type FormValues = {
  lastname: string,
  firstname: string,
  alias: string,
  idcard: string,
  dob_d: string,
  dob_m: string,
  dob_yyyy: string,
  gender: string,
  phoneNumber: string,
  address: string,
  nationality: string,
  linkedin: string
}

interface ProfileResponse {
  lastname: string,
  firstname: string,
  alias: string,
  idcard: string,
  dateOfBirth: string,
  gender: string,
  phoneNumber: string,
  address: string,
  nationality: string,
  linkedin: string
}

interface SaveResponse {
	result: boolean;
}

const style_input = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
const style_input_dob_ddmm = "mt-1 w-1/5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
const style_input_dob_yyyy = "mt-1 w-3/5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
const style_input_label = "block text-sm font-medium text-gray-700";
const style_input_error = "text-red-500 text-sm mt-1";

const validation_pattern_special_chars = {
  value: /^[a-zA-Z0-9]+$/,
  message: 'No special characters allowed'
}
const validation_pattern_idcard = {
  value: /^[A-Z]\d+$/,
  message: 'Invalid idcard format'
}

const validation_pattern_linkedin = {
  value: /^[A-Za-z0-9-]+$/,
  message: 'Invalid profile name format'
}

const options_gender = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'N', label: 'Not Disclose'}
];

const options_nationality = countryList().getData();

const ProfileManagementForm: React.FC = () => {
  const hasFetchedProfile = useRef(false);
  const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm<FormValues>();

  const dobDay = watch('dob_d');
  const dobMonth = watch('dob_m');
  const dobYear = watch('dob_yyyy');

  useEffect(() => {
    if (!hasFetchedProfile.current) {
      hasFetchedProfile.current = true;
      HTTPHelper.call<ProfileResponse>(
        `${appGlobal.endpoint_applicant}/getProfile`,
        'GET'
      ).then((response) => {
        // set saved value
        setValue("lastname", response?.lastname)
        setValue("firstname", response?.firstname)
        setValue("alias", response?.alias)
        setValue("idcard", response.idcard)
        setValue("dob_d", response?.dateOfBirth?.split('-')[2])
        setValue("dob_m", response?.dateOfBirth?.split('-')[1])
        setValue("dob_yyyy", response?.dateOfBirth?.split('-')[0])
        if (response?.gender === 'M')
          setValue("gender", options_gender[0])
        else if (response?.gender === 'F')
          setValue("gender", options_gender[1])
        setValue("phoneNumber", response?.phoneNumber)
        setValue("address", response?.address)
        options_nationality.forEach(opt => {
          if (opt.value === response.nationality) {
            setValue("nationality", opt)
            return;
          }
        });
        setValue("linkedin", response?.linkedin)
        console.log(response);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, []);

  const validateFullDate = () => {
    // accept null
    if (!dobDay && !dobMonth && !dobYear)
      return true;
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

  const addLeadingZero = ({text}: {text:string}):string => {
      return text.length === 1 ? ("0" + text) : text;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('form', data);
    const profileRequest:ProfileResponse = {} as ProfileResponse
    profileRequest.firstname = data?.firstname;
    profileRequest.lastname = data?.lastname;
    profileRequest.alias = data?.alias;
    profileRequest.idcard = data?.idcard;
    if (data.dob_yyyy && data.dob_m && data.dob_d)
      profileRequest.dateOfBirth = `${data.dob_yyyy}-${addLeadingZero({text: data.dob_m})}-${addLeadingZero({text: data.dob_d})}`
    if (data?.gender?.value !== 'N')
      profileRequest.gender = data?.gender?.value;
    profileRequest.phoneNumber = data?.phoneNumber;
    profileRequest.address = data?.address;
    profileRequest.nationality = data?.nationality?.value;
    profileRequest.linkedin = data?.linkedin;
    console.log('pre-save', profileRequest);
    try {
      const reqResult = await HTTPHelper.call<SaveResponse>(
        `${appGlobal.endpoint_applicant}/saveProfile`,
        'POST',
        profileRequest
      );
      if (reqResult.result) {
        window.location.reload();
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.log(error);
      alert('System error! Please try again.');
    }
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
              pattern: validation_pattern_special_chars,
            })}
            maxLength={50}
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
            maxLength={50}
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
            maxLength={50}
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
            })}
            maxLength={4}
            className={style_input}
          />
          {errors.idcard && <p className={style_input_error}>{errors.idcard.message}</p>}
        </div>

        {/* Date of birth Field */}
        <div>
          <label className={style_input_label}>Date of Birth</label>
          <div className='flex justify-start'>
            <input
              {...register('dob_d', {
                validate: validateFullDate,
              })}
              placeholder='D'
              maxLength={2}
              className={style_input_dob_ddmm}
            />
            <input
              {...register('dob_m', {
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
              placeholder='yyyy'
              maxLength={4}
              className={style_input_dob_yyyy}
            />
          </div>
          {(errors.dob_d || errors.dob_m || errors.dob_yyyy) && <p className={style_input_error}>{errors.dob_d?.message}</p>}
        </div>
        {/* Gender */}
        <div>
          <label className={style_input_label}>Gender</label>
          <Controller
            control={control}
            name="gender"
            render={renderProps => {
              const { ref, ...rest } = renderProps.field;

              return (
                <Select
                  options={options_gender}
                  menuPlacement="auto"
                  isSearchable={false}
                  menuPortalTarget={document.body} menuPosition="fixed"
                  {...register('gender')}
                  {...renderProps.field}
                  onChange={e => {
                    renderProps.field.onChange(e);
                  }}
                  isMulti={false}
                />
              );
            }}
          />
        </div>
        
        {/* Phone Number Field */}
        <div>
          <label className={style_input_label}>Phone Number</label>
          <input
            {...register('phoneNumber', {

            })}
            maxLength={20}
            type='number'
            className={style_input}
          />
          {errors.phoneNumber && <p className={style_input_error}>{errors.phoneNumber.message}</p>}
        </div>

        {/* Address Field */}
        <div>
          <label className={style_input_label}>Home Address</label>
          <input
            {...register('address')}
            maxLength={255}
            className={style_input}
          />
          {errors.address && <p className={style_input_error}>{errors.address.message}</p>}
        </div>

        {/* Nationality Field */}
        <div>
          <label className={style_input_label}>Nationality</label>
          <Controller
            control={control}
            name="nationality"
            render={renderProps => {
              const { ref, ...rest } = renderProps.field;
              return (
                <Select
                  options={options_nationality}
                  menuPlacement="auto"
                  menuPortalTarget={document.body} menuPosition="fixed"
                  {...register('nationality')}
                  {...renderProps.field}
                  onChange={e => {
                    renderProps.field.onChange(e);
                  }}
                  isMulti={false}
                />
              );
            }}
          />
          {errors.nationality && <p className={style_input_error}>{errors.nationality.message}</p>}
        </div>

        {/* Linkedin Field */}
        <div>
          <label className={style_input_label}>LinkedIn URL Name</label>
          <label className={style_input_label}>Input the name after "https://(www.)linkedin.com/in/"</label>
          <input
            {...register('linkedin', {
              pattern: validation_pattern_linkedin
            })}
            maxLength={200}
            className={style_input}
          />
          {errors.linkedin && <p className={style_input_error}>{errors.linkedin.message}</p>}
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
