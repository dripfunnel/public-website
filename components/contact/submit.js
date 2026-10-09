// =====================================================================================================
// TODO (OWNER / BACK END): THE CONTACT FORM DOES NOT SEND ANYTHING YET.
//
// There is no back end yet. When a visitor fills in the contact form correctly and presses the button,
// the page shows the "Thanks, <name>" screen (as in the original design), but NO email is sent and
// NO data is stored anywhere. Messages are lost.
//
// This is the one place to connect it. Replace the body of submitContactForm() with the real call
// (for example a POST to the future API, or a form service) and, if it can fail, change
// components/contact/ContactForm.jsx so it waits for the result and shows an error text before it
// shows the success screen.
//
// `data` has these fields (all plain strings):
//   topic     'demo' | 'sales' | 'partners' | 'support'   what the visitor chose
//   name      the visitor's name
//   email     the visitor's work email (already checked for a valid format)
//   company   shop or company (may be empty)
//   country   chosen country in English (may be empty)
//   message   the message (may be empty only for the 'demo' topic)
//   region    'in' | 'us' | 'ae'   the website region the form was sent from
//   language  'en' | 'ar'          the page language
//
// Remember to tell visitors where their details go (the form already links to the Privacy Policy).
// =====================================================================================================
export function submitContactForm(data) {
  // TODO: send `data` somewhere. Intentionally does nothing for now.
  void data;
}
