import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFile } from './FileContext'

const DropzoneContainer = styled.div<{ isActive: boolean }>`
    border: 2px dashed ${({ isActive }) => (isActive ? '#60a5fa' : '#d1d5db')};
    background-color: ${({ isActive }) => (isActive ? '#eff6ff' : 'transparent')};
    border-radius: 0.75rem; /* rounded-xl */
    padding: 1.5rem; /* p-6 */
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: #93c5fd;
        background-color: #f0f9ff;
    }

    &:focus {
        outline: none;
        border-color: #3b82f6;
    }
`

const FileItem = styled.p`
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #374151;
`

const FileContentBox = styled.pre`
    background-color: #f3f4f6;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    text-align: left;
    overflow-x: auto;
    max-height: 300px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
`

const FileDropzone: React.FC = () => {
    const { file, setFile, fileContent, setFileContent } = useFile()

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const txtFile = acceptedFiles[0]
            if (txtFile && txtFile.name.endsWith('.txt')) {
                // Replace any existing file
                setFile(txtFile)

                const reader = new FileReader()
                reader.onload = (event) => {
                    const text = event.target?.result as string
                    setFileContent(text)
                    console.log('📄 File content:', text)
                }
                reader.readAsText(txtFile)
            } else {
                // Reset if invalid file
                setFile(null)
                setFileContent('')
            }
        },
        [setFile, setFileContent]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true, // allow multiple files
        accept: { 'text/plain': ['.txt'] },
    })

    return (
        <>
            <DropzoneContainer {...getRootProps()} isActive={isDragActive}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop your .txt file here...</p>
                ) : file ? (
                    <>
                        <p>Uploaded file:</p>
                        <FileItem>{file.name}</FileItem>
                        <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>(Drop another file to replace)</p>
                    </>
                ) : (
                    <p>Drag and drop a .txt file here, or click to select one</p>
                )}
            </DropzoneContainer>

            {/* {fileContent && (
                <FileContentBox>
                    <code>{fileContent}</code>
                </FileContentBox>
            )} */}
        </>
    )
}

export default FileDropzone
