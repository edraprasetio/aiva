import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FileContextType {
    file: File | null
    fileContent: string
    setFile: (file: File | null) => void
    setFileContent: (content: string) => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileContent, setFileContent] = useState<string>('')

    return <FileContext.Provider value={{ file, setFile, fileContent, setFileContent }}>{children}</FileContext.Provider>
}

export const useFile = () => {
    const context = useContext(FileContext)
    if (!context) {
        throw new Error('useFile must be used within a FileProvider')
    }
    return context
}
