export interface FileValidationOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export interface PipelineResult {
  success: boolean;
  error?: string;
  files?: File[];
}

export class UploadPipeline {
  static async validate(files: File[], options: FileValidationOptions = {}): Promise<PipelineResult> {
    const { maxSize = 50, allowedTypes = [] } = options;

    for (const file of files) {
      // Size check
      if (file.size > maxSize * 1024 * 1024) {
        return { success: false, error: `File ${file.name} exceeds the ${maxSize}MB limit.` };
      }

      // Type check
      if (allowedTypes.length > 0) {
        const isValidType = allowedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type === type;
        });

        if (!isValidType) {
          return { success: false, error: `File ${file.name} has an unsupported format.` };
        }
      }
    }

    return { success: true, files };
  }

  static async process(files: File[], processor: (files: File[]) => Promise<any>) {
    try {
      const result = await processor(files);
      return { success: true, data: result };
    } catch (error: any) {
      console.error("Pipeline processing error:", error);
      return { success: false, error: error.message || "An error occurred during processing." };
    }
  }
}
