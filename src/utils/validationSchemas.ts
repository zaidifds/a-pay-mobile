import * as Yup from 'yup';
import { TranslationKeys } from '../localization/types';

// Builder functions that accept t() for localized messages
export const buildLoginSchema = (t: (k: keyof TranslationKeys) => string) =>
  Yup.object().shape({
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    password: Yup.string()
      .min(8, t('password_min_8'))
      .required(t('password_required')),
  });

export const buildSignupSchema = (t: (k: keyof TranslationKeys) => string) =>
  Yup.object().shape({
    name: Yup.string()
      .min(2, t('name_min'))
      .max(50, t('name_max'))
      .required(t('name_required')),
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    password: Yup.string()
      .min(8, t('password_min_8'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('password_complexity'),
      )
      .required(t('password_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwords_must_match'))
      .required(t('confirm_password_required')),
  });

export const buildForgotPasswordSchema = (
  t: (k: keyof TranslationKeys) => string,
) =>
  Yup.object().shape({
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
  });

export const buildChangePasswordSchema = (
  t: (k: keyof TranslationKeys) => string,
) =>
  Yup.object().shape({
    currentPassword: Yup.string().required(t('current_password_required')),
    newPassword: Yup.string()
      .min(8, t('password_min_8'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('password_complexity'),
      )
      .required(t('new_password_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], t('passwords_must_match'))
      .required(t('confirm_new_password_required')),
  });
