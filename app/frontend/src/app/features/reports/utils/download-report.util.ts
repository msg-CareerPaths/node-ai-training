export function triggerFileDownloadFromBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

export function extractFilenameFromDisposition(
  contentDisposition: string | null | undefined,
  fallback: string,
): string {
  if (!contentDisposition) {
    return fallback;
  }

  const match = contentDisposition.match(/filename="?([^";]+)"?/i);

  return match?.[1] ?? fallback;
}
