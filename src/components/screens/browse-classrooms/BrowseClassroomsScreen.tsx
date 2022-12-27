import Image from 'next/image';
import React from 'react';
import { trpc } from '../../../utils/trpc';
import studentImage from '../../../assets/student.jpeg';
import Link from 'next/link';
import { Button, Variant } from '../../common/Button/Button';

export const BrowseClassroomsScreen = () => {
  const findClassroom = trpc.classroom.findClassroom.useQuery();
  const classrooms = trpc.student.getClassrooms.useQuery();

  const isEnrolled = (classroomId: string) => {
    return classrooms.data?.some(({ id }) => id === classroomId);
  };

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
              <Link
                href={
                  isEnrolled(classroom.id)
                    ? `/classrooms/${classroom.id}`
                    : `/classrooms/${classroom.id}/overview`
                }
              >
                <Button
                  variant={
                    isEnrolled(classroom.id)
                      ? Variant.Secondary
                      : Variant.Primary
                  }
                  color="primary"
                >
                  {isEnrolled(classroom.id)
                    ? '(Already Enrolled) View'
                    : 'View Classroom'}
                </Button>
              </Link>
            </div>
          </article>
          <hr className="border-gray-600 my-8" />
        </div>
      ))}
    </section>
  );
};
