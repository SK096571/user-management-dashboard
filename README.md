# User Management Dashboard

This is a user management dashboard that allows you to view, add, edit, and delete users. It interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for user data.

## Features
- View users in a table
- Add new users
- Edit existing users
- Delete users

## Challenges Faced:
- **Handling User IDs**: Initially, handling unique user IDs was a bit tricky since the mock API (JSONPlaceholder) does not actually store data. I simulated the IDs by generating random numbers, which caused inconsistencies. A sequential ID system was used later to address this.
  
- **Real-Time Data Storage**: The biggest challenge was the fact that the data doesn't persist after page reloads because the mock API does not actually save any data. To work around this, I simulated some parts of the CRUD functionality locally, but in a real-world application, you would connect to a database.

## Improvements:
- **Real Database Integration**: Integrating a real database would allow persistent user data storage across multiple sessions, making the application more functional.
  
- **Error Handling**: Adding better error handling for edge cases (e.g., network failures, invalid input) would enhance user experience.
  
- **UI/UX Enhancements**: More UI components (e.g., modals for edit/delete, confirmation prompts) and mobile responsiveness would improve the overall experience.

