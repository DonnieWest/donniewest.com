import React from 'react';
import { Link } from 'react-router-dom';

export default () =>
  <div>
    <p>
      That page was not found. Perhaps check out the{' '}
      <Link to="/archive">Archive?</Link>
    </p>
  </div>;
