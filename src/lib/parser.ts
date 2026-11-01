import mammoth from 'mammoth';

// Clean extracted text from PDF/DOCX metadata noise
export function cleanDocumentText(raw: string): string {
  if (!raw) return '';

  return raw
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      // Drop PDF header and internal metadata markers
      if (/^%PDF-\d/i.test(trimmed)) return false;
      if (/^\/?(Type|Pages|Catalog|ViewerPreferences|Font|MediaBox|Contents|StructParents|Filter|FlateDecode)/i.test(trimmed)) return false;
      if (/\b\d+\s+\d+\s+R\b/.test(trimmed)) return false; // 2 0 R references
      if (/\b(endobj|endstream|xref|trailer|startxref)\b/i.test(trimmed)) return false;
      if (/^\/?(ProcSet|ExtGState|Encoding|BaseFont|Subtype)\b/i.test(trimmed)) return false;
      if (trimmed.startsWith('<<') || trimmed.endsWith('>>')) return false;
      return true;
    })
    .join('\n')
    .trim();
}

export async function extractTextFromFile(
  fileBuffer: Buffer,
  fileType: 'pdf' | 'docx' | 'txt' | 'text',
  fileName?: string
): Promise<string> {
  if (fileType === 'txt' || fileType === 'text') {
    return cleanDocumentText(fileBuffer.toString('utf-8'));
  }

  if (fileType === 'docx') {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return cleanDocumentText(result.value || '');
    } catch (err: any) {
      throw new Error(`Failed to extract text from DOCX file: ${err.message}`);
    }
  }

  if (fileType === 'pdf') {
    try {
      // Use standard pdf-parse package
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(fileBuffer);
      const extracted = cleanDocumentText(data.text || '');
      if (extracted.length > 20) {
        return extracted;
      }
    } catch (err: any) {
      console.warn('pdf-parse execution warning:', err);
    }

    // Secondary robust fallback for text streams in PDF buffers
    try {
      const str = fileBuffer.toString('latin1');
      // Look for text streams in PDF between BT (Begin Text) and ET (End Text) or plain text fragments
      const textMatches: string[] = [];
      const btRegex = /BT[\s\S]*?ET/g;
      let match;
      while ((match = btRegex.exec(str)) !== null) {
        const chunk = match[0];
        // Extract string tokens in parentheses (e.g. (Unit 1: Overview) Tj)
        const tokenRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
        let tokenMatch;
        while ((tokenMatch = tokenRegex.exec(chunk)) !== null) {
          textMatches.push(tokenMatch[1]);
        }
      }

      if (textMatches.length > 0) {
        const streamText = cleanDocumentText(textMatches.join(' '));
        if (streamText.length > 20) {
          return streamText;
        }
      }
    } catch (e) {
      console.warn('Fallback stream parser error:', e);
    }

    throw new Error(
      'Unable to extract readable text from this PDF document. Please verify it is a text-based PDF (not a flat image scan) or paste the curriculum text directly into the form.'
    );
  }

  throw new Error(`Unsupported file type: ${fileType}`);
}
