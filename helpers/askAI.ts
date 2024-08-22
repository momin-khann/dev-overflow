async function askAI(data: string) {
  // @ts-ignore
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ask-ai`,
    {
      method: "POST",
      body: JSON.stringify({ data }),
    },
  );

  // @ts-ignore
  const json = await response.json();

  return json.reply;
}
export default askAI;
