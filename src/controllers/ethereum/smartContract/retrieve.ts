import { NextFunction, Request, Response } from 'express';
import * as domain from '../../../domain/ethereum';
import { ethereumSmartContractSuccessResponse } from '../../../models/ethereum';
import * as utils from '../../../utils/utils';

export async function find(req: Request, res: Response, next: NextFunction) {

  return domain
    .find()
    .then((result: any) => utils.createReply(res, ethereumSmartContractSuccessResponse, { list: result }))
    .catch((err: any) => utils.createReply(res, err));

}

export async function findOne(req: Request, res: Response, next: NextFunction) {

  const addressOrAlias: string = req.params.query;

  return domain
    .findOne(addressOrAlias)
    .then((result: any) => utils.createReply(res, ethereumSmartContractSuccessResponse, result))
    .catch((err: any) => utils.createReply(res, err));

}
