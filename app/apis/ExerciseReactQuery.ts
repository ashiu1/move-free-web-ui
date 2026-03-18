import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getExerciseData, postFitnessVideo, uploadExercises } from './ExerciseApi'

export const useExerciseData = (url: string) => {
  return useQuery({
    queryKey: ['getExerciseData', url],
    queryFn: () => getExerciseData(url),
    enabled: !!url, // Only run query if url is provided
  });
};

export const usePostFitnessVideo = (url: string, userId?: string) => {
  return useQuery({
    queryKey: ['postFitnessVideo', url, userId],
    queryFn: () => postFitnessVideo(url, userId),
    enabled: !!url, // Only run query if url is provided
  });
};

export const useUploadExercises = () => {
  return useMutation({
    mutationFn: ({
      analysisData,
      userId,
      videoUrl,
      source,
    }: {
      analysisData: any;
      userId?: string;
      videoUrl?: string;
      source?: string;
    }) => uploadExercises(analysisData, userId, videoUrl, source),
  });
};
