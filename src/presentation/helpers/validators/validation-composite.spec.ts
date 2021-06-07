import { MissingParamError } from '../../errors';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

type SutTypes = {
  sut: ValidationComposite;
  validationSutb: Validation;
};

const makeSut = (): SutTypes => {
  const validationSutb = makeValidation();
  const sut = new ValidationComposite([validationSutb]);

  return {
    sut,
    validationSutb,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSutb } = makeSut();
    jest
      .spyOn(validationSutb, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
