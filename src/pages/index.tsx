import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";
import Head from "next/head";

// Define the base HTML template
const htmlTemplate = (jsCode: string) => `
<!DOCTYPE html>
<html>
  <head>
    <script>
    ${jsCode}
    </script>
  </head> 
  <body>
  </body>
</html>
`;

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        // remove potentially malicious js code
        const sanitizedCode = DOMPurify.sanitize(code);

        // open iframe document and write the sanitized code
        const doc = iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(htmlTemplate(sanitizedCode));
          doc.close();
        }
      }
    }, 1000); // 1 second throttle

    return () => clearTimeout(timer);
  }, [code]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <main className="flex space-x-4 bg-gradient-to-r bg-gray-800 p-6 h-full min-h-screen items-center justify-center">
      <Head>
        <title key="title">Code Editor</title>
      </Head>
      <div className="border border-gray-700 rounded-lg overflow-hidden w-1/2">
        <Editor
          height="90vh"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// start coding..."
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>

      <div className="flex flex-col space-y-4 w-1/2">
        <iframe
          title="preview"
          ref={iframeRef}
          className="w-full bg-gray-100 rounded-lg border-gray-700 border"
          style={{
            width: "100%",
            height: "90vh",
          }}
        />
      </div>
    </main>
  );
};

export default App;
