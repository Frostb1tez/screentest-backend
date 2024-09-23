# Backend Questions

## 1. Assuming the system currently has three microservices: Customer API, Master Data API,and Transaction Data API, there is a new feature that requires data from all three microservices to be displayed in near real-time. The current technology stack includes REST APIs and an RDBMS database. How would you design a new API for this feature?

##### In my opinion, I will use EDA, Redis for caching, and Web-socket for sending data to clients in real-time. When I request from the client to a new service. It should send a message pattern to rabbitMQ. then other services should handle message patterns. next, it fetches data and sends a message pattern with data to rabbitMQ again. next, a new service should handle and keep it to Redis. Also, when data is updated should handle it and update it to Redis. Finally, A new service handles messages as well as WebSocket sends data to clients.

## 2.Assuming the team has started planning a new project, the project manager asks you for a performance test strategy plan for this release. How would you recommend proceeding to the project manager?

##### I will create meetings to understand the project's performance goals and expectations. then identify key performance indicators. next, define user workflows and performance metrics. if the team encounters performance issues. We should talk about finding a resolution. After that, we should retest.

## What is useCallback

##### It's used to optimize performance in React applications when passing props to child components

## Write a unit test for the UserProfile React component using Jest and React Testing Library.

global.fetch = jest.fn();

describe('UserProfile', () => {
afterEach(() => {
jest.clearAllMocks();
});

test('renders loading state initially', () => {
render(<UserProfile userId="123" />);
expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders user data when fetch is successful', async () => {
const mockUser = { name: 'John Doe', email: 'john@example.com' };
fetch.mockResolvedValueOnce({
ok: true,
json: async () => mockUser,
});

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/123');

});

test('renders error message when fetch fails', async () => {
fetch.mockRejectedValueOnce(new Error('Failed to fetch user data'));

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument();
    });

});

test('renders error message when response is not ok', async () => {
fetch.mockResolvedValueOnce({
ok: false,
});

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument();
    });

});

test('fetches new user data when userId prop changes', async () => {
const mockUser1 = { name: 'John Doe', email: 'john@example.com' };
const mockUser2 = { name: 'Jane Smith', email: 'jane@example.com' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser1,
    });

    const { rerender } = render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser2,
    });

    rerender(<UserProfile userId="456" />);

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://api.example.com/users/123');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://api.example.com/users/456');

});
});
