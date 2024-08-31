import mongooseConnect from "@/lib/mongoose";
import { BlackList } from "@/models/BlackList";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    const admins = await BlackList.find();
    res.json(admins);
  }

  if (method === 'POST') {
    const { email } = req.body;
    try {
      const admin = await BlackList.create({ email });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (method === 'PUT') {
    const { email, newEmail } = req.body;
    try {
      const admin = await BlackList.findOneAndUpdate({ email }, { email: newEmail }, { new: true });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (method === 'DELETE') {
    const { email } = req.body;
    try {
      const admin = await BlackList.findOneAndDelete({ email });
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}