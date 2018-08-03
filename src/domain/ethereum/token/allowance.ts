import * as db from '../../../db/ethereum';
import { hancockDbError } from '../../../models/error';
import {
  IEthereumContractAbiDbModel,
  IEthereumSmartContractInvokeByQueryRequest,
  IEthereumSmartContractInvokeModel,
  IEthereumTokenAllowanceByQueryRequest,
  IEthereumTokenAllowanceRequest,
} from '../../../models/ethereum';
import { error } from '../../../utils/error';
import logger from '../../../utils/logger';
import { hancockContractNotFoundError } from '../models/error';
import { adaptContractInvoke  } from '../smartContract/common';
import { invokeByQuery } from '../smartContract/invoke';
import { hancockContractInvokeError } from '../smartContract/models/error';

export async function tokenAllowance(allowanceRequest: IEthereumTokenAllowanceRequest): Promise<any> {

  logger.info(`Token allowance`);

  let abi: IEthereumContractAbiDbModel | null;

  try {

    abi = await db.getAbiByName('erc20');

  } catch (err) {

    throw error(hancockDbError, err);

  }

  if (abi) {

    const invokeModel: IEthereumSmartContractInvokeModel = {
      abi: abi.abi,
      action: 'send',
      from: allowanceRequest.from,
      method: 'allowance',
      params: [allowanceRequest.tokenOwner, allowanceRequest.spender],
      to: allowanceRequest.smartContractAddress,
    };

    try {

      return await adaptContractInvoke(invokeModel);

    } catch (err) {

      throw error(hancockContractInvokeError, err);

    }

  } else {

    logger.info('Contract not found');
    throw error(hancockContractNotFoundError);

  }

}

export async function tokenAllowanceByQuery(addressOrAlias: string, allowanceRequest: IEthereumTokenAllowanceByQueryRequest): Promise<any> {

  logger.info(`Token allowance by query`);

  try {

    const invokeModel: IEthereumSmartContractInvokeByQueryRequest = {
      action: 'send',
      from: allowanceRequest.from,
      method: 'allowance',
      params: [allowanceRequest.tokenOwner, allowanceRequest.spender],
    };

    return await invokeByQuery(addressOrAlias, invokeModel);

  } catch (err) {

    throw error(hancockContractInvokeError, err);

  }
}