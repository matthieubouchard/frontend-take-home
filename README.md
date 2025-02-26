# Running the project

- `npm run dev` I'm as monorepo workspaces pattern to install dependencies in both client and server and run the each repo's start command

### Project approach

- **Styling**: I used Radix themes and tried to match all style tokens. Curiously, the main action button has a color "Purple" that does not seem to match the hex code but I'm a little bit color blind and so erred on the side of using the tokens specified in Figma. I did bring in `styled-components` to scope styles to specific components. I'm unsure if this is an anti-pattern with your design system.
- **Data fetching & cache**: I implemented RTK and RTK Query, which enables easy keying off of loading and error states.
  In this approach, I would normally use open-api codegen to create a swagger doc and generate code for all my query hooks. Since the instructions specified not to touch the /server repo, I did not annotate any of the endpoints and instead used Claude generative AI to create my API slice. In the approach, I had to redefine some types that are originally defined in the `/server` repo but they would be easily shared with a codegen approach. On the initial API request or Users tab, I need both Users and Roles, so I make both requests. When you click over to Roles, there is no network request made because we already have roles in the cache.
- **Routing**: I used `react-router-dom` with `<Outlet/>` component to navigate between Users and Roles tabs. On many projects I've worked on, deep linking ends up being a requirement, so I like initially scaffold a project to handle tab navigation that way.
- **Table actions**: I noticed that the `Dialog` component from Radix themes is uncontrolled and relies on a Dialog.Trigger component. This might be a little unorthodox, but since it relied on a trigger and I could not pass an open property to it, it meant that there would be a rendering inefficiency: basically rendering a modal for each row in the table. Instead, I chose to use the primitive `Dialog`, defaulting it to `open` and only rendering it conditionally in my component by keying off of a state value`
- **Forms**: I brought in react-hook-form for streamlined form control, error handling, and validation.
- **Components**: The main heavy lifting component I created to share between views was the `DataTable` component. I modeled this a little after my user experience with `mui-data-grid` where you pass columns and rows. The column definition specifies both a `property` and an options `renderCell` function. As the table iterates through the data, it decides how to safely render the content of cell, first checking if a `renderCell` function is available and then falling back to the accessing the property based on the data of type T. This component extends the `PaginatedResponse` type defined in the api and so it can show optional pagination

### Future Considerations:

- Updates on mutations instead of invalidating query tags for the whole list, would surgically update the list based on the new value for a and updated or created user/role
- Refactoring and organization of generic modal + forms
- Add animations
- Tests!!!

## Thanks for your time and consideration!!!

# Frontend Take-Home Assignment

Welcome to the WorkOS Frontend Take-Home Assignment!

In this exercise, you'll implement the UI for a simple two-tab layout that lists users and roles. You will also add limited functionality to update users and roles.

You should have recieved an invitation to view a Figma design file for the take-home assignment. If you haven't received and invitation email, please reach out to us.

To get you started, we've also provided a fully functional backend API. Keep in mind, you won’t need to implement all of the functionality implied by the design or backend API. Make sure to focus on the specific tasks outlined below.

Feel free to use any frontend framework and libraries you prefer — there’s no need to build everything from scratch. At WorkOS, we use [Radix Themes](https://www.radix-ui.com/), and it's perfectly fine if you want to leverage similar libraries. Just be ready to explain your decisions, including why you chose certain libraries and how they benefit the project.

If you have any questions, feel free to reach out — we're happy to clarify anything.

## Time Consideration

We value your time! If this assignment takes you more than 8 hours, please submit whatever you have at that point.

Focus on quality. You should be proud of your submission. While the code doesn't need to be 100% production-ready, it should be polished enough for a demo.

Be sure to include a README that outlines what you'd improve or do differently if you had more time.

## Getting Started

1. **Fork the Repo**: Start by forking this repository so that you have your own version to work with.
2. **Start the Backend API**:
   - Ensure you have the latest version of Node.js.
   - Run the following commands to install dependencies and start the API:
     ```bash
     cd server
     npm install
     npm run api
     ```
3. **Project Setup**: Add your project under the `client` directory.

## Design Reference

Be sure to consult the Figma design file that you were invited to view. You'll need to sign-in to Figma to access the design, so you may need to create a Figma account.

The design is a starting point — you'll need to fill in some details (e.g., loading states, error states, hover states). The "Roles" tab is not designed, so you'll infer the design based on what is provided for the "Users" tab.

For those portions of the exercise in which the design is given, your implementation should match the design as closely as possible. Attention to detail is important. It is certainly acceptable to deviate from the design if you are confident it is an improvement, but please explain your thinking in your README.

## Backend API

The API provides full CRUD support for users and roles, but you won’t need to use every endpoint.

**Do not alter the backend API**.

The API includes intentional latency and random server errors to simulate real-world scenarios. Ensure your front-end handles these gracefully.

You can adjust the API speed using the `SERVER_SPEED` environment variable:

- **slow**: Simulate slower network (`SERVER_SPEED=slow npm run api`)
- **instant**: Remove latency (`SERVER_SPEED=instant npm run api`)

You can run backend tests by executing `npm run test` in the `server` directory. The test code is located at `server/src/api.test.ts`.

## Tasks Overview

Work on the following tasks in this order. If you can’t complete all tasks, focus on quality rather than quantity.

1. Setup the "Users" and "Roles" tab structure
2. Add the users table
3. Add support for filtering the users table via the "Search" input field
4. Add support for deleting a user via the "more" icon button dropdown menu
5. Add support for viewing all roles in the "Roles" tab
6. Add support for renaming a role in the "Roles" tab
7. [Bonus] Add pagination to the user table

## Evaluation Criteria

We’ll evaluate based on the following:

- **User Experience (UX)**: Clean and intuitive interface.
- **Component Composition**: Modular and reusable components.
- **State Management & Caching**: Efficient handling of data.
- **Error & Loading States**: Graceful handling of API delays and errors.
- **CSS Animations**: Best practices followed for smooth UI interactions.
- **Code Quality**: Clean, well-structured, and maintainable code.
- **Accessibility**: Keyboard navigation and accessibility considerations.

## Submission Guidelines

**Please do not submit a pull request to the WorkOS repo.**

In your forked repository, include a README that explains:

- How to run your project.
- What you would improve or do differently if you had more time.

Once you're ready, share the URL to your GitHub repository with us. Make sure your code runs locally based on the instructions in your README.
