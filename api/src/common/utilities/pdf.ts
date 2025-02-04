import * as PdfDocument from 'pdfkit'

type IGeneratePdf = ({
  Section: {
    id: string
    name: string
    description: string | null
    startDate: Date
    endDate: Date
    subjectId: string
    teacherId: string
    classroomId: string
  }
} & { id: string; sectionId: string; day: number; startTime: number; endTime: number; durationMin: number })[]

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins < 10 ? '0' + mins : mins}`
}

// Todo this is fast solution. We can improve pdf generation architecture (use models etc).
//  We can improve architecture form performance perspective. (Use different types of scaling, microservices, queue etc
//  But for quick solution and MVP we can use this
export function generatePDFSchedule(scheduleData: IGeneratePdf, studentId: string, stream: any) {
  const doc = new PdfDocument()
  doc.on('data', chunk => stream.write(chunk))
  doc.on('end', () => stream.end())

  doc.fontSize(25).text('Student Schedule', { align: 'center' })
  doc.moveDown()

  doc.fontSize(12).text(`Schedule for student: ${studentId}`, { align: 'center' })
  doc.moveDown(2)

  const tableTop = doc.y
  const columnWidth = { day: 50, startTime: 80, endTime: 80, section: 200 }

  // Todo update doc (Add additional fields)
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Day', 50, tableTop, { width: columnWidth.day, align: 'left' })
    .text('Start Time', 50 + columnWidth.day, tableTop, { width: columnWidth.startTime, align: 'left' })
    .text('End Time', 50 + columnWidth.day + columnWidth.startTime, tableTop, {
      width: columnWidth.endTime,
      align: 'left',
    })
    .text('Section', 50 + columnWidth.day + columnWidth.startTime + columnWidth.endTime, tableTop, {
      width: columnWidth.section,
      align: 'left',
    })

  doc
    .moveTo(50, tableTop + 15)
    .lineTo(550, tableTop + 15)
    .stroke()

  doc.fontSize(12).font('Helvetica')
  let yPosition = tableTop + 20

  scheduleData.forEach(({ startTime, endTime, day, Section }) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dayName = dayNames[day - 1]

    doc
      .text(dayName, 50, yPosition, { width: columnWidth.day, align: 'left' })
      .text(formatTime(startTime), 50 + columnWidth.day, yPosition, { width: columnWidth.startTime, align: 'left' })
      .text(formatTime(endTime), 50 + columnWidth.day + columnWidth.startTime, yPosition, {
        width: columnWidth.endTime,
        align: 'left',
      })
      .text(Section.name, 50 + columnWidth.day + columnWidth.startTime + columnWidth.endTime, yPosition, {
        width: columnWidth.section,
        align: 'left',
      })

    yPosition += 15
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke()
    yPosition += 5
  })

  doc.end()
}
