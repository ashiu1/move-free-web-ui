const SAMPLE_URL = 'http://127.0.0.1:5000';

export const getExerciseData = async (url: string) => {
  try {
    const response = await fetch(
      `${SAMPLE_URL}/exercises?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    throw error;
  }
};

export const postFitnessVideo = async (url: string, userId?: string) => {
  try {
    const requestBody = {
      url: url,
      userId: userId,
    };

    console.log('postFitnessVideo - Request body:', requestBody);

    const response = await fetch(`${SAMPLE_URL}/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    throw error;
  }
};

export const uploadExercises = async (
  analysisData: any,
  userId?: string,
  videoUrl?: string,
  source?: string
) => {
  try {
    const requestBody = {
      ...analysisData,
      userId: userId,
      videoUrl: videoUrl,
      source: source,
    };

    console.log('uploadExercises - Request body:', requestBody);

    const response = await fetch(`${SAMPLE_URL}/save/exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading exercises:', error);
    throw error;
  }
};
