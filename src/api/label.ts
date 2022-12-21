/* eslint @typescript-eslint/explicit-module-boundary-types: off */
import {handler} from '.';

export interface Label {
  id: string,
  name: string,
  colour: string,
  createdAt: string,
  updatedAt: string
}

export interface LabelParams {
  id: string
}

export interface GetLabelsRes {
  labels: Label[]
}

interface GetLabelRes {
  label: Label
}

export interface CreateLabelReq {
  name: string,
  colour: string
}

interface UpdateLabelRes {
  label: Label,
  message: string
}

export interface ModifyLabelReq {
  id: string,
  name: string,
  colour: string,
}


export const LabelAPI = {
  getLabels: async () => await handler<GetLabelsRes>({method: 'get', url: '/labels'}),
  getLabel: async (id: string) =>
    await handler<GetLabelRes>({method: 'get', url: `/labels/${id}`}),
  createLabel: async (label: CreateLabelReq) =>
    await handler<UpdateLabelRes>({method: 'post', url: '/labels', data: label}),
  modifyLabel: async ({id, ...label}: ModifyLabelReq) =>
    await handler<UpdateLabelRes>({method: 'put', url: `/labels/${id}`, data: label}),
  removeLabel: async (id: string) =>
    await handler<{message: string}>({method: 'delete', url: `/labels/${id}`}),
};
