import { makeSignUpValidation } from './signup-validation-factory';
import { Validation } from '../../../presentation/controllers/signup/signup-controller-protocols';
import { EmailValidator } from '../../../presentation/protocols/email-validator';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '../../../presentation/helpers/validators';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

jest.mock('../../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
