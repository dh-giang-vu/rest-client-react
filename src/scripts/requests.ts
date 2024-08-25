export async function sendGetRequest(): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/hello');
    const data = await response.text();
    return data;
  }
  catch (error) {
    console.error('Error GET request:', error);
    return "Error: GET request";
  }
}

export interface Timeslot {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Room {
  name: string;
}

export interface Lesson {
  id: number;
  subject: string;
  teacher: string;
  studentGroup: string;
}

export interface PostRequestBody {
  timeslots: Timeslot[];
  rooms: Room[];
  lessons: Lesson[];
}

export async function sendPostRequest(body: PostRequestBody): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/timetables/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return JSON.stringify(data);

  } catch (error) {
    console.error('Error during fetch operation:', error);
    return "Error: POST request";
  }
}