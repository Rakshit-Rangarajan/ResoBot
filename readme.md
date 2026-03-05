<div>
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:000000,100:A32ACB&text=ResoBot&section=header&fontColor=ffffff&fontAlign=50&fontAlignY=35&animation=scaleIn&stroke=000000&strokeWidth=2" alt="# ResoBot 🏴󠁧󠁢󠁷󠁬󠁳󠁿" />
</div>

<div align="right">
<b>Author:</b> Rakshit Rangarajan
</div>

<hr>

## 📖 Overview and My Experience
<div align="justify">
ResoBot is a secure, customizable, and embeddable AI chatbot widget designed to act as an expert legal mediator and conflict resolution assistant. The platform provides a beautiful React-based frontend configuration tool that allows users to generate a one-line script tag to embed a fully functional, highly responsive AI assistant directly into any website.

This project was born out of a desire to build a private-by-design AI memory system. I wanted to create a tool that leverages the power of Large Language Models (LLMs) without compromising sensitive user documents by sending them to third-party servers. Building ResoBot allowed me to dive deep into local AI inference using Ollama and Retrieval-Augmented Generation (RAG) using Pinecone vector databases. 

Developing the seamless communication between a customized React widget, a FastAPI backend, and a locally hosted Llama 3.1 model was a challenging but incredibly rewarding experience. It taught me how to handle cross-origin requests (CORS) securely, manage vector embeddings dynamically, and deploy decoupled micro-frontend architectures via Vercel. Every line of code in this project was an opportunity to optimize for sub-second latency and absolute data privacy.
</div>

---

## ✨ Key Features

* **One-Step Deployment:** Paste a single `<script>` tag into any site's header or footer to embed the chat widget instantly.
* **Private by Design:** Optimized for local inference. Document context and queries are processed locally, ensuring data never touches a third-party LLM server.
* **Custom AI Personalities:** Utilizes `Modelfiles` via Ollama to define firm-specific mediator personalities and behavioral guardrails.
* **Retrieval-Augmented Generation (RAG):** Integrates Pinecone vector databases to fetch precise, context-aware answers from ingested custom documents.
* **Widget Stylist:** A beautiful UI configurator to instantly customize the bot's name, primary branding colors, and database index.
* **Instant Response:** Built with a lightweight FastAPI backend for blazing-fast local processing.

---

## 🛠️ Technology Stack

* **Frontend:** <br>
      <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 14" /></a>
      <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
      <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
      <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
      <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" /></a>
* **Backend (API):** <br>
      <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" /></a>
      <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" /></a>
* **AI & Machine Learning:** <br>
      <a href="https://ollama.com/"><img src="https://img.shields.io/badge/Ollama_(Llama_3.1)-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" /></a>
      <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1.5"><img src="https://img.shields.io/badge/Nomic_Embeddings-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Nomic Embeddings" /></a>
* **Database & Memory:** <br>
      <a href="https://www.pinecone.io/"><img src="https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white" alt="Pinecone" /></a>
* **Deployment:** <br>
      <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>

---

## 🚀 Getting Started

Follow these instructions to get the full application (frontend configuration UI and backend API) running locally.

### Prerequisites

* Node.js (v18 or later) & `npm` or `pnpm`
* Python (v3.9 or later) & `pip`
* **Ollama:** You must have [Ollama](https://ollama.com/) installed and running locally. You need to pull the required models by running:
  ```bash
  ollama pull llama3.1
  ollama pull nomic-embed-text
  ```

### 1. Frontend Setup (Next.js)

1.  **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

### 2. Backend Setup (FastAPI)

1.  **Navigate to the backend directory:**
    ```bash
    cd back-end
    ```
2.  **Create a virtual environment (Recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install dependencies from `requirements.txt`:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up environment variables:**
    * Create a file named `.env` in the backend directory.
    * Add your Pinecone and local storage configurations:
        ```env
        PINECONE_API_KEY=your_pinecone_api_key_here
        PINECONE_ENVIRONMENT=your_pinecone_environment
        PINECONE_INDEX_NAME=resollect-brain
        OLLAMA_ACCESS_URL=http://localhost:11434
        TRAIN_DOX_PATH=./training_data
        ```

---

## 🏃 Usage

You need to run both the frontend UI and backend API servers simultaneously for full functionality.

1.  **Start the Backend API Server:**
    * In your backend directory terminal:
    ```bash
    fastapi dev main.py
    ```
    * The API will be available at `http://127.0.0.1:8000`.

2.  **Start the Frontend Development Server:**
    * In a **new terminal**, navigate to your frontend directory and ensure it is running:
    ```bash
    npm run dev
    ```
    * Open [http://localhost:3000](http://localhost:3000) in your browser to access the Widget Stylist and get your embed code.

### Deployment Links

<a href="https://resobot.rakshitr.co.in" target="_blank">
  <img src="https://img.shields.io/badge/Live%20Demo-ResoBot-%237C3AED?style=for-the-badge&logo=vercel&logoColor=white" alt="ResoBot UI Configurator" />
</a> &emsp;
<a href="https://api.rakshitr.co.in/resobot/docs" target="_blank">
  <img src="https://img.shields.io/badge/Swagger%20Link-ResoBot%20API-%237C3AED?style=for-the-badge&logo=fastapi&logoColor=white" alt="ResoBot Swagger Link" />
</a>

<hr>

## 📂 Project Structure

```text
ResoBot/
├── front-end/     # Next.js Application & Embeddable Widget
│   ├── app/
│   ├── components/
│   ├── public/    # Contains the raw chatbot-embed.js script
│   └── ...
├── back-end/      # Python FastAPI
│   ├── main.py    # Main API routes for chat and ingestion
│   ├── config.py  # Environment variable management
│   ├── Modelfile  # Custom Ollama personality instructions
│   ├── requirements.txt
│   └── venv/
└── README.md
```
## 🖼️ Gallery

*(Note: Add your actual screenshots to your repository and replace the `src` links below)*

<table align="center">
  <tr>
    <td align="center">
      <img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/1ddf6879-5b58-4a2b-8abd-9ebd366042b4" />
      <br>
      <i>ResoBot Configurator UI</i>
    </td>
    <td align="center">
      <img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/5c24d1d2-8980-41d5-9aab-8cd095404084" />
      <br>
      <i>One-Click Embed Script Generator</i>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="400" height="550" alt="image" src="https://github.com/user-attachments/assets/380f17fd-2f72-45bc-92de-5c19a521648d" />
      <br>
      <i>Active Chatbot Widget</i>
    </td>
    <td align="center">
      <img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/64aff223-2437-49fc-8ab1-f16e33268a55" />
      <br>
      <i>Backend Swagger API Documentation</i>
    </td>
  </tr>
</table>

<hr>
<div align="center">
  <a href="https://linkedin.com/in/rakshit-rangarajan-2084b2211/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:rakshitr2000@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://www.rakshitr.co.in" target="_blank"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=about.me&logoColor=white" alt="Website" /></a>
</div>
