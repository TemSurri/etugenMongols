import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  api
} from "../../../api/client";

import type {
  AdminActivityEvent
} from "../types";


export function useAdminActivity() {

  const [
    activity,
    setActivity
  ] =
    useState<
      AdminActivityEvent[]
    >([]);


  const [
    loading,
    setLoading
  ] =
    useState(true);


  const [
    error,
    setError
  ] =
    useState(false);


  const loadActivity =
    useCallback(
      async () => {

        try {

          setLoading(true);
          setError(false);


          const response =
            await api.get<
              AdminActivityEvent[]
            >(
              "/activity/admin"
            );


          setActivity(
            response.data
          );

        } catch (error) {

          console.error(
            "Failed to load admin activity:",
            error
          );

          setError(true);

        } finally {

          setLoading(false);

        }

      },
      []
    );


  useEffect(() => {

    void loadActivity();

  }, [loadActivity]);


  return {

    activity,

    loading,
    error,

    reload:
      loadActivity
  };
}