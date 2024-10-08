import React, { useState } from 'react';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';

function Community() {
  // State to track if the "Read more" content is expanded
  const [expanded, setExpanded] = useState({});

  // Toggle "Read more" functionality for each entry
  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Function to speak the content using SpeechSynthesis API
  const speakContent = (content) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(content);
    synth.speak(utterance);
  };

  // Scroll to a specific section when clicked
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Community Section */}
      <div className="container mx-auto mt-10 p-6 sm:p-10 flex flex-col lg:flex-row items-center">
        <div className="lg:ml-24 lg:mr-96 text-center lg:text-left">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Community</h2>
          <p className="text-lg lg:text-2xl mb-8">
            Discover personal stories from our users, blog, and accessibility podcasts.
          </p>
        </div>

        {/* User Images */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 lg:gap-6 lg:ml-6">
          <img src={user1} alt="User 1" className="rounded-full h-16 w-16 sm:h-24 sm:w-24 object-cover" />
          <img src={user2} alt="User 2" className="rounded-full h-16 w-16 sm:h-24 sm:w-24 object-cover" />
          <img src={user1} alt="User 1" className="rounded-full h-16 w-16 sm:h-24 sm:w-24 object-cover" />
          <img src={user2} alt="User 2" className="rounded-full h-16 w-16 sm:h-24 sm:w-24 object-cover" />
        </div>
      </div>

      {/* Navigation Links for Sections */}
      <div className="container mx-auto text-center mt-12">
        <div className="flex flex-col border-2 rounded-2xl sm:flex-row justify-around text-lg lg:text-2xl font-semibold mb-6 space-y-4 sm:space-y-0">
          <button onClick={() => scrollToSection('blogs')} className="hover:text-blue-600 transition px-4 py-2 border border-transparent rounded-lg hover:bg-blue-100">
            Blogs & News
          </button>
          <button onClick={() => scrollToSection('stories')} className="hover:text-blue-600 transition px-4 py-2 border border-transparent rounded-lg hover:bg-blue-100">
            Stories
          </button>
          <button onClick={() => scrollToSection('podcast')} className="hover:text-blue-600 transition px-4 py-2 border border-transparent rounded-lg hover:bg-blue-100">
            Podcast
          </button>
        </div>
      </div>

      {/* Blogs & News Section */}
      <div id="blogs" className="container mx-auto p-6 lg:p-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Blogs & News</h2>
        <p className="text-lg mb-6">Find all the latest updates and news from Be My Eyes right here.</p>
        <div className="flex flex-col md:flex-row gap-6">
          {[
            {
              image: user1,
              content: 'This is a real blog post content. Be My Eyes is launching new features to improve accessibility.',
              additionalContent: 'The new features include voice assistance and visual aid through our mobile app.',
            },
            {
              image: user1,
              content: 'Accessibility in technology is evolving. Read more about how companies are adapting.',
              additionalContent: 'More organizations are investing in making their products accessible for all users.',
            },
            {
              image: user1,
              content: 'How Be My Eyes community stories are changing lives around the world.',
              additionalContent: 'Our community continues to grow, helping visually impaired users in real-time.',
            },
          ].map((post, index) => (
            <div key={index} className="flex flex-col w-full md:w-1/3">
              <img src={post.image} alt="Blog" className="w-full h-40 object-cover object-contain mb-4 rounded-lg" />
              <p className="text-gray-700">{post.content}</p>
              {expanded[index] && (
                <p className="pt-2 text-gray-700">{post.additionalContent}</p>
              )}
              <button
                className="text-blue-500 mt-2 hover:underline"
                onClick={() => {
                  toggleReadMore(index);
                  speakContent(expanded[index] ? post.additionalContent : post.content);
                }}
              >
                {expanded[index] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stories Section */}
      <div id="stories" className="container mx-auto p-6 lg:p-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Stories</h2>
        <p className="text-lg mb-6">Discover the inspiring personal stories from our community.</p>
        <div className="flex flex-col md:flex-row gap-6">
          {[
            {
              image: user2,
              content: 'Meet Jane, who used Be My Eyes to solve her everyday challenges.',
              additionalContent: 'Jane shared how the app helped her connect with a volunteer to navigate a new city.',
            },
            {
              image: user2,
              content: 'How Be My Eyes is improving the lives of visually impaired people.',
              additionalContent: 'Our users report significant improvements in their independence and confidence.',
            },
            {
              image: user2,
              content: 'Hear from our volunteers who have made a difference.',
              additionalContent: 'Volunteers share their stories of how they’ve helped others through Be My Eyes.',
            },
          ].map((story, index) => (
            <div key={index} className="flex flex-col w-full md:w-1/3">
              <img src={story.image} alt="Story" className="w-full h-40 object-cover mb-4 rounded-lg" />
              <p className="text-gray-700">{story.content}</p>
              {expanded[`story_${index}`] && (
                <p className="pt-2 text-gray-700">{story.additionalContent}</p>
              )}
              <button
                className="text-blue-500 mt-2 hover:underline"
                onClick={() => {
                  toggleReadMore(`story_${index}`);
                  speakContent(expanded[`story_${index}`] ? story.additionalContent : story.content);
                }}
              >
                {expanded[`story_${index}`] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Podcast Section */}
      <div id="podcast" className="container mx-auto p-6 lg:p-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Podcast</h2>
        <p className="text-lg mb-6">Listen to our latest podcast episodes about accessibility and more.</p>
        <div className="flex flex-col md:flex-row gap-6">
          {[
            {
              image: user1,
              content: 'Podcast Episode 1: The future of accessibility technology.',
              additionalContent: 'In this episode, we discuss the upcoming innovations in accessibility.',
            },
            {
              image: user2,
              content: 'Podcast Episode 2: How Be My Eyes is transforming lives.',
              additionalContent: 'This episode shares stories from users who have been impacted by the app.',
            },
            {
              image: user1,
              content: 'Podcast Episode 3: The role of volunteers in Be My Eyes.',
              additionalContent: 'Volunteers discuss their experiences and how they’ve made a difference.',
            },
          ].map((podcast, index) => (
            <div key={index} className="flex flex-col w-full md:w-1/3">
              <img src={podcast.image} alt="Podcast" className="w-full h-40 object-cover mb-4 rounded-lg" />
              <p className="text-gray-700">{podcast.content}</p>
              {expanded[`podcast_${index}`] && (
                <p className="pt-2 text-gray-700">{podcast.additionalContent}</p>
              )}
              <button
                className="text-blue-500 mt-2 hover:underline"
                onClick={() => {
                  toggleReadMore(`podcast_${index}`);
                  speakContent(expanded[`podcast_${index}`] ? podcast.additionalContent : podcast.content);
                }}
              >
                {expanded[`podcast_${index}`] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Community;
