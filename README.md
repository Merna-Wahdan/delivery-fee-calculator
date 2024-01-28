# Delivery Fee Calculator

![screenshot](./screenshots/Calculator%20screenshot.png)

## Overview

This project is a React-based web application that provides a user-friendly interface for calculating delivery fees. It takes into account various factors such as cart value, delivery distance, number of items, and time of order to determine the appropriate delivery charge.

## Features

- **Calculator Interface**: A form where users can input cart value, delivery distance, number of items, and select the time of order.

- **Responsive Design**: The UI is responsive and user-friendly, making it accessible on various devices.

- **Internationalization**: The application is prepared for internationalization, allowing for easy localization.

## Getting Started

### Installation

Install:

```sh

npm  install

```

### Running the Application

1. To start the application, run:

```sh

npm start

```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

This project includes unit and component tests. To run the tests, execute:

```sh

npm  test

```

## File Structure

- `src/`: Source files for the application.

  - `App.tsx`: Main React component.

  - `Calculator.tsx`: Component for the delivery fee calculator.

  - `CalculatorHandler.tsx`: Utility functions for fee calculation.

  - `components/`: Reusable components.

  - `locales/`: Localization files.

- `public/`: Public files like images and the `index.html`.

- `tests/`: Test files for the application.

## Decisions

**Styling**:

- I have used [chakra ui](https://github.com/chakra-ui/chakra-ui) because I was familiar with it.
  **Alternatives**:

    -  Build the UI from scratch using only CSS.

    -  Use another library like [MaterialUI](https://mui.com/core/)

**Code Structure**:

- Separated the logic from the component code into the `CalculatorHandler.tsx` file.

**Parameterized Tests**:

- Used Parameterized Tests to test calculation functions.
