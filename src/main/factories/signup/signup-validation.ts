import { Validation } from '../../../presentation/controllers/signup/signup-protocols';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '../../../presentation/helpers/validators';
import { EmailValidatorAdapter } from '../../../utils';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
