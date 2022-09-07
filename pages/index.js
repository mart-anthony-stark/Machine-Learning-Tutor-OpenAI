import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

export default function Home({ api_key }) {
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);

  const handleQuery = async () => {
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "What is a statistical model?",
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
      });
      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleQuery();
  }, []);

  return (
    <div>
      <textarea value={response} readOnly></textarea>
    </div>
  );
}

export async function getServerSideProps() {
  const api_key = process.env.OPENAI_API_KEY;
  return {
    props: {
      api_key,
    },
  };
}
