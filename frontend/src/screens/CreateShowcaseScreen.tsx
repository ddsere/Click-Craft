import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const CreateShowcaseScreen: React.FC = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("bg-slate-900 text-white");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);
  const [message, setMessage] = useState("");

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const generateAIDesc = async () => {
    if (!itemName) {
      setMessage("Please provide a Product Name.");
      return;
    }
    try {
      setLoadingAI(true);
      const res = await axios.post("/api/ai/generate-desc", {
        productName: itemName,
      });
      setItemDesc(res.data.description);
      setMessage("You've successfuly generated an AI Description!");
    } catch (error) {
      setMessage("Error connecting to the AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post("/api/upload", formData, config);
        setImage(data.image);
        setMessage("Image Uploaded Successfully!");
      } catch (error) {
        setMessage("Image Upload Failed!");
      } finally {
        setUploading(false);
      }
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const showcaseData = {
        slug,
        title,
        theme,
        items: [
          { id: 1, name: itemName, price: itemPrice, desc: itemDesc, image },
        ],
      };

      await axios.post("/api/showcases", showcaseData, config);
      alert("Successfuly created Showcase!");
      navigate("/");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Failed to save the Showcase.",
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Create New Showcase 🚀
      </h2>

      {message && (
        <div className="bg-indigo-100 text-indigo-700 p-3 mb-4 rounded text-center font-medium">
          {message}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Showcase Title
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ex: Pro Gaming Gear"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              URL Slug (No spaces)
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              required
              placeholder="Ex: pro-gaming-gear"
            />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="text-xl font-semibold text-gray-800">
          Add Product Item
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              placeholder="Ex: Mechanical Keyboard"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
              placeholder="Ex: Rs. 15,000"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Product Image
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-md mb-2 bg-gray-100"
            value={image}
            readOnly
            placeholder="Image URL will appear here"
          />
          <input
            type="file"
            onChange={uploadFileHandler}
            className="w-full p-2 border rounded-md"
          />
          {uploading && <p className="text-blue-500 mt-1">Uploading...</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Description (AI Powered ✨)
          </label>
          <div className="flex space-x-2">
            <textarea
              className="w-full p-2 border rounded-md h-24"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              required
              placeholder="Write here or let AI generate for you..."
            ></textarea>
            <button
              type="button"
              onClick={generateAIDesc}
              disabled={loadingAI}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-md font-semibold transition"
            >
              {loadingAI ? "Generating..." : "Gen AI"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition font-bold text-lg"
        >
          Publish Showcase
        </button>
      </form>
    </div>
  );
};

export default CreateShowcaseScreen;
