import { NextFunction, Request, Response } from 'express';
import * as domain from '../../../domain/ethereum';
import {
  ethereumTokenMetadataSuccessResponse,
} from '../../../models/ethereum';
import * as utils from '../../../utils/utils';

export async function getTokenMetadataByQuery(req: Request, res: Response, next: NextFunction) {

  const addressOrAlias: string = req.params.addressOrAlias;

  return domain
    .getTokenMetadataByQuery(addressOrAlias)
    .then((result: any) => utils.createReply(res, ethereumTokenMetadataSuccessResponse, result))
    .catch(next);

}

export async function getTokenMetadata(req: Request, res: Response, next: NextFunction) {

  const address: string = req.query.address;

  return domain
    .getTokenMetadata(address)
    .then((result: any) => utils.createReply(res, ethereumTokenMetadataSuccessResponse, result))
    .catch(next);

}
