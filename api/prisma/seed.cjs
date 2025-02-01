const { PrismaClient } = require('@prisma/client')
const { scrypt, randomBytes, timingSafeEqual } = require('node:crypto')

const prisma = new PrismaClient()

const hashPassword = password => {
  const salt = randomBytes(16).toString('hex')

  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString('hex')}`)
    })
  })
}

async function main() {
  const userStudent = await prisma.user.upsert({
    where: { email: 'user-student@example.com' },
    update: {},
    create: {
      email: 'user-student@example.com',
      password: await hashPassword('123456'),
      birthDate: new Date('2000-01-01'),
      firstName: 'Jesse',
      lastName: 'Pinkman',
    },
  })
  const student = await prisma.studentProfile.upsert({
    where: {
      userId_nikname: {
        nikname: 'Blowfish',
        userId: userStudent.id,
      },
    },
    update: {},
    create: {
      nikname: 'Blowfish',
      User: { connect: userStudent },
    },
  })

  const userTeacher = await prisma.user.upsert({
    where: { email: 'user-teacher@example.com' },
    update: {},
    create: {
      email: 'user-teacher@example.com',
      password: await hashPassword('123456'),
      birthDate: new Date('2000-01-01'),
      firstName: 'Walter',
      lastName: 'White',
    },
  })
  const teacher = await prisma.teacherProfile.upsert({
    where: {
      userId_nikname: {
        nikname: 'Heisenberg',
        userId: userTeacher.id,
      },
    },
    update: {},
    create: {
      nikname: 'Heisenberg',
      User: {
        connect: userTeacher,
      },
    },
  })

  const classroom = await prisma.classroom.upsert({
    where: {
      teacherProfileId_name: {
        name: 'Fleetwood Bounder',
        teacherProfileId: teacher.id,
      },
    },
    update: {},
    create: {
      name: 'Fleetwood Bounder',
      TeacherProfile: {
        connect: teacher,
      },
    },
  })

  const subject = await prisma.subject.upsert({
    where: {
      teacherProfileId_name: {
        name: 'Chemistry',
        teacherProfileId: teacher.id,
      },
    },
    update: {},
    create: {
      TeacherProfile: { connect: teacher },
      name: 'Chemistry',
    },
  })

  const sectionA = await prisma.section.upsert({
    where: {
      subjectId_name: {
        name: 'Unit A',
        subjectId: subject.id,
      },
    },
    update: {},
    create: {
      TeacherProfile: { connect: teacher },
      Classroom: { connect: classroom },
      Subject: {
        connect: subject,
      },
      name: 'Unit A',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-10-12'),

      SectionSchedule: {
        create: [
          {
            startTime: 100000,
            endTime: 200000,
          },
          {
            startTime: 300000,
            endTime: 400000,
          },
          {
            startTime: 900000,
            endTime: 1100000,
          },
        ],
      },
    },
  })

  const sectionB = await prisma.section.upsert({
    where: {
      subjectId_name: {
        name: 'Unit B',
        subjectId: subject.id,
      },
    },
    update: {},
    create: {
      TeacherProfile: { connect: teacher },
      Classroom: { connect: classroom },
      Subject: {
        connect: subject,
      },
      name: 'Unit B',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-10-12'),

      SectionSchedule: {
        create: [
          {
            startTime: 150000,
            endTime: 200000,
          },
          {
            startTime: 350000,
            endTime: 400000,
          },
          {
            startTime: 950000,
            endTime: 1100000,
          },
        ],
      },
    },
  })

  const sectionC = await prisma.section.upsert({
    where: {
      subjectId_name: {
        name: 'Unit C',
        subjectId: subject.id,
      },
    },
    update: {},
    create: {
      TeacherProfile: { connect: teacher },
      Classroom: { connect: classroom },
      Subject: {
        connect: subject,
      },
      name: 'Unit C',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-10-12'),

      SectionSchedule: {
        create: [
          {
            startTime: 230000,
            endTime: 2500000,
          },
          {
            startTime: 300000,
            endTime: 400000,
          },
          {
            startTime: 900000,
            endTime: 1100000,
          },
        ],
      },
    },
  })

  const sectionSubscription = await prisma.sectionSubscription.upsert({
    where: {
      sectionId_studentId: {
        sectionId: sectionC.id,
        studentId: student.id,
      },
    },
    update: {},
    create: {
      Section: { connect: sectionC },
      StudentProfile: { connect: student },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
