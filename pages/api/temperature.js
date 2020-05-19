import nextConnect from "next-connect";
import middleware from "utils/database";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { date } = req.query;

  let doc = {};
  if (date) {
    doc = await req.db
      .collection("temperature")
      .findOne({ date: new Date(date) });
  } else {
    doc = await req.db
      .collection("temperature")
      .findOne({}, { sort: [["date", "desc"]] });
  }
  if (doc == null) {
    const dataModel = {
      _id: new ObjectID(),
      date: date,
      temperature: 98,
    };
    doc = dataModel;
  }
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  data.date = new Date(data.date);
  let doc = await req.db
    .collection("temperature")
    .updateOne({ date: new Date(data.date) }, { $set: data }, { upsert: true });

  res.json({ message: "ok" });
});

export default (req, res) => handler.apply(req, res);
