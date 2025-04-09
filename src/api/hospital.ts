import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';

// types
import { HospitalList, HospitalListMinimal, HospitalProps } from 'types/hospital';

const initialState: HospitalProps = {
  modal: false
};

export const endpoints = {
  key: '/hospitals',
  list: '/list', // server URL
  modal: '/modal', // server URL
  insert: '/insert', // server URL
  update: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetHospital() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      hospitals: data?.hospitals as HospitalList[],
      hospitalsLoading: isLoading,
      hospitalsError: error,
      hospitalsValidating: isValidating,
      hospitalsEmpty: !isLoading && !data?.hospitals?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertHospital(newHospital: HospitalListMinimal) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentHospital: any) => {
      newHospital.id = currentHospital.hospitals.length + 1;
      const addedHospital: HospitalList[] = [...currentHospital.hospitals, newHospital];

      return {
        ...currentHospital,
        hospitals: addedHospital
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newHospital };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function updateHospital(hospitalId: number, updatedHospital: HospitalListMinimal) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentHospital: any) => {
      const newHospital: HospitalList[] = currentHospital.hospitals.map((hospital: HospitalList) =>
        hospital.id === hospitalId ? { ...hospital, ...updatedHospital } : hospital
      );

      return {
        ...currentHospital,
        hospitals: newHospital
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedHospital };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteHospital(hospitalId: number) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentHospital: any) => {
      const nonDeletedHospital = currentHospital.hospitals.filter((hospital: HospitalList) => hospital.id !== hospitalId);

      return {
        ...currentHospital,
        hospitals: nonDeletedHospital
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { hospitalId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetHospitalMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.modal, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      hospitalMaster: data,
      hospitalMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerHospitalDialog(modal: boolean) {
  // to update local state based on key
  console.log('handle hospital modal');
  console.log(modal);

  console.log(endpoints.key + endpoints.modal);

  mutate(
    endpoints.key + endpoints.modal,
    (currentHospitalmaster: any) => {
      return { ...currentHospitalmaster, modal };
    },
    false
  );
}
