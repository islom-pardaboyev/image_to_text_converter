import { FileText, LucideLoader2, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { createWorker } from "tesseract.js";

function ImageToTextZone() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [textAtImage, setTextAtImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function imageToText(state: string) {
    try {
      setLoading(true);
      const worker = await createWorker("eng");
      const ret = await worker.recognize(state);
      setTextAtImage(ret.data.text);
      toast.success("Image processed successfully");
      await worker.terminate();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error while processing image");
    }
  }
  return (
    <section className="bg-(--bg-color) w-full h-screen overflow-y-auto p-8">
      <main className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image to Text Converter
          </h1>
          <p className="text-gray-600">
            Upload an image and we'll extract the text for you
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <label
            htmlFor="image-upload"
            className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-600">Click to upload an image</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setImage(URL.createObjectURL(e.target.files![0]));
              }}
              className="hidden"
            />
          </label>
          {image && (
            <div className="space-y-4 mt-6">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain"
                  />
              </div>
              <button
                disabled={loading}
                onClick={() => imageToText(image)}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <LucideLoader2 className="animate-spin " />
                    Loading...
                  </span>
                ) : (
                  "Extract Text"
                )}
              </button>
            </div>
          )}
        </div>
        {textAtImage && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Extracted Text
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="whitespace-pre-wrap text-gray-700">{textAtImage}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(textAtImage);
                toast.success("Text copied to clipboard");
              }}
              className="w-full py-3 px-4 mt-5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Copy
            </button>
          </div>
        )}
      </main>
    </section>
  );
}

export default ImageToTextZone;
