import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface ProductItem {
  name: string;
  price: string;
  desc: string;
  image: string;
}

const CreateShowcaseScreen: React.FC = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("bg-slate-900 text-white");

  const [items, setItems] = useState<ProductItem[]>([
    { name: "", price: "", desc: "", image: "" },
  ]);

  const [loadingAI, setLoadingAI] = useState<number | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const addProductField = () => {
    setItems([...items, { name: "", price: "", desc: "", image: "" }]);
  };

  const handleItemChange = (index: number, field: keyof ProductItem, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const generateAIDesc = async (index: number) => {
    if (!items[index].name) {
      setMessage("Please provide a Product Name for this item.");
      return;
    }
    try {
      setLoadingAI(index);
      const res = await axios.post("/api/ai/generate-desc", { productName: items[index].name });
      handleItemChange(index, "desc", res.data.description);
      setMessage("AI Description generated!");
    } catch (error) {
      setMessage("Error connecting to the AI.");
    } finally {
      setLoadingAI(null);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setUploading(index);
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post("/api/upload", formData, config);
        handleItemChange(index, "image", data.image);
        setMessage("Image Uploaded!");
      } catch (error) {
        setMessage("Image Upload Failed!");
      } finally {
        setUploading(null);
      }
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const showcaseData = { slug, title, theme, items };
      await axios.post("/api/showcases", showcaseData, config);
      alert("Successfuly created Showcase!");
      navigate("/");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to save the Showcase.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Create New Showcase 🚀</h2>
      {message && <div className="bg-indigo-100 text-indigo-700 p-3 mb-4 rounded text-center font-medium">{message}</div>}

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" className="w-full p-2 border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Showcase Title" />
          <input type="text" className="w-full p-2 border rounded-md" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} required placeholder="URL Slug" />
        </div>

        <hr />

        {items.map((item, index) => (
          <div key={index} className="p-4 border border-indigo-100 rounded-lg bg-gray-50 space-y-4">
            <h4 className="font-bold text-indigo-600">Item {index + 1}</h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" className="w-full p-2 border rounded-md" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} required placeholder="Product Name" />
              <input type="text" className="w-full p-2 border rounded-md" value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} required placeholder="Price" />
            </div>
            <input type="file" onChange={(e) => uploadFileHandler(e, index)} className="w-full p-2 border rounded-md" />
            {uploading === index && <p className="text-blue-500">Uploading...</p>}
            <div className="flex space-x-2">
              <textarea className="w-full p-2 border rounded-md h-20" value={item.desc} onChange={(e) => handleItemChange(index, "desc", e.target.value)} required placeholder="Description..."></textarea>
              <button type="button" onClick={() => generateAIDesc(index)} disabled={loadingAI === index} className="bg-purple-600 text-white px-4 rounded-md">
                {loadingAI === index ? "..." : "Gen AI"}
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addProductField} className="w-full border-2 border-dashed border-indigo-200 p-2 text-indigo-600 font-bold hover:bg-indigo-50">
          + Add Another Product
        </button>

        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 font-bold">
          Publish Showcase
        </button>
      </form>
    </div>
  );
};

export default CreateShowcaseScreen;