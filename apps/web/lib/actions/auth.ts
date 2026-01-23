'use server';

import { ActionState } from '@/lib/types/action-state';
import { logInSchema, signUpSchema } from '@repo/schemas';
import z from 'zod';
import { api } from '@/lib/api';
import axios from 'axios';
import { loginClient } from './auth-api';

// ============================ Log In Action ========================= //
export async function logIn(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = logInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      status: 'error',
    };
  }

  const { email, password } = parsed.data;

  try {
    const { access_token, deviceId } = await loginClient(email, password);

    return {
      errors: {},
      status: 'success',
      data: { access_token, deviceId },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        return {
          errors: { _form: ['Invalid email or password'] },
          status: 'error',
        };
      }

      return {
        errors: { _form: ['Something went wrong. Please try again.'] },
        status: 'error',
      };
    }

    console.log(err);
    return {
      errors: { _form: ['An unexpected error occurred'] },
      status: 'error',
    };
  }
}

// ============================ Sign Up Action ========================= //
export async function signUp(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const data = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    home_address: formData.get('home_address') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirm_password: formData.get('confirm_password') as string,
  };

  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      status: 'error',
      data: data,
    };
  }

  const {
    first_name,
    last_name,
    home_address,
    email,
    password,
    confirm_password,
  } = parsed.data;

  try {
    const response = await api.post('/auth/signup', {
      first_name,
      last_name,
      home_address,
      email,
      password,
      confirm_password,
    });

    const { access_token, deviceId } = response.data;

    return {
      errors: {},
      status: 'success',
      data: { access_token, deviceId },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409) {
        return {
          errors: { _form: ['Email already exists'] },
          status: 'error',
        };
      }

      // backend validation
      if (err.response?.status === 400) {
        return {
          errors: { _form: ['Invalid signup data'] },
          status: 'error',
        };
      }

      return {
        errors: { _form: ['Something went wrong. Please try again.'] },
        status: 'error',
      };
    }

    console.error(err);
    return {
      errors: { _form: ['An unexpected error occurred'] },
      status: 'error',
    };
  }
}
