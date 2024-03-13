import { QueryObserverOptions } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import * as AxiosInstanceFactory from "../config/AxiosInstanceFactory";
import { PostResponse, PutResponse } from "../models/apis/CRUDApiTypes";
import { Entity } from "../models/apis/CRUDEntity";

export class CRUDDao<T extends Entity> {
  private __axiosInstance?: AxiosInstance;
  private useMirage: boolean;
  constructor(
    public readonly entityPluralName: string,
    private readonly apiVersion: string = "v1"
  ) {
    this.useMirage = false;
  }

  setAxiosInstance(instance: AxiosInstance) {
    this.__axiosInstance = instance;
  }

  setUseMirage(useMirage: boolean) {
    this.useMirage = useMirage;
  }

  private getAxiosInstance(): AxiosInstance {
    if (this.__axiosInstance == null) {
      return AxiosInstanceFactory.getAxiosInstance();
    }
    return this.__axiosInstance;
  }

  getCacheKeyPrefix: () => Array<string> = () => {
    return [this.entityPluralName];
  };

  getConfig: (...payload: any[]) => QueryObserverOptions<T, Error> = (
    ...payload: any[]
  ) => {
    return {
      enabled:
        payload.length > 0 &&
        payload.every((i) => !!i) &&
        !!this.entityPluralName,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    };
  };

  protected pathWithId = (clientId: string, id: string) => {
    if (this.entityPluralName.toLowerCase() === "clients") {
      return `/${this.apiVersion}/clients/${id}`;
    }
    return `/${this.apiVersion}/clients/${clientId}/${this.entityPluralName}/${id}`;
  };

  protected pathWithoutId = (clientId: string) => {
    if (this.entityPluralName.toLowerCase() === "clients") {
      return `/${this.apiVersion}/clients`;
    }
    return `/${this.apiVersion}/clients/${clientId}/${this.entityPluralName}`;
  };

  get: (
    clientId: string,
    id: string,
    querParams: { [key: string]: string }
  ) => Promise<T> = async (
    clientId: string,
    id: string,
    querParams: { [key: string]: string } = {}
  ) => {
    const res = await this.getAxiosInstance().get(
      this.pathWithId(clientId, id),
      {
        headers: { useMirage: this.useMirage },
        params: querParams,
      }
    );
    return res.data;
  };

  post: (payload: Omit<T, "id">) => Promise<PostResponse> = async (
    payload: Omit<T, "id">
  ) => {
    const res = await this.getAxiosInstance().post(
      this.pathWithoutId(payload.buId),
      payload,
      {
        headers: { useMirage: this.useMirage },
      }
    );
    return res.data;
  };

  put: (payload: T) => Promise<PutResponse> = async (payload: T) => {
    const res = await this.getAxiosInstance().put(
      this.pathWithId(payload.buId, payload.id),
      payload,
      {
        headers: { useMirage: this.useMirage },
      }
    );
    return res.data;
  };
}
