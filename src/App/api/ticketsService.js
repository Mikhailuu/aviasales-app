const API_BASE = "https://aviasales-test-api.kata.academy";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error) => {
  return (
    error.message.includes("500") || error.message.includes("Failed to fetch")
  );
};

const getSearchId = async () => {
  const response = await fetch(`${API_BASE}/search`);
  if (!response.ok) {
    throw new Error(`Failed to get searchId: ${response.status}`);
  }
  return await response.json();
};

const getTicketsChunk = async (searchId) => {
  const response = await fetch(`${API_BASE}/tickets?searchId=${searchId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tickets: ${response.status}`);
  }
  return await response.json();
};

const getTicketsStream = async function* (maxRetries = 5) {
  let retryCount = 0;
  const { searchId } = await getSearchId();

  while (retryCount < maxRetries) {
    try {
      const data = await getTicketsChunk(searchId);
      retryCount = 0;

      if (data.tickets?.length > 0) {
        yield data.tickets;
      }

      if (data.stop) {
        return;
      }
    } catch (error) {
      if (!isRetryableError(error)) {
        throw error;
      }

      retryCount++;
      if (retryCount >= maxRetries) {
        throw new Error(`Max retries exceeded (${maxRetries})`);
      }

      await delay(1000 * retryCount);
    }
  }
};

export default {
  getSearchId,
  getTicketsChunk,
  getTicketsStream,
  isRetryableError,
};
