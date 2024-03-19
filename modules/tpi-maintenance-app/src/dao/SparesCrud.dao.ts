import {
  InternalAxiosInstance,
  generateCRUDHooks,
} from "@tii/ui-core-framework";
import { Spare } from "@tii/components";

export const {
  useGetHook: useGetSpareHook,
  usePostHook: usePostSpareHook,
  usePutHook: usePutSpareHook,
} = generateCRUDHooks<Spare>("spares", InternalAxiosInstance, true);
