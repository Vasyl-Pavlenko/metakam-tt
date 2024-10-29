# Product Page with Radix UI and Framer Motion

This is a product page built with Next.js, Radix UI, and Framer Motion. It includes product variations with image switching, a dropdown for color selection, an animated "Add to Cart" feedback message, and a loading indicator for images. [DEMO LINK](https://metakam-tt.vercel.app/)

## Features

- **Color Variants**: Choose between different color options with Radix UI's custom select component.
- **Image Switching**: Click on arrows to change product images based on the selected variant.
- **Add to Cart Animation**: See a pop-up feedback animation each time a product is added to the cart.
- **Image Loader**: Shows a spinner while images load from external sources.
- **Responsive Layout**: Optimized layout for both mobile and desktop screens.

## Tech Stack

- [Next.js](https://nextjs.org/) - The React Framework for production.
- [Radix UI](https://www.radix-ui.com/) - Primitives for building accessible, unstyled UI components.
- [Framer Motion](https://www.framer.com/motion/) - Library for animations and transitions.
- [React Icons](https://react-icons.github.io/react-icons/) - Icons for navigation and actions.

## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/your-username/metakam-tt.git
cd metakam-tt
npm install
```

## Running the Application

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

**Build for production:**

```bash
npm run build
```

## Project Structure

- components/: Contains custom UI components.
- public/: Static assets such as placeholder images.
- pages/: Next.js pages, including index.tsx as the main product page.

## Usage

1. Choose a Product Variant: Select a color from the dropdown to switch the product image and description.
2. Navigate Images: Use the left and right arrows to navigate between images.
3. Add to Cart: Click the "Add to Cart" button to see an animated feedback message. This also updates the cart count.

## Deployment

The project is deployed using Vercel CLI/

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

### Happy coding

I hope you enjoy exploring and contributing to my project. If you have any questions or feedback, feel free to reach out. Let's build amazing experiences together!
