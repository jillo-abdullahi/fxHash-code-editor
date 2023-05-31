# Next.js Standalone Project Publishing Platform

This project is a standalone project publishing platform where users can write JavaScript code, see a real-time preview of the code, and download the code as a ZIP file containing an HTML document. The platform uses Next.js, React, TypeScript, the Monaco Editor for the code editor, and JSZip for generating the ZIP file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js installed on your machine. This project was built using Node.js version 14.x.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/jillo-abdullahi/fxHash-code-editor.git
    ```
    
2. Install the dependencies
    ```bash
    cd code-editor
    npm install
    ```

3. Start the Next.js development server
    ```bash
    npm run dev
    ```
    
4. Open a browser and navigate to `http://localhost:3000` to see the application running.

## Features

- **Code Editor**: A feature-rich code editor using Monaco Editor with JavaScript syntax highlighting.

- **Real-time Preview**: An iframe that displays a real-time preview of the user's JavaScript code.

- **Downloadable ZIP file**: The ability for the user to download a ZIP file containing an HTML document with their code.

## Built With

- [Next.js](https://nextjs.org/) - The web framework used
- [React](https://reactjs.org/) - The library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - The language for application-scale JavaScript
- [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react) - The library for adding the Monaco Editor to the project
- [JSZip](https://stuk.github.io/jszip/) - The library for generating ZIP files
- [DOMPurify](https://github.com/cure53/DOMPurify) - The library for sanitizing HTML

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to the creators and contributors of Next.js, React, TypeScript, Monaco Editor, JSZip, and DOMPurify for their wonderful work.
