import { PDFDocument } from 'pdf-lib'

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }
  
  return await mergedPdf.save()
}

export async function compressPDF(file: File): Promise<Uint8Array> {
  // Simple "compression" using pdf-lib (mostly just re-saving)
  // For true compression, one would need more complex tools like ghostscript or wasm-based optimizers
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  return await pdf.save({ useObjectStreams: true })
}
