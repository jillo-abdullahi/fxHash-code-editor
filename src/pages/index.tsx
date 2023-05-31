import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";
import Head from "next/head";
import JSZip from "jszip";

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
        // open iframe document and write the sanitized code
        const doc = iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(htmlTemplate(code));
          doc.close();
        }
      }
    }, 1000); // 1 second throttle

    return () => clearTimeout(timer);
  }, [code]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      // remove potentially malicious code
      const sanitizedCode = DOMPurify.sanitize(value);
      setCode(sanitizedCode);
    }
  };

  const handlePublish = () => {
    let zip = new JSZip();
    zip.file(
      "index.html",
      new Blob([htmlTemplate(code)], { type: "text/html" })
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      let url = URL.createObjectURL(content);
      let a = document.createElement("a");
      a.href = url;
      a.download = "project.zip";
      a.click();
    });
  };

  return (
    <main className="flex space-x-4 bg-gray-800 p-6 h-full min-h-screen items-center justify-center">
      <Head>
        <title key="title">Code Editor</title>
      </Head>
      <div className="border border-gray-700 rounded-lg overflow-hidden w-1/2">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// start coding..."
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>

      <div className="flex flex-col space-y-4 w-1/2 h-full">
        <iframe
          title="preview"
          ref={iframeRef}
          className="w-full bg-transparent rounded-lg border-gray-700 border h-4/5"
        />
        <button
          className="rounded-lg px-8 py-4 bg-gray-600 uppercase font-bold h-1/5 hover:bg-gray-500 text-gray-200 transition-colors duration-200 ease-linear"
          onClick={handlePublish}
        >
          Export/Publish
        </button>
      </div>
    </main>
  );
};

export default App;
