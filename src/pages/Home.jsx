import React, { useState } from "react";
import axios from "axios";
import SpaceBackground from "../component/SpaceBackground.jsx";
import codenitoLogo from "../assets/logo-light.png";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineSend } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const apiKey = process.env.API_KEY;

  const defaultImageParams = {
    n: 1,
    size: "1024x1024",
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const generatedImageStyle = {
    maxWidth: "100%",
    maxHeight: "500px",
    margin: "0 0",
  };

  const loadingSpinnerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  async function generateImage(apiKey, userInput, defaultImageParams) {
    try {
      if (!userInput) {
        throw new Error("Please describe your image.");
      }

      setLoading(true);
      const apiUrl = "https://api.openai.com/v1/images/generations";

      const response = await axios.post(
        apiUrl,
        {
          prompt: userInput,
          ...defaultImageParams,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedImageUrl = response.data.data[0].url;
      // console.log("Generated Image URL:", generatedImageUrl);
      setUserInput("");
      setGeneratedImage(generatedImageUrl);
      setDownloadUrl(generatedImageUrl);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateClick = async () => {
    if (userInput) {
      await generateImage(apiKey, userInput, defaultImageParams);
    } else {
      toast.error("Please input first");
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerateClick();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative">
      <SpaceBackground />
      <div className="mb-4 text-5xl font-bold text-gray-300 pt-10">
        AI Generator Image
        <div className="flex justify-end">
          <span className="block text-sm font-normal mt-2">
            powered by
            <img
              src={codenitoLogo}
              alt="Codenito Logo"
              className="h-8 ml-2 inline"
            />
          </span>
        </div>
      </div>
      <ToastContainer />
      <div className="flex items-center w-3/4 justify-center pb-40 space-y-4">
        {loading && (
          <div style={loadingSpinnerStyle}>
            <BarLoader
              css={override}
              size={60}
              color={"#61dafb"}
              loading={loading}
            />
          </div>
        )}
        {generatedImage && !loading && (
          <div style={loadingSpinnerStyle}>
            <img
              src={generatedImage}
              alt="Generated Image"
              style={generatedImageStyle}
            />
          </div>
        )}

        <input
          type="text"
          placeholder="Generate an image from your text..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="flex-1 p-2 mt-4 border rounded-lg border-gray-300 bg-transparent focus:outline-none h-12 text-white max-w-[500px]"
        />
        <button
          onClick={handleGenerateClick}
          className="ml-2 px-4 py-2 bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-50 focus:outline-none flex items-center h-12"
          disabled={loading}
        >
          <AiOutlineSend className="" />
        </button>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            download="generated_image.jpg"
            className="ml-2 px-4 py-2 bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-50 focus:outline-none flex items-center h-12"
          >
            <FaDownload className="" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Home;
