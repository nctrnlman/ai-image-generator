import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(false);
  const apiKey = "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";
  const inputRef = useRef(null);
  const imageRef = useRef(null);

  const defaultImageParams = {
    n: 1,
    size: "1024x1024",
  };

  async function generateImage(apiKey, promptText, imageParams) {
    try {
      setLoading(true);

      const apiUrl = "https://api.openai.com/v1/images/generations";

      const response = await axios.post(
        apiUrl,
        {
          prompt: promptText,
          ...imageParams,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedImage = response.data.data[0].url;
      console.log("Generated Image URL:", generatedImage);
      return generatedImage;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const sendMessage = async () => {
    const userInput = inputRef.current.value.trim();
    if (userInput) {
      const generatedImageUrl = await generateImage(
        apiKey,
        userInput,
        defaultImageParams
      );

      inputRef.current.value = "";

      imageRef.current.src = generatedImageUrl;
    }
  };

  return (
    <div>
      {/* <h1 className="text-red">Hello</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

// <img
//   ref={imageRef}
//   className="mb-4 rounded"
//   alt="Generated Image"
//   style={{ display: loading ? "none" : "none" }}
// />
// <div className="bg-slate-800 p-4 rounded shadow-md w-full">
//   <div className="mt-2 flex items-center">
//     <input
//       ref={inputRef}
//       type="text"
//       placeholder="Type your message..."
//       className="flex-1 p-2 border rounded border-gray-300 focus:outline-none"
//     />
//     <button
//       onClick={sendMessage}
//       className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//       disabled={loading}
//     >
//       Send
//     </button>
//   </div>
// </div>
