
const FileContent = (base64String, fileName) => {
        const contentType = 'application/pdf'; // Update the content type as per your file type
        const sliceSize = 1024;
        const byteCharacters = atob(base64String);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
    
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
    
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, { type: contentType });
        const file = new File([blob], fileName, { type: contentType });
        return file;
      };

export default FileContent;