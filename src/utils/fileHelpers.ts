import type { CustomFile } from '@/lib/definitions';

export function converBase64ToText(content: string): string {
  return atob(content.split(',')[1]);
}

export function convertBase64ToBuffer(content: string): Buffer {
  return Buffer.from(content.split(',')[1], 'base64');
}

export function readFiles(fileList: FileList, append?: any) {
  const files = Array.from(fileList);
  const handledFiles: CustomFile[] = [];

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target && r.target.result) {
        const handledFile: CustomFile = {
          fileName: file.name,
          fileType: file.type,
          content: r.target.result.toString(),
        };

        if (append) append(handledFile);
      }
    };

    reader.onerror = () => {
      console.error('Failed to load file');
    };

    reader.readAsDataURL(file);
  }

  return handledFiles;
}
