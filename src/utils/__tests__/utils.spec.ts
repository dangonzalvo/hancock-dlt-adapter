import 'jest';
import * as utilsUtils from '../utils';

describe('utilsUtils', () => {

  describe('::createReply', () => {

    const replyMock = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    const result = {
      message: 'mockedMessage',
      statusCode: 999,
    };

    const data = {
      whatever: 'whatever',
    };

    it('should reply with 204 status code', () => {

      const returned: any = utilsUtils.createReply(replyMock);

      expect(replyMock.status).toHaveBeenCalledWith(204);
      expect(replyMock.json).toHaveBeenCalled();

      expect(returned).toEqual(replyMock);

    });

    it('should reply with result.statusCode and result json object (without data)', () => {

      const returned: any = utilsUtils.createReply(replyMock, result);

      expect(replyMock.status).toHaveBeenCalledWith(999);
      expect(replyMock.json).toHaveBeenCalledWith({
        result: {
          code: 999,
          description: 'mockedMessage',
        },
      });

      expect(returned).toEqual(replyMock);

    });

    it('should reply with result.statusCode and result json object (with data)', () => {

      const returned: any = utilsUtils.createReply(replyMock, result, data);

      expect(replyMock.status).toHaveBeenCalledWith(999);
      expect(replyMock.json).toHaveBeenCalledWith({
        data: {
          whatever: 'whatever',
        },
        result: {
          code: 999,
          description: 'mockedMessage',
        },
      });

      expect(returned).toEqual(replyMock);

    });

  });

  describe('::strToHex', () => {

    it('should return the dbClient if it exists', async () => {

      const str: string = 'mockedString';
      const expectedValue: string = '0x6d6f636b6564537472696e67';

      const result: string = utilsUtils.strToHex(str);

      expect(result).toEqual(expectedValue);

    });

  });

});
