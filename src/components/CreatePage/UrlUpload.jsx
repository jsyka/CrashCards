import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./UrlUpload.css";

const UrlUpload = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [uploadMethod, setUploadMethod] = useState(true);

  useEffect(() => {
    // Fetch CSRF token from Django
    axios
      .get("api/csrf-token/")
      .then((response) => setCsrfToken(response.data.csrfToken))
      .catch((error) => console.error("Error fetching CSRF token:", error));
  }, []);

  const handleGenerate = async (notes) => {
    console.log("notes going in: ", notes);
    alert(
      "Flashcards are being generated, please be patient! Try again in 15 seconds if text is not generated."
    );
    try {
      const response = await fetch("api/generate-flashcards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      // setFlashcards(data);
      console.log("FCS:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Sorry, an error occured while generating your flashcards. Please try again later.")
    }
  };

  // useEffect(() => {
  //   // Fetch CSRF token from Django
  //   axios.get('http://localhost:8000/csrf-token/')
  //     .then(response => setCsrfToken(response.data.csrfToken))
  //     .catch(error => console.error('Error fetching CSRF token:', error));
  // }, []);

  // const handleGenerate = async () => {
  //   axios.post("/api/generate-flashcards/")
  //   .then((response) => {
  //     console.log(response);  // Log the response data
  //   })
  //   .catch((error) => {
  //     console.log("error...", error);
  //   });
  // };

  function parseResponse(response) {
    let caption = response["caption"]["text"];
    console.log("This looks like a " + caption);
    let contents = "";
    for (const tb of response["textBlocks"]) {
      for (const line of tb["lines"]) {
        contents += line["text"] + "\n";
      }
      contents += "\n";
    }
    setNotes(contents);
    console.log(contents);
    handleGenerate(contents);
  }

  useEffect(() => {
    // Fetch data from the OCR API endpoint
    axios
      .get(`http://localhost:5001/api/analyze-image?imageUrl=${imageUrl}`)
      .then((response) => {
        // Log the response data to the console
        console.log("API Response:", response.data);
        parseResponse(response.data);
      })
      .catch((error) => {
        // Log any errors to the console
        console.error("API Error:", error);
      });
  }, []);

  const handleChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted URL:", imageUrl);

    axios
      .get(`http://localhost:5001/api/analyze-image?imageUrl=${imageUrl}`)
      .then((response) => {
        // Log the response data to the console
        console.log("API Response:", response.data);
        parseResponse(response.data);
      })
      .catch((error) => {
        // Log any errors to the console
        console.error("API Error:", error);
      });
  };

  const flashcardList = flashcards.map((fc) => (
    <FakeCard question={fc.front} answer={fc.back} />
  ));

  function changeMethod() {
    setUploadMethod(!uploadMethod);
  }

  return (
    <div className="upload-banner-container">
      <div className="upload-banner">
        <div className="upload-contents">
          {uploadMethod ? (
            <>
              <h2>
                Upload your image URL to create automatically generated
                flashcards!
              </h2>
              <form onSubmit={handleSubmit} className="url-form">
                {/* <label htmlFor="urlInput">Enter URL:</label> */}
                <input
                  id="urlInput"
                  type="text"
                  value={imageUrl}
                  onChange={handleChange}
                  placeholder="Enter an image URL"
                  required
                />
                <button type="submit">Submit</button>
                <p>Or</p>
                <button onClick={changeMethod}>Upload Text</button>
              </form>
            </>
          ) : (
            <>
              <h2>
                Paste your notes below to create automatically generated
                flashcards!
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter your notes here"
              />
              <button onClick={() => handleGenerate(notes)}>Submit</button>
              <p>Or</p>
              <button onClick={changeMethod}>Upload Image</button>
            </>
          )}
        </div>
      </div>
      <div className="card-results">{flashcardList}
      <button className="save"> I like it! </button>
      </div>

    </div>
  );
};

function FakeCard({ question, answer }) {
  return (
    <div>
      <div>Q: {question}</div>
      <div>A: {answer}</div>
      <br/>
    </div>
  );
}

export default UrlUpload;
