import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helpers';
import { LogMongoRepository } from './log';

type SutTypes = {
  sut: LogMongoRepository;
};

const makeSut = (): SutTypes => {
  const sut = new LogMongoRepository();
  return { sut };
};

describe('Log Mongo Repository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on success', async () => {
    const { sut } = makeSut();
    await sut.logError('any_error');
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});