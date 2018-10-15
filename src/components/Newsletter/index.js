import React from 'react';
import './Newsletter.css';

export default () => (
  <div className="newsletter">
    <form
      action="https://tinyletter.com/DonnieWest"
      method="post"
      target="popupwindow"
      onSubmit="window.open('https://tinyletter.com/DonnieWest', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
    >
      <p>
        <h3>Join my Newsletter</h3>
        <label htmlFor="tlemail">
          Sign up for free today and be the first to be notified on new updates
        </label>
      </p>
      <p>
        <input type="text" name="email" id="tlemail" />
      </p>
      <input type="hidden" value="1" name="embed" />
      <input className="subscribe" type="submit" value="Subscribe" />
    </form>
  </div>
);
