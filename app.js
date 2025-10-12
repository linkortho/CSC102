// ===============================
// Palindrome Checker Logic (app.js)
// Author: Chris Franz
// Date: 2025-10-12
// Purpose:
// - Demonstrate variables, data types, collections, loops, conditionals, and functions
// - Use a FORM with submit for input and innerHTML for all messages
// - Avoid alerts/prompts/actionListeners, and keep JS out of HTML
// ===============================

// Grab the FORM element by its id so we can handle submit events
const form = document.getElementById("palForm");
// Grab the input element where the user types text
const userTextInput = document.getElementById("userText");
// Grab the messages container where we will render results/validation via innerHTML
const messages = document.getElementById("messages");
// Grab the 'I'm Done' button to allow exiting the session
const doneBtn = document.getElementById("doneBtn");
// Grab the submit button so we can disable it when the session ends
const submitBtn = document.getElementById("submitBtn");

// Track whether the session is active (boolean primitive)
let sessionActive = true;

// -------------------------------
// Function: sanitizeInput
// Purpose: remove all non-alphanumeric characters and lowercase the input
// Params: raw (string) - original user input
// Returns: (string) - cleaned version for palindrome checking
// -------------------------------
function sanitizeInput(raw) {
  // Use a regex to strip out spaces/punctuation; keep letters/numbers only
  // Demonstrates string methods and RegExp usage
  return raw.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

// -------------------------------
/* Function: isPalindrome
 * Purpose: check if a given string reads the same forward and backward
 * Params: text (string) - user input
 * Returns: (boolean) - true if palindrome and non-empty after cleaning
 * Steps:
 *   1) Clean the input using sanitizeInput (re-usable function)
 *   2) Split into an array of characters (collection), reverse, and rejoin
 *   3) Compare with the cleaned original
 */
// -------------------------------
function isPalindrome(text) {
  // Clean the text for fair comparison
  const clean = sanitizeInput(text);
  // Convert to array, reverse order (algorithm using collection ops), then join back into string
  const reversed = clean.split("").reverse().join("");
  // Ensure not empty and equality holds; return a boolean
  return clean.length > 0 && clean === reversed;
}

// -------------------------------
// Function: renderMessage
// Purpose: centralize message rendering via innerHTML (per assignment rules)
// Params: html (string) - HTML content to inject into the messages area
// Returns: void
// -------------------------------
function renderMessage(html) {
  // Use innerHTML as explicitly required
  messages.innerHTML = html;
}

// -------------------------------
// Function: showResult
// Purpose: display the original input and whether it was a palindrome
// Params: original (string), result (boolean)
// Returns: void
// -------------------------------
function showResult(original, result) {
  // Build a small status chip using conditional expression
  const chip = result
    ? '<span style="color:green;font-weight:600;">Palindrome</span>'
    : '<span style="color:red;font-weight:600;">Not a Palindrome</span>';

  // Inject structured HTML into the message area
  renderMessage(
    `<p><strong>Input:</strong> ${original}</p>
     <p><strong>Result:</strong> ${chip}</p>`
  );
}

// -------------------------------
// Event handler: form submission (no addEventListener per rules)
// Demonstrates: conditionals, early returns, calling functions, DOM updates, and reset loop
// -------------------------------
form.onsubmit = function (evt) {
  // Prevent default page reload so we can handle in JS
  evt.preventDefault();

  // If the session has ended, ignore further submissions
  if (!sessionActive) return;

  // Read raw value from the text input
  const raw = userTextInput.value || "";

  // Validate that something was entered (trim to ignore whitespace)
  if (raw.trim().length === 0) {
    // Render validation feedback via innerHTML
    renderMessage("<p style='color:#b91c1c;'>Please enter a word or phrase.</p>");
    // Return focus to the input for a11y and UX
    userTextInput.focus();
    // Exit early due to invalid input
    return;
  }

  // Compute whether the input is a palindrome (core algorithm)
  const result = isPalindrome(raw);

  // Display the outcome in the messages area
  showResult(raw, result);

  // Clear the field for the next loop iteration (user can keep trying terms)
  userTextInput.value = "";
  // Move focus back to the input for rapid consecutive checks (UX loop)
  userTextInput.focus();
};

// -------------------------------
// Event handler: end session (no addEventListener, using property assignment)
// Purpose: demonstrate state changes and DOM updates without alerts/prompts
// -------------------------------
doneBtn.onclick = function () {
  // Flip session state so further submits are ignored
  sessionActive = false;
  // Inform the user that the session ended
  renderMessage("<p>Session Ended. Refresh the page to start again.</p>");
  // Disable all inputs/buttons to communicate the end of interaction
  userTextInput.disabled = true;
  submitBtn.disabled = true;
  doneBtn.disabled = true;
};
