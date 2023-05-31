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
    <main className="flex flex-col md:flex-row space-x-0 space-y-4 md:space-x-4 md:space-y-0 bg-gray-800 p-6 h-full min-h-screen items-center justify-center">
      <Head>
        <title key="title">Code Editor</title>
      </Head>
      <div className="border border-gray-700 rounded-lg overflow-hidden w-full md:w-1/2 h-full">
        <Editor
          height="90vh"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// start coding..."
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>

      <div className="flex flex-col space-y-4 justify-between w-full md:w-1/2 h-[90vh]">
        <iframe
          title="preview"
          ref={iframeRef}
          className="w-full bg-transparent rounded-lg border-gray-700 border h-full min-h-5/6"
        />
        <button
          className={`rounded-lg px-8 py-4 bg-gray-600 uppercase font-bold text-gray-200 transition-colors duration-200 ease-linear
          ${!code ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
          onClick={handlePublish}
          disabled={!code}
        >
          Export/Publish
        </button>
      </div>
    </main>
  );
};

export default App;
