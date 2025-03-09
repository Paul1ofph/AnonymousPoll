import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import RatingsContent from '../../components/PollCards/RatingsContent';

const Ratings = () => {
  const [ratings, setRatings] = useState({
    accessibility: 0,
    security: 0,
    scalability: 0,
    accuracy: 0,
    presentation: 0,
  });

  const handleRatingChange = (criterion, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [criterion]: value,
    }));
  };

const handleSubmit = async (pollId) => {



    try {
        const response = await fetch(`/api/polls/${pollId}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ratings }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit ratings');
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error(error);
    }


  };

    return (

    <>
      <DashboardLayout activeMenu={"Ratings"}>
        <p>Ratings</p>
        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
          <div className="flex flex-col items-start justify-between">
            <p className='text-xl'>USER INTERFACE</p>
            <RatingsContent type="rating" rating={ratings.accessibility} onRatingChange={(value) => handleRatingChange('accessibility', value)} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Ratings</button>
          </div>
        </div>

        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
          <div className="flex flex-col items-start justify-between">
            <p className='text-xl'>SECURITY</p>
            <RatingsContent type="rating" rating={ratings.security} onRatingChange={(value) => handleRatingChange('security', value)} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Ratings</button>
          </div>
        </div>

        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
          <div className="flex flex-col items-start justify-between">
            <p className='text-xl'>SCALABILITY</p>
            <RatingsContent type="rating" rating={ratings.scalability} onRatingChange={(value) => handleRatingChange('scalability', value)} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Ratings</button>
          </div>
        </div>

        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
          <div className="flex flex-col items-start justify-between">
            <p className='text-xl'>ACCURACY</p>
            <RatingsContent type="rating" rating={ratings.accuracy} onRatingChange={(value) => handleRatingChange('accuracy', value)} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Ratings</button>
          </div>
        </div>

        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
          <div className="flex flex-col items-start justify-between">
            <p className=''>RESULT PRESENTATION</p>
            <RatingsContent type="rating" rating={ratings.presentation} onRatingChange={(value) => handleRatingChange('presentation', value)} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Ratings</button>
          </div>
        </div>

      </DashboardLayout>
    </>

  )
}

export default Ratings
