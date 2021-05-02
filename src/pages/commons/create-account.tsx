import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../images/coupang-eats-logo.png';
import { UserRole } from '../../constants';
import { ErrorMessage } from '../../components/errorMessage';
import gql from 'graphql-tag';


const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
      user {
        id
      }
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 600,
          backgroundRepeat: 'no-repeat',
        }}
        className="p-32 bg-contain bg-center"
      />
      <div className="w-1/4 h-auto flex justify-center border border-gray-300 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-5 flex flex-col items-center"
        >
          <input
            type={'email'}
            className="form-input"
            placeholder={'Email'}
            {...register('email', {
              required: true,
              // eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === "required" && <ErrorMessage message={"Email is required."} />}
          {errors.email?.type === "pattern" && <ErrorMessage message={"Invalid email."} />}
          <input
            type={'password'}
            placeholder={'Password'}
            className="form-input"
            {...register('password', { required: true })}
          />
          {errors.password?.type === "required" && <ErrorMessage message={"Password is required."} />}
          <input
            type={'text'}
            placeholder={'Phone Number'}
            className="form-input"
            {...register('phone', {
              required: true,
              pattern: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/,
            })}
          />
          {errors.phone?.type === "required" && <ErrorMessage message={"Phone Number is required."} />}
          {errors.phone?.type === "pattern" && <ErrorMessage message={"Invalid Phone Number."} />}
          <input
            type={'text'}
            placeholder={'Address'}
            className="form-input"
            {...register('address', { required: true })}
          />
          {errors.password?.type === "required" && <ErrorMessage message={"Address is required."} />}
          <select className="form-input" {...register('role', {required: true})}>
            <option value={""} disabled selected>Select Role</option>
            {Object.keys(UserRole).map((role, index) => {
              return (
                <option value={role} key={index}>
                  {role}
                </option>
              );
            })}
          </select>
          {errors.role?.type === "required" && <ErrorMessage message={'Role is required.'} />}
          <button type={'submit'} className={`w-full bg-blue-300 p-4 rounded-sm text-white font-medium ${isValid ? 'bg-opacity-100' : 'bg-opacity-30 pointer-events-none'}`}>Create account</button>
        </form>
      </div>
    </div>
  );
};