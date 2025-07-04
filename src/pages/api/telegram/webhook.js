import { sendPoll } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;
    console.log("UPDATE:", JSON.stringify(update, null, 2));
    const message = update.message;
    const text = message?.text;
    const entities = message?.entities;
    const chatId = message?.chat?.id;

    const isCommand = entities?.some(e => e.type === "bot_command");

    if (isCommand && text.startsWith("/enviar_poll")) {
      console.log("Comando /enviar_poll detectado:", chatId);

      const question = "Tô testando galera";
      const options = ["👍 Bom", "👎 Ruim"];
      await sendPoll(chatId, question, options);

      console.log("Poll enviada para:", chatId);
    }

    res.status(200).send("ok");
  } else {
    res.status(405).send("Method not allowed");
  }
}
