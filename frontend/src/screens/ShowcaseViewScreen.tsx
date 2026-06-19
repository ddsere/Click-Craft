import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface ShowcaseData {
  title: string;
  theme: string;
  user: { name: string };
  items: {
    _id: string;
    name: string;
    price: string;
    desc: string;
    image?: string;
  }[];
}

const ShowcaseViewScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [showcase, setShowcase] = useState<ShowcaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const res = await axios.get(`/api/showcases/${slug}`);
        setShowcase(res.data);
      } catch (err: any) {
        setError(
          "Showcase එක සොයාගැනීමට නොහැක! Slug එක නිවැරදිදැයි පරීක්ෂා කරන්න.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShowcase();
  }, [slug]);

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-bold">
        Loading Showcase... ⏳
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-600 font-bold text-xl">
        {error}
      </div>
    );
  if (!showcase) return null;

  return (
    <div
      className={`min-h-[85vh] ${showcase.theme} flex flex-col items-center justify-center py-12 px-4 transition-all duration-500`}
    >
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          {showcase.title}
        </h1>
        <p className="text-lg opacity-80 mb-12">
          Curated by{" "}
          <span className="font-semibold text-indigo-400">
            {showcase.user.name}
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {showcase.items.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition flex flex-col md:flex-row gap-8"
            >
              {item.image && (
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg shadow-md object-cover w-full max-h-64"
                  />
                </div>
              )}

              <div className="w-full md:w-2/3 text-left">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-white">{item.name}</h2>
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-xl shadow-md">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed mt-4">
                  ✨ {item.desc}
                </p>
                <button className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg w-auto">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-indigo-300 hover:text-white underline font-medium"
          >
            &larr; Back to ClickCraft Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseViewScreen;
