import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./UrlUpload.css";

export default function UrlUpload() {
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

  const flashcardList = flashcards.map((fc, i) => (
    // <FakeCard question={fc.card_front} answer={fc.card_back} />
    <FakeCard question={fc.front} answer={fc.back} index={i}/>
  ));

  //call backend to create and save new deck of flashcards
  const saveFlashcards = async () => {
    const deckTitle = prompt("Enter a title for your flashcard deck:", "Untitled Deck");
    if (!deckTitle) {
      alert("You must provide a title to save the flashcards.");
      return;
    }

    console.log("starting here, ", flashcards)
    try {
      const response = await fetch("api/save-flashcards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ flashcards, deckTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to save flashcards");
      }

      const data = await response.json();
      console.log("save flashcard response:", data);
      setImageUrl("");
      setNotes("");
      setFlashcards([]);
      alert("Your flashcards have been saved as a new Deck called " + deckTitle + "! Check it out in My Decks.");
    } catch (error) {
      console.error("Error:", error);
      alert("Sorry, an error occured while saving your flashcards. Please try again later.")
    }
  }

  //call backend to generate flashcards from notes
  //if successful, sets flashcards to a list of objects with front and back property
  const handleGenerate = async (notes) => {
    console.log("notes going in: ", notes);
    alert(
      "Flashcards are being generated, please be patient! Try again in 10 seconds if an error occurs."
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
      console.log("FCS:", data);
      setFlashcards(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Sorry, an error occured while generating your flashcards. Please try again later.")
    }
  };

  //parse response from Azure OCR to set notes and feed into flashcard generation
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted URL:", imageUrl);
    //get text found in image url
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

  const handleChange = (event) => {
    setImageUrl(event.target.value);
  };

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
                  placeholder="enter image URL ending in .png, .jpg, ..."
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
      <div className="right-side">
        <div className="card-results">
          {flashcardList}
        </div>
        {flashcardList.length > 0 ? <button className="save" onClick={saveFlashcards}> I like it! </button> : <></>}
      </div>
    </div>
  );
};

function FakeCard({ question, answer, index }) {
  return (
    <div>
      <div>Q{index+1}: {question}</div>
      <div>A{index+1}: {answer}</div>
      <br/>
    </div>
  );
}
