import connectDB from "@/lib/mongodb";
import cloudinary from "cloudinary";
import multiparty from "multiparty";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function handle(req, res) {
  await connectDB();
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const links = [];
  for (const file of files.file) {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "Inkvision",
      public_id: `file_${Date.now()}`,
      resource_type: "auto",
    });
    const link = result.secure_url;
    links.push(link);
  }
  return res.json({ links });
}
export const config = {
  api: { bodyParser: false },
};
