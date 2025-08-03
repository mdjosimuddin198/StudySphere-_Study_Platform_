import React, { useState } from "react";
import useAxois from "../../useAxois/useAxois";
import Swal from "sweetalert2";

const UploadMaterialModal = ({ session, tutorEmail, onClose }) => {
  const axoisInstece = useAxois();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    // Upload image to imgBB or your preferred service
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`; // Replace
    const imageRes = await fetch(imgbbAPI, {
      method: "POST",
      body: formData,
    });
    const imageData = await imageRes.json();
    const imageUrl = imageData.data.url;

    const materialData = {
      title,
      sessionId: session._id,
      tutorEmail,
      imageUrl,
      link,
    };
    console.log(materialData);
    try {
      await axoisInstece.post("/materials", materialData);
      Swal.fire("Success!", "Material uploaded successfully.", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error!", "Failed to upload material.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4">
        <h3 className="text-xl font-bold text-[#00E1FF] mb-2">
          Upload Materials
        </h3>
        <form onSubmit={handleUpload} className="space-y-3">
          <input
            type="text"
            placeholder="Material Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={session._id}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            type="email"
            value={tutorEmail}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
            required
          />
          <input
            type="url"
            placeholder="Google Drive Link"
            className="input input-bordered w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn bg-[#00E1FF] text-black">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterialModal;
