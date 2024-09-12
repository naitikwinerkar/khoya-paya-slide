import React, { useState, useEffect } from 'react';

// Import images (assuming these paths are correct)
import missing1 from '../assets/images/missing1.jpg';
import missing2 from '../assets/images/missing2.jpg';
import missing3 from '../assets/images/missing3.jpg';
import missing4 from '../assets/images/missing4.jpg';
import missing5 from '../assets/images/missing5.jpg';
import missing6 from '../assets/images/missing6.jpg';
import missing7 from '../assets/images/missing7.jpg';
import missing8 from '../assets/images/missing8.jpg';
import missing9 from '../assets/images/missing9.jpg';
import missing10 from '../assets/images/missing10.jpg';

import found1 from '../assets/images/found1.jpg';
import found2 from '../assets/images/found2.jpg';
import found3 from '../assets/images/found3.jpg';
import found4 from '../assets/images/found4.jpg';
import found5 from '../assets/images/found5.jpg';
import found6 from '../assets/images/found6.jpg';
import found7 from '../assets/images/found7.jpg';
import found8 from '../assets/images/found8.jpg';
import found9 from '../assets/images/found9.jpg';
import found10 from '../assets/images/found10.jpg';

// Image arrays
const missingImages = [
  { id: 1, src: missing1, name: 'Missing Person 1' },
  { id: 2, src: missing2, name: 'Missing Person 2' },
  { id: 3, src: missing3, name: 'Missing Person 3' },
  { id: 4, src: missing4, name: 'Missing Person 4' },
  { id: 5, src: missing5, name: 'Missing Person 5' },
  { id: 6, src: missing6, name: 'Missing Person 6' },
  { id: 7, src: missing7, name: 'Missing Person 7' },
  { id: 8, src: missing8, name: 'Missing Person 8' },
  { id: 9, src: missing9, name: 'Missing Person 9' },
  { id: 10, src: missing10, name: 'Missing Person 10' },
];

const foundImages = [
  { id: 1, src: found1, name: 'Found Person 1' },
  { id: 2, src: found2, name: 'Found Person 2' },
  { id: 3, src: found3, name: 'Found Person 3' },
  { id: 4, src: found4, name: 'Found Person 4' },
  { id: 5, src: found5, name: 'Found Person 5' },
  { id: 6, src: found6, name: 'Found Person 6' },
  { id: 7, src: found7, name: 'Found Person 7' },
  { id: 8, src: found8, name: 'Found Person 8' },
  { id: 9, src: found9, name: 'Found Person 9' },
  { id: 10, src: found10, name: 'Found Person 10' },
];

// Shuffle function
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const Dashboard = () => {
  const [scrollInterval, setScrollInterval] = useState(3); // Default to 3 seconds
  const [displayCategory, setDisplayCategory] = useState('both'); // Default to show both
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledMissingImages, setShuffledMissingImages] = useState([]);
  const [shuffledFoundImages, setShuffledFoundImages] = useState([]);

  const visibleImagesCount = 4; // Show 4 images at a time

  useEffect(() => {
    setShuffledMissingImages(shuffleArray(missingImages));
    setShuffledFoundImages(shuffleArray(foundImages));
  }, [displayCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + visibleImagesCount;
        const maxIndex = Math.max(shuffledMissingImages.length, shuffledFoundImages.length) - visibleImagesCount;
        return newIndex > maxIndex ? 0 : newIndex;
      });
    }, scrollInterval * 1000);

    return () => clearInterval(interval);
  }, [scrollInterval, shuffledMissingImages, shuffledFoundImages]);

  const renderImages = (images, startIndex, category) => {
    const imagesToShow = images.slice(startIndex, startIndex + visibleImagesCount);
    const rows = [imagesToShow.slice(0, 2), imagesToShow.slice(2, 4)];

    return rows.map((rowImages, rowIndex) => (
      <div key={rowIndex} className="row">
        {rowImages.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.src} alt={image.name} className="image" />
            <div className={`watermark ${category === 'missing' ? 'missing' : 'found'}`}>
              {category === 'missing' ? 'Missing Person' : 'Found Person'}
            </div>
            <p>{}</p>
          </div>
        ))}
      </div>
    ));
  };

  const renderContent = () => {
    const missingStartIndex = currentIndex % shuffledMissingImages.length;
    const foundStartIndex = currentIndex % shuffledFoundImages.length;

    switch (displayCategory) {
      case 'missing':
        return renderImages(shuffledMissingImages, missingStartIndex, 'missing');
      case 'found':
        return renderImages(shuffledFoundImages, foundStartIndex, 'found');
      case 'both':
        return (
          <>
            {renderImages(shuffledFoundImages, foundStartIndex, 'found')}
            {renderImages(shuffledMissingImages, missingStartIndex, 'missing')}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="image-carousel">
      <div className="controls">
        <div className="control-group">
          <label>Scroll Interval:</label>
          <select onChange={(e) => setScrollInterval(Number(e.target.value))} value={scrollInterval}>
            <option value={3}>3 Seconds</option>
            <option value={5}>5 Seconds</option>
          </select>
        </div>

        <div className="control-group">
          <label>Display Category:</label>
          <select onChange={(e) => setDisplayCategory(e.target.value)} value={displayCategory}>
            <option value="missing">Only Missing</option>
            <option value="found">Only Found</option>
            <option value="both">Both Missing and Found</option>
          </select>
        </div>
      </div>

      <div className="image-display">
        {renderContent()}
      </div>

      {/* Inline CSS */}
      <style>
        {`
          .image-carousel {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 90%;
            margin: auto;
          }

          .controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            width: 100%;
          }

          .control-group {
            display: flex;
            align-items: center;
          }

          .control-group label {
            margin-right: 20px;
            font-weight: bold;
            font-size:23px;
          }

          .control-group select {
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 20px;
          }

          .image-display {
            width: 115%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .row {
            display: flex;
            justify-content: center;
            margin-bottom: 89px;
            width: 90%;
            height: 294px;
          }

          .image-container {
            width: 100%;
            max-width: 100%;
            margin: 8px;
            text-align: center;
            position: relative;
            height: 100px;
          }

          .image {
            width: 70%;
            height: 310px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            object-fit: cover;
          }

          img:hover {
            transform: scale(1.05);
          }

          p {
            margin-top: 10px;
            font-size: 20px;
            font-weight: bold;
            color: red;
          }

          .watermark {
            position: absolute;
            top: 80px;
            left: 130px;
            transform: rotate(-50deg);
            background-color: red;
            padding: 10px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            width: 200px;
             text-align: center;
          }

          .missing {
            background-color: red;
          }

          .found {
            background-color: green;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
