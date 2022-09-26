import Image from 'next/image';
import React from 'react';
import { trpc } from '../../../utils/trpc';
import studentImage from '../../../assets/student.jpeg';
import Link from 'next/link';
import { Button } from '../../common/Button/Button';

export const BrowseClassroomsScreen = () => {
  const findClassroom = trpc.useQuery(['classroom.findClassroom']);

  return (
    <section>
      <div className="my-8">Filters</div>
      {findClassroom.data?.map((classroom) => (
        <div key={classroom.id}>
          <article className="flex gap-8">
            <figure>
              <Image
                width="300"
                height="300"
                src={studentImage}
                alt="no classrooms found"
              />
            </figure>

            <div>
              <h3 className="font-bold">{classroom.name}</h3>
              <h3 className="">{classroom.description}</h3>
              <h3 className="">{classroom.teacher.name}</h3>
            </div>

            <div>
              <Link href={`/classrooms/${classroom.id}/overview`}>
                <Button color="primary">View Classroom</Button>
              </Link>
            </div>
          </article>
          <hr className="border-gray-600 my-8" />
        </div>
      ))}
    </section>
  );
};
