import { NextFunction, Request, Response } from 'express';
import * as domain from '../../../domain/ethereum';
import {
  EthereumSmartContractSuccessResponse,
  IEthereumSmartContractInvokeByQueryRequest,
  IEthereumSmartContractInvokeRequest,
} from '../../../models/ethereum';
import * as utils from '../../../utils/utils';

export async function invoke(req: Request, res: Response, next: NextFunction) {

  const params: IEthereumSmartContractInvokeRequest = req.body;

  return domain
    .invoke(params)
    .then((result: any) => utils.createReply(res, EthereumSmartContractSuccessResponse, result))
    .catch((err: any) => utils.createReply(res, err));

}

export async function invokeByQuery(req: Request, res: Response, next: NextFunction) {

  const addressOrAlias: string = req.params.query;
  const params: IEthereumSmartContractInvokeByQueryRequest = req.body;

  return domain
    .invokeByQuery(addressOrAlias, params)
    .then((result: any) => utils.createReply(res, EthereumSmartContractSuccessResponse, result))
    .catch((err: any) => utils.createReply(res, err));

}