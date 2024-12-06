import React from 'react';

interface DataItem {
  title: string;
  value: string;
}

// Define the props interface
interface ProfileDetailsProps {
  details: DataItem[]; // Specify that details is an array of DataItem
}

function ProfileDetails({ details }: ProfileDetailsProps) { // Use the props interface
  return (
    <div className="card md:!px-6 my-5 flex flex-col gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 lg:grid-cols-4 md:gap-y-10 md:gap-x-0">
        {details.map((profile) => (
          <div key={profile.title}> {/* Add a key prop for list items */}
            <h4 className="text-[12px] text-[#212121B2]">{profile.title}</h4>
            <p className="mt-2 flex items-center">{profile.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDetails;