import { FetchOptions } from "ohmyfetch";

export const useApi = async (url, options:FetchOptions = {}) =>
  useFetch("" + url, {
    ...options,
  });
  
export const api = (url, options:FetchOptions = {}) =>
  $fetch("" + url, {
    ...options,
  });
