import { useEffect, useState } from 'react';
import { ResponseDto } from '../dtos/response.dto';

export const useFetchData = (
  fetchRequest: (() => Promise<ResponseDto<any>>)[],
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(
        (
          await Promise.all(
            fetchRequest.map(async (request) => await request()),
          )
        ).map((response) => response.data),
      );

      setIsLoading(false);
    };
    fetchData();
  }, [fetchRequest]);

  return { isLoading, data };
};
