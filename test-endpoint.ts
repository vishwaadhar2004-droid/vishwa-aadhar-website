import fetch from "node-fetch";

async function testEndpoint() {
  const payload = {
    messages: [
      { role: "user", content: "Tell me about bio-cement bricks" }
    ],
    model: "llama-3.1-8b-instant"
  };

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Endpoint HTTP Status:", response.status);
    const body = await response.json();
    console.log("Endpoint Response Data:", JSON.stringify(body, null, 2));
  } catch (err: any) {
    console.error("Failed to hit endpoint:", err.message || err);
  }
}

testEndpoint();
