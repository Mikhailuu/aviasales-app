export const fetchTickets = async () => {
  try {
    const searchResponse = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );

    if (!searchResponse.ok) {
      throw new Error(`Failed to get searchId: ${searchResponse.status}`);
    }

    const { searchId } = await searchResponse.json();

    const ticketsResponse = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );

    if (!ticketsResponse.ok) {
      throw new Error(`Failed to fetch tickets: ${ticketsResponse.status}`);
    }

    const data = await ticketsResponse.json();
    if (!data.tickets || !Array.isArray(data.tickets)) {
      throw new Error("Invalid tickets data structure");
    }

    return data.tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};
