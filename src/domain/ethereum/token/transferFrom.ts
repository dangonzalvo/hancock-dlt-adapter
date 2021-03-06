import * as db from '../../../db/ethereum';
import { hancockDbError } from '../../../models/error';
import {
  IEthereumContractAbiDbModel,
  IEthereumSmartContractInvokeByQueryRequest,
  IEthereumSmartContractInvokeModel,
  IEthereumTokenTransferFromByQueryRequest,
  IEthereumTokenTransferFromRequest,
  TokenNames,
} from '../../../models/ethereum';
import { error } from '../../../utils/error';
import logger from '../../../utils/logger';
import { adaptContractInvoke  } from '../smartContract/common';
import { invokeByQuery } from '../smartContract/invoke';
import { hancockContractAbiError, hancockContractInvokeError } from '../smartContract/models/error';
import { hancockContractTokenTransferFromError } from './models/error';

export async function tokenTransferFrom(transferRequest: IEthereumTokenTransferFromRequest): Promise<any> {

  logger.info(`Token transfer from`);
  let abi: IEthereumContractAbiDbModel | null;

  try {

    abi = await db.getAbiByName(TokenNames.ERC20);

  } catch (err) {

    throw error(hancockDbError, err);

  }

  if (abi) {

    const invokeModel: IEthereumSmartContractInvokeModel = {
      abi: abi.abi,
      action: 'send',
      from: transferRequest.from,
      method: 'transferFrom',
      params: [transferRequest.sender, transferRequest.to, transferRequest.value],
      to: transferRequest.smartContractAddress,
    };

    try {

      return await adaptContractInvoke(invokeModel);

    }  catch (err) {

      throw error(hancockContractInvokeError, err);

    }

  } else {

    throw error(hancockContractAbiError);

  }

}

export async function tokenTransferFromByQuery(addressOrAlias: string, transferRequest: IEthereumTokenTransferFromByQueryRequest): Promise<any> {

  logger.info(`Token transfer from by query`);

  try {

    const invokeModel: IEthereumSmartContractInvokeByQueryRequest = {
      action: 'send',
      from: transferRequest.from,
      method: 'transferFrom',
      params: [transferRequest.sender, transferRequest.to, transferRequest.value],
    };

    return await invokeByQuery(addressOrAlias, invokeModel);

  } catch (err) {

    throw error(hancockContractTokenTransferFromError, err);

  }
}
