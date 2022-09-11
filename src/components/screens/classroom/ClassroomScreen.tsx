import React, { useState } from 'react';

export const ClassroomScreen = ({ classroomId }) => {
  return (
    <div className="container m-auto flex flex-col gap-4">
      Classroom {classroomId}
    </div>
  );
};
