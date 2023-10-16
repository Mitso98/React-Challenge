import { BackToHome } from "../App";
import findRemovalIndexForPalindrome from "../utils/findRemovalIndex";
import { useState } from "react";
import "./_one.scss";

const ChallengeOne = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [touched, setTouched] = useState(false);

  const valueIsValid = /^[a-z]*$/.test(value) && value !== "" ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(findRemovalIndexForPalindrome(value));
  };

  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 1</h1>
      <h2 className="subtitle has-text-white">
        Given a<code>string</code> of lowercase letters in the range ascii[a-z],
        determine the <code>index</code> of the one character that can be
        <code>removed</code> to make the string a palindrome. If the word is
        already a palindrome or there is no <code>"only one index"</code>{" "}
        solution, which means that we have to remove more than one, return{" "}
        <code>-1</code>. Otherwise, return the <code>index</code>
        of the character to remove.
      </h2>
      <h1 className="title is-1 has-text-white">Example</h1>
      <h2 className="subtitle has-text-white">
        <p>aaab</p>
        <p>acxycab</p>

        <p> Output </p>
        <p>3</p>
        <p>-1</p>
      </h2>
      {/*
      
        input to write the string in
        and a button to get the answer and show it

        Note: you can show the answer as just a simple text under them
      */}
      <form onSubmit={handleSubmit}>
        <div className="challenge-one-form-container">
          <div className="challenge-form-group">
            <input
              onChange={(e) => {
                setTouched(true);
                setValue(e.target.value);
              }}
            />
            {!valueIsValid && touched && (
              <span className="warning">
                Please enter a string of lowercase letters{" "}
              </span>
            )}
          </div>

          <button
            disabled={!valueIsValid}
            className="purpleButton"
            type="submit"
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
      <p>Result: {result}</p>
    </>
  );
};

export default ChallengeOne;
