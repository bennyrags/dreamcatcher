import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
      <h1>
Horace The Dreamer is an app for dreamers.
      </h1>
      <div className='aboutContainer'>
      <p>
        The idea for the app came from my often vivid dreams and a blank tablet by my bed. I was always told to put my dreams to paper, as a way of understanding my psyche. I rarely did. 
      </p>
      <p>
        I look at my phone a lot. It's the first thing I look at in the morning. It seemed only natural to build an app that could be used on a phone to track dreams. 
      </p>
        <p>I tried to think of a clever name.</p> 
        <p>All the clever names were taken and/or I wasn't that clever. So I asked my pal Horace if I could name the app after him. He said yes, provided I buy him dessert and listen to him describe his dreams of his desserts eating him.
      </p>
      <p>I reluctantly agreed.</p>
    </div>
  </div>
);

export default AboutPage;
