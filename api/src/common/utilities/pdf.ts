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

// Todo this is fast solution. We can improve pdf generation architecture (use models etc).
//  We can improve architecture form performance perspective. (Use different types of scaling, microservices, queue etc
//  But for quick solution and MVP we can use this
export function generatePDF(scheduleData: IGeneratePdf, studentId: string, stream: any) {
  const doc = new PdfDocument()

  doc.on('data', chunk => stream.write(chunk))
  doc.on('end', () => stream.end())

  // Add a title and content dynamically
  doc.fontSize(25).text('Student Schedule', { align: 'center' })

  // Add some dynamic schedule data
  doc.fontSize(12).text('Schedule for student: ' + studentId)
  scheduleData.forEach(({ startTime, endTime, day, Section }) => {
    doc.text(`${day}. ${endTime} - ${startTime} - ${Section.name}`)
  })

  doc.end()
}
